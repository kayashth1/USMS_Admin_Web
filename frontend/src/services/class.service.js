import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/config/firebase";

/* ================= CREATE CLASS ================= */
export const createClass = async ({ grade, section, schoolId }) => {
  if (!grade || !section || !schoolId) {
    throw new Error("Missing class data");
  }

  const id = `${grade}${section.toUpperCase()}`;

  await addDoc(collection(db, "classes"), {
    id,
    grade: Number(grade),
    section: section.toUpperCase(),
    schoolId,
    isActive: true,
    createdAt: serverTimestamp(),
  });
};

/* ================= GET CLASSES ================= */
export const getClassesBySchool = async (schoolId) => {
  const q = query(
    collection(db, "classes"),
    where("schoolId", "==", schoolId)
  );

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    docId: d.id,
    ...d.data(),
  }));
};

/* ================= TOGGLE CLASS ================= */
export const toggleClassStatus = async (docId, isActive) => {
  await updateDoc(doc(db, "classes", docId), { isActive });
};
