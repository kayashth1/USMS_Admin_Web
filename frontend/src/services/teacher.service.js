// src/services/teacher.service.js

import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth, db } from "@/config/firebase";

/* =====================================================
   CREATE TEACHER (DEMO ONLY – FRONTEND)
===================================================== */
export const createTeacher = async (teacherData) => {
  const res = await fetch(
    "https://createteacher-a7i555t2ia-uc.a.run.app",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teacherData),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to create teacher");
  }

  return data;
};


/* =====================================================
   GET ALL TEACHERS
===================================================== */
export const getTeachers = async () => {
  const snapshot = await getDocs(collection(db, "teachers"));

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
};

/* =====================================================
   GET SINGLE TEACHER
===================================================== */
export const getTeacherById = async (teacherId) => {
  const ref = doc(db, "teachers", teacherId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
};

/* =====================================================
   UPDATE TEACHER
===================================================== */
export const updateTeacher = async (teacherId, updatedData) => {
  const ref = doc(db, "teachers", teacherId);

  await updateDoc(ref, {
    ...updatedData,
    updatedAt: serverTimestamp(),
  });
};

/* =====================================================
   SOFT DELETE TEACHER
===================================================== */
export const deactivateTeacher = async (teacherId) => {
  const ref = doc(db, "teachers", teacherId);

  await updateDoc(ref, {
    isActive: false,
    deactivatedAt: serverTimestamp(),
  });
};
