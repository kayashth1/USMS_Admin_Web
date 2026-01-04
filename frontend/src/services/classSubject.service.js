import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";

/* ================= GET SUBJECTS FOR A CLASS ================= */
export const getClassSubjects = async (classId, schoolId) => {
  if (!classId || !schoolId) return [];

  const q = query(
    collection(db, "classSubjects"),
    where("classId", "==", classId),   // ✅ MUST be classes.docId
    where("schoolId", "==", schoolId)
  );

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

/* ================= ADD SUBJECT TO CLASS ================= */
/*
  🔥 IMPORTANT:
  - classId MUST be classes.docId
  - NEVER pass "9C" or "10-A"
*/
export const addSubjectToClass = async ({
  classId,
  subjectId,
  schoolId,
}) => {
  if (!classId || !subjectId || !schoolId) {
    throw new Error("Missing required fields");
  }

  await addDoc(collection(db, "classSubjects"), {
    classId,            // ✅ UID of class document
    subjectId,          // UID of subject document
    schoolId,
    createdAt: serverTimestamp(),
  });
};

/* ================= REMOVE SUBJECT FROM CLASS ================= */
export const removeSubjectFromClass = async (docId) => {
  await deleteDoc(doc(db, "classSubjects", docId));
};
