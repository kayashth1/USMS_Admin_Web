import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

import AddStudentDialog from "@/components/students/AddStudentDialog";
import EditStudentDialog from "@/components/students/EditStudentDialog";
import { deleteStudent } from "@/services/student.service";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { getStudentsBySchool } from "@/services/student.service";
import DeleteStudentConfirmDialog from "@/components/students/DeleteStudentConfirmDialog";

const Students = () => {
  const schoolId = localStorage.getItem("principalSchoolId");

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
const [studentToDelete, setStudentToDelete] = useState(null);
const [deleteLoading, setDeleteLoading] = useState(false);

  const navigate = useNavigate();

  /* ================= FETCH ================= */
  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await getStudentsBySchool(schoolId);
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch students:", err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (schoolId) loadStudents();
  }, [schoolId]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading students...</p>;
  }

  return (
    <div className="space-y-6">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Student Management</h1>
          <p className="text-gray-500">
            Manage student records and information
          </p>
        </div>
        <Button onClick={() => setAddOpen(true)}>+ Add Student</Button>
      </div>

      {/* ===== Filters (UI only for now) ===== */}
      <Card>
        <CardContent className="p-4 flex gap-4">
          <Input placeholder="Search by name or roll number..." />

          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Sections" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {/* dynamic later */}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* ===== Students Table ===== */}
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Roll</th>
                <th className="px-4 py-3 text-left">Student</th>
                <th className="px-4 py-3 text-left">Class</th>
                <th className="px-4 py-3 text-left">Parent</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {students.map((s) => (
                <tr key={s.id}>
                  {/* Roll */}
                  <td className="px-4 py-3">{s.roll || "-"}</td>

                  {/* Student */}
                  <td className="px-4 py-3">
                    <p className="font-medium">{s.fullName}</p>
                    <p className="text-xs text-gray-500">{s.email}</p>
                  </td>

                  {/* Class */}
                  <td className="px-4 py-3">{s.classLabel || "-"}</td>

                  {/* Parent */}
                  <td className="px-4 py-3">{s.parentName || "-"}</td>

                  {/* Contact */}
                  <td className="px-4 py-3">{s.contact || "-"}</td>

                  {/* Actions */}
                  <td className="px-4 py-3 flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => navigate(`/students/${s.id}`)}
                    >
                      👁️
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setSelectedStudent(s);
                        setEditOpen(true);
                      }}
                    >
                      ✏️
                    </Button>
<Button
  size="icon"
  variant="ghost"
  className="text-red-500"
  onClick={() => {
    setStudentToDelete(s);
    setDeleteOpen(true);
  }}
>
  🗑️
</Button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="p-4 text-sm text-gray-500">
            Showing {students.length} students
          </div>
        </CardContent>
      </Card>

      {/* ===== Dialogs ===== */}
      <AddStudentDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        onSuccess={loadStudents}
      />

      <EditStudentDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        student={selectedStudent}
        onSuccess={loadStudents}
      />
      <DeleteStudentConfirmDialog
  open={deleteOpen}
  onOpenChange={setDeleteOpen}
  student={studentToDelete}
  loading={deleteLoading}
  onConfirm={async () => {
    try {
      setDeleteLoading(true);
      await deleteStudent(studentToDelete.id);
      loadStudents();
      setDeleteOpen(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleteLoading(false);
    }
  }}
/>

    </div>
  );
};

export default Students;
