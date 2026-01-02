import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StudentProfile = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const ref = doc(db, "students", studentId);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setStudent({ id: snap.id, ...snap.data() });
        } else {
          setStudent(null);
        }
      } catch (err) {
        console.error("Failed to fetch student:", err);
        setStudent(null);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) fetchStudent();
  }, [studentId]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!student) return <p className="p-6">Student not found</p>;

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            {student.fullName}
          </h1>
          <p className="text-gray-500">
            {student.classLabel}
          </p>
        </div>

        <Badge className="bg-green-100 text-green-700">
          Active
        </Badge>
      </div>

      <Card>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Info label="Roll Number" value={student.roll} />
          <Info label="Email" value={student.email} />
          <Info label="Parent Name" value={student.parentName} />
          <Info label="Contact" value={student.contact} />
          <Info label="School ID" value={student.schoolId} />
        </CardContent>
      </Card>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value || "-"}</p>
  </div>
);

export default StudentProfile;
