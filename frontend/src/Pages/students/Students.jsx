import { students } from "@/data/students";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import AddStudentDialog from "@/components/students/AddStudentDialog";
import EditStudentDialog from "@/components/students/EditStudentDialog";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const Students = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
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
        <Button onClick={() => setAddOpen(true)}>+ Add Student</Button>{" "}
      </div>

      {/* ===== Filters ===== */}
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search by name, roll number, or parent name..."
            className="md:flex-1"
          />

          <Select>
            <SelectTrigger className="md:w-40">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="10-A">Class 10-A</SelectItem>
              <SelectItem value="9-A">Class 9-A</SelectItem>
              <SelectItem value="9-B">Class 9-B</SelectItem>
              <SelectItem value="8-C">Class 8-C</SelectItem>
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
                <th className="px-4 py-3 text-left">Roll No</th>
                <th className="px-4 py-3 text-left">Student</th>
                <th className="px-4 py-3 text-left">Class</th>
                <th className="px-4 py-3 text-left">Parent Name</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-4 py-3">{student.roll}</td>

                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-xs text-gray-500">{student.email}</p>
                    </div>
                  </td>

                  <td className="px-4 py-3">Class {student.class}</td>

                  <td className="px-4 py-3">{student.parentName}</td>

                  <td className="px-4 py-3">{student.contact}</td>

                  <td className="px-4 py-3 flex gap-2">
                    <Button size="icon" variant="ghost">
                      👁️
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setSelectedStudent(student);
                        setEditOpen(true);
                      }}
                    >
                      ✏️
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-500"
                    >
                      🗑️
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer */}
          <div className="p-4 text-sm text-gray-500">
            Showing {students.length} students
          </div>
        </CardContent>
      </Card>
      <AddStudentDialog open={addOpen} onOpenChange={setAddOpen} />
      <EditStudentDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        student={selectedStudent}
      />
    </div>
  );
};

export default Students;
