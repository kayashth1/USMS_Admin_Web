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
