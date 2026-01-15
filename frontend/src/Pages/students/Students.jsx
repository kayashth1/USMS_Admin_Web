import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

import AddStudentDialog from "@/components/students/AddStudentDialog";
import EditStudentDialog from "@/components/students/EditStudentDialog";
import DeleteStudentConfirmDialog from "@/components/students/DeleteStudentConfirmDialog";

import { deleteStudent, getStudentsBySchool } from "@/services/student.service";
import { getClassesBySchool } from "@/services/class.service";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const Students = () => {
  const schoolId = localStorage.getItem("principalSchoolId");
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [classesMap, setClassesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [currentclass, setCurrentclass] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadClasses = async () => {
    const data = await getClassesBySchool(schoolId);
    setClasses(data);
  };
  useEffect(() => {
    if (schoolId) loadClasses();
  }, [schoolId]);

  const filteredAndSortedStudents = useMemo(() => {
    return (
      [...students]
        // 1️⃣ Filter by class
        .filter((s) =>
          currentclass === "all" ? true : s.classId === currentclass
        )
        // 2️⃣ Filter by name search
        .filter((s) =>
          s.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        // 3️⃣ Sort by roll number
        .sort((a, b) => Number(a.roll) - Number(b.roll))
    );
  }, [students, currentclass, searchTerm]);

  // Sorting Dropdown menu for classes
  const sortedClasses = useMemo(() => {
    return [...classes].sort((a, b) => {
      // sort by grade number first
      const gradeDiff = Number(a.grade) - Number(b.grade);
      if (gradeDiff !== 0) return gradeDiff;

      // if same grade, sort by section letter
      return a.section.localeCompare(b.section);
    });
  }, [classes]);

  /* ================= FETCH ================= */
  const loadStudents = async () => {
    try {
      setLoading(true);

      const [studentData, classData] = await Promise.all([
        getStudentsBySchool(schoolId),
        getClassesBySchool(schoolId),
      ]);

      setStudents(Array.isArray(studentData) ? studentData : []);

      // 🔥 classId → label map
      const map = {};
      (Array.isArray(classData) ? classData : []).forEach((c) => {
        map[c.docId] = `${c.grade}-${c.section}`;
      });
      setClassesMap(map);
    } catch (err) {
      console.error("Failed to fetch students:", err);
      setStudents([]);
      setClassesMap({});
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
          <Input
            placeholder="Search by student name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Select value={currentclass} onValueChange={setCurrentclass}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Sections" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Sections</SelectItem>

              {sortedClasses.map((c) => (
                <SelectItem key={c.docId} value={c.docId}>
                  {c.grade}-{c.section}
                </SelectItem>
              ))}
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
              {filteredAndSortedStudents.map((s) => (
                <tr key={s.id}>
                  {/* Roll */}
                  <td className="px-4 py-3">{s.roll || "-"}</td>

                  {/* Student */}
                  <td className="px-4 py-3">
                    <p className="font-medium">{s.fullName}</p>
                    <p className="text-xs text-gray-500">{s.email}</p>
                  </td>

                  {/* 🔥 Class (FIXED via classId) */}
                  <td className="px-4 py-3">{classesMap[s.classId] || "-"}</td>

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
            Showing {filteredAndSortedStudents.length} students
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
