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
  if (!classId || !schoolId) return [];

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
/*
  FINAL RULE:
  - subjectId MUST come from subjects collection
  - NO subject creation here
*/
export const addSubjectToClass = async ({
  classId,
  subjectId,
  schoolId,
}) => {
  if (!classId || !subjectId || !schoolId) {
    throw new Error("Missing required fields");
  }

  /* Prevent duplicate mapping */
  const q = query(
    collection(db, "classSubjects"),
    where("classId", "==", classId),
    where("subjectId", "==", subjectId),
    where("schoolId", "==", schoolId)
  );

  const snap = await getDocs(q);
  if (!snap.empty) return;

  await addDoc(collection(db, "classSubjects"), {
    classId,
    subjectId,
    schoolId,
    createdAt: serverTimestamp(),
  });
};

/* ================= REMOVE SUBJECT FROM CLASS ================= */
/*
  FINAL RULE:
  - ONLY remove mapping
  - SUBJECT LIFECYCLE IS MANAGED ELSEWHERE
*/
export const removeSubjectFromClass = async (classSubjectId) => {
  await deleteDoc(doc(db, "classSubjects", classSubjectId));
};
