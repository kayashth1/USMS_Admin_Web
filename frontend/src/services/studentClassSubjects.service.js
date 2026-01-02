import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";

/* =========================================
   GET SUBJECTS FOR A STUDENT
========================================= */
export const getSubjectsForStudent = async ({
  classLabel,
  schoolId,
}) => {
  if (!classLabel || !schoolId) return [];

  // 1️⃣ Convert classLabel → classId
  const classId = classLabel.replace("-", "");

  // 2️⃣ Get classSubjects
  const q = query(
    collection(db, "classSubjects"),
    where("classId", "==", classId),
    where("schoolId", "==", schoolId)
  );

  const classSubjectSnap = await getDocs(q);

  if (classSubjectSnap.empty) return [];

  const subjectIds = classSubjectSnap.docs.map(
    (d) => d.data().subjectId
  );

  // 3️⃣ Fetch subjects
  const subjects = await Promise.all(
    subjectIds.map(async (subjectId) => {
      const ref = doc(db, "subjects", subjectId);
      const snap = await getDoc(ref);
      return snap.exists()
        ? { id: snap.id, ...snap.data() }
        : null;
    })
  );

  return subjects.filter(Boolean);
};
