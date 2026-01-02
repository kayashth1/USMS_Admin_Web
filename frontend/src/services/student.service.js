// src/services/student.service.js

import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/config/firebase";

/* ================= GET STUDENTS BY SCHOOL ================= */
export const getStudentsBySchool = async (schoolId) => {
  if (!schoolId) return [];

  const q = query(
    collection(db, "students"),
    where("schoolId", "==", schoolId)
  );

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

/* ================= CREATE STUDENT ================= */
export const createStudent = async (data) => {
  const res = await fetch(
    "https://createstudent-a7i555t2ia-uc.a.run.app",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  
  const result = await res.json();
  
  if (!res.ok) {
    throw new Error(result.error || "Failed to create student");
  }
  
  return result;
};
/* ================= UPDATE STUDENT ================= */


export const updateStudent = async (studentId, data) => {
  if (!studentId) throw new Error("Student ID missing");
  
  const ref = doc(db, "students", studentId);
  
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/* ================= DELETE STUDENT ================= */
export const deleteStudent = async (studentId) => {
  const res = await fetch(
    "https://us-central1-om-mis.cloudfunctions.net/deleteStudent",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to delete student");
  }

  return data;
};
