import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/config/firebase";

/* ================= ADD SUBJECT ================= */
export const addSubject = async ({ name, schoolId }) => {
  if (!name || !schoolId) {
    throw new Error("Missing subject name or school");
  }

  await addDoc(collection(db, "subjects"), {
    name: name.trim(),
    schoolId,
    isActive: true,
    createdAt: serverTimestamp(),
  });
};

/* ================= GET SUBJECTS ================= */
export const getSubjectsBySchool = async (schoolId) => {
  const q = query(
    collection(db, "subjects"),
    where("schoolId", "==", schoolId)
  );

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

/* ================= TOGGLE SUBJECT ================= */
export const toggleSubjectStatus = async (subjectId, isActive) => {
  const ref = doc(db, "subjects", subjectId);

  await updateDoc(ref, {
    isActive,
  });
};
