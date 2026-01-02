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
      subject,
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
      subject: subject || "",
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
      classLabel,
      parentName,
      contact,
      schoolId,
    } = req.body;

    if (!fullName || !email || !password || !schoolId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 1️⃣ Create Auth user
    const user = await admin.auth().createUser({
      email,
      password,
      displayName: fullName,
    });

    const uid = user.uid;

    // 2️⃣ Claims
    await admin.auth().setCustomUserClaims(uid, {
      role: "student",
      schoolId,
    });

    // 3️⃣ Firestore
    await admin.firestore().collection("students").doc(uid).set({
      id: uid,
      fullName,
      email,
      roll: roll || "",
      classLabel: classLabel || "",
      parentName: parentName || "",
      contact: contact || "",
      schoolId,              // 🔥 ONLY FK
      role: "student",
      isActive: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({ success: true });
  } catch (err) {
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