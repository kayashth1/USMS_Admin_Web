import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

const TeacherProfile = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState(null);
  const [school, setSchool] = useState(null); // ✅ NEW
  const [assignedClasses, setAssignedClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH TEACHER ================= */
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        if (!teacherId) {
          setTeacher(null);
          return;
        }

        const ref = doc(db, "teachers", teacherId);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setTeacher({
            id: snap.id,
            ...snap.data(),
          });
        } else {
          setTeacher(null);
        }
      } catch (err) {
        console.error("Failed to fetch teacher:", err);
        setTeacher(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [teacherId]);

  /* ================= FETCH SCHOOL ================= */
  useEffect(() => {
    const fetchSchool = async () => {
      try {
        if (!teacher?.schoolId) {
          setSchool(null);
          return;
        }

        const schoolRef = doc(db, "schools", teacher.schoolId);
        const snap = await getDoc(schoolRef);

        if (snap.exists()) {
          setSchool(snap.data());
        } else {
          setSchool(null);
        }
      } catch (err) {
        console.error("Failed to fetch school:", err);
        setSchool(null);
      }
    };

    fetchSchool();
  }, [teacher]);

  /* ========== FETCH ASSIGNED CLASSES ========== */
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        if (!teacherId) return;

        const q = query(
          collection(db, "teacherClassAssignments"),
          where("teacherId", "==", teacherId)
        );

        const snap = await getDocs(q);

        setAssignedClasses(
          snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }))
        );
      } catch (err) {
        console.error("Failed to fetch classes:", err);
        setAssignedClasses([]);
      }
    };

    fetchClasses();
  }, [teacherId]);

  /* ================= STATES ================= */
  if (loading) return <p>Loading...</p>;
  if (!teacher) return <p>Teacher not found</p>;

  return (
    <div className="space-y-6">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-2"
          >
            ← Back
          </Button>

          <h1 className="text-2xl font-semibold">
            {teacher.fullName || "Unnamed Teacher"}
          </h1>

          <p className="text-gray-500">
            {teacher.subject || "-"}
          </p>
        </div>

        <Badge
          className={
            teacher.isActive === false
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }
        >
          {teacher.isActive === false ? "Inactive" : "Active"}
        </Badge>
      </div>

      {/* ===== Profile Summary ===== */}
      <Card>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Employee ID</p>
            <p className="font-medium">
              {teacher.employeeId || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Joining Date</p>
            <p className="font-medium">
              {teacher.joiningDate || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">
              {teacher.email || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">
              {teacher.phone || "-"}
            </p>
          </div>

          {/* ✅ SCHOOL NAME (DERIVED FROM schoolId) */}
          <div>
            <p className="text-sm text-gray-500">School</p>
            <p className="font-medium">
              {school?.name || "—"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">
              {teacher.address || "-"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ===== Tabs ===== */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="classes">Assigned Classes</TabsTrigger>
          <TabsTrigger value="notices">Notices</TabsTrigger>
          <TabsTrigger value="materials">Study Materials</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardContent className="p-6 text-gray-600">
              Performance, attendance summary, and analytics will appear here.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classes">
          <Card>
            <CardContent className="p-6 space-y-3">
              {assignedClasses.length === 0 ? (
                <p className="text-gray-500">
                  No classes assigned yet.
                </p>
              ) : (
                assignedClasses.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border rounded-md p-3"
                  >
                    <div>
                      <p className="font-medium">
                        Class {item.class}
                      </p>
                      <p className="text-sm text-gray-500">
                        Subject: {item.subject}
                      </p>
                    </div>

                    <Badge variant="secondary">
                      Active
                    </Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notices">
          <Card>
            <CardContent className="p-6">
              Notices sent by this teacher will appear here.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials">
          <Card>
            <CardContent className="p-6">
              Uploaded study material will appear here.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherProfile;
