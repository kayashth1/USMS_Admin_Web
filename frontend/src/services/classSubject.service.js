import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { db } from "@/config/firebase";

/* ================= GET SUBJECTS FOR A CLASS ================= */
export const getClassSubjects = async (classId, schoolId) => {
  const q = query(
    collection(db, "classSubjects"),
    where("classId", "==", classId),
    where("schoolId", "==", schoolId)
  );

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

/* ================= ADD SUBJECT TO CLASS ================= */
export const addSubjectToClass = async ({
  classId,
  subjectId,
  schoolId,
}) => {
  await addDoc(collection(db, "classSubjects"), {
    classId,
    subjectId,
    schoolId,
    createdAt: serverTimestamp(),
  });
};

/* ================= REMOVE SUBJECT FROM CLASS ================= */
export const removeSubjectFromClass = async (docId) => {
  await deleteDoc(doc(db, "classSubjects", docId));
};
