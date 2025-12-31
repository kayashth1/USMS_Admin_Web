import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/config/firebase";

/* ================= GET ASSIGNMENTS ================= */
export const getTeacherAssignments = async (schoolId) => {
  const q = query(
    collection(db, "teacherClassSubjects"),
    where("schoolId", "==", schoolId)
  );

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

/* ================= ASSIGN ================= */
export const assignTeacher = async ({
  teacherId,
  classId,
  subjectId,
  schoolId,
}) => {
  await addDoc(collection(db, "teacherClassSubjects"), {
    teacherId,
    classId,
    subjectId,
    schoolId,
    createdAt: serverTimestamp(),
  });
};

/* ================= REMOVE ================= */
export const removeTeacherAssignment = async (docId) => {
  await deleteDoc(doc(db, "teacherClassSubjects", docId));
};
