import { onRequest } from "firebase-functions/v2/https";
import admin from "firebase-admin";

admin.initializeApp();

export const createTeacher = onRequest(async (req, res) => {
  // ================= CORS =================
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  try {
    const {
      fullName,
      email,
      password,
      employeeId,
      phone,
      joiningDate,
      address,
      schoolId, // 🔥 REQUIRED
    } = req.body;

    // ================= VALIDATION =================
    if (!fullName || !email || !password || !schoolId) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    // ================= CREATE AUTH USER =================
    const user = await admin.auth().createUser({
      email,
      password,
      displayName: fullName,
    });

    const uid = user.uid;

    // ================= SET ROLE CLAIM =================
    await admin.auth().setCustomUserClaims(uid, {
      role: "teacher",
      schoolId, // useful later
    });

    // ================= FIRESTORE =================
    await admin.firestore().collection("teachers").doc(uid).set({
      id: uid,
      fullName,
      email,
      employeeId: employeeId || "",
      phone: phone || "",
      joiningDate: joiningDate || "",
      address: address || "",
      schoolId,               // 🔥 FOREIGN KEY
      role: "teacher",
      isActive: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.json({ success: true });
  } catch (error) {
    console.error("Create teacher error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
});


export const createStudent = onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  try {
    const {
      fullName,
      email,
      password,
      roll,
      classId,        // ✅ CHANGED (SOURCE OF TRUTH)
      classLabel,     // optional (UI only)
      parentName,
      contact,
      schoolId,
    } = req.body;

    // ✅ REQUIRED VALIDATION
    if (!fullName || !email || !password || !schoolId || !classId) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    // 1️⃣ Create Auth user
    const user = await admin.auth().createUser({
      email,
      password,
      displayName: fullName,
    });

    const uid = user.uid;

    // 2️⃣ Set Custom Claims
    await admin.auth().setCustomUserClaims(uid, {
      role: "student",
      schoolId,
    });

    // 3️⃣ Save Student (Firestore)
    await admin.firestore().collection("students").doc(uid).set({
      id: uid,
      fullName,
      email,
      roll: roll || "",
      classId,                     // 🔥 REQUIRED FK
      classLabel: classLabel || "", // optional (display only)
      parentName: parentName || "",
      contact: contact || "",
      schoolId,
      role: "student",
      isActive: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Create student failed:", err);
    res.status(500).json({ error: err.message });
  }
});


export const deleteStudent = onRequest(async (req, res) => {
  // ===== CORS =====
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  try {
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({
        error: "studentId is required",
      });
    }

    /* ================= DELETE AUTH USER ================= */
    await admin.auth().deleteUser(studentId);

    /* ================= DELETE FIRESTORE ================= */
    await admin.firestore()
      .collection("students")
      .doc(studentId)
      .delete();

    return res.json({
      success: true,
      message: "Student permanently deleted",
    });

  } catch (error) {
    console.error("Delete student error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
});

export const createNotice = onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  try {
    const {
      title,
      message,
      targetAudience, // students | teachers | all
      attachments = [],
      schoolId,       // 👈 ACCEPT FROM FRONTEND
      createdBy,      // principalId from localStorage
      createdByRole,  // "principal"
    } = req.body;

    // ✅ BASIC VALIDATION
    if (!title || !message || !targetAudience || !schoolId) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    if (!["students", "teachers", "all"].includes(targetAudience)) {
      return res.status(400).json({
        error: "Invalid target audience",
      });
    }

    // ✅ SAVE NOTICE (NO CLAIM CHECK)
    const ref = await admin.firestore().collection("notices").add({
      title,
      message,
      targetAudience,
      attachments,
      schoolId,
      createdBy: createdBy || null,
      createdByRole: createdByRole || "principal",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.json({
      success: true,
      noticeId: ref.id,
    });
  } catch (err) {
    console.error("Create notice error:", err);
    return res.status(500).json({ error: err.message });
  }
});


export const deleteNotice = onRequest(async (req, res) => {
  // ================= CORS =================
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  try {
    const { noticeId, schoolId } = req.body;

    // ✅ Validation
    if (!noticeId || !schoolId) {
      return res.status(400).json({
        error: "noticeId and schoolId are required",
      });
    }

    const noticeRef = admin.firestore().collection("notices").doc(noticeId);
    const snap = await noticeRef.get();

    if (!snap.exists) {
      return res.status(404).json({ error: "Notice not found" });
    }

    // ✅ Extra safety: school match
    if (snap.data().schoolId !== schoolId) {
      return res.status(403).json({
        error: "Permission denied (school mismatch)",
      });
    }

    // ✅ Delete
    await noticeRef.delete();

    return res.json({
      success: true,
      message: "Notice deleted successfully",
    });
  } catch (err) {
    console.error("Delete notice error:", err);
    return res.status(500).json({ error: err.message });
  }
});


