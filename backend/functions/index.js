import { onRequest } from "firebase-functions/v2/https";
import admin from "firebase-admin";

admin.initializeApp();

export const createTeacher = onRequest(async (req, res) => {
  // ✅ CORS HEADERS (MANDATORY)
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight
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
      address,
      schoolName,
    } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 1️⃣ Create Auth user
    const user = await admin.auth().createUser({
      email,
      password,
      displayName: fullName,
    });

    const uid = user.uid;

    // 2️⃣ Set role
    await admin.auth().setCustomUserClaims(uid, {
      role: "teacher",
    });

    // 3️⃣ Firestore
    await admin.firestore().collection("teachers").doc(uid).set({
      id: uid,
      fullName,
      email,
      employeeId,
      subject,
      phone,
      address,
      schoolName,
      role: "teacher",
      isActive: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});
