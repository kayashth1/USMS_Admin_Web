import { teachers } from "@/data/teachers";
import { teacherClassAssignments } from "@/data/teacherClassAssignments";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EditTeacherDialog from "@/components/teachers/EditTeacherDialog";
import AddTeacherDialog from "@/components/teachers/AddTeacherDialog";
import DeleteTeacherDialog from "@/components/teachers/DeleteTeacherDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Plus, Mail, Phone, Pencil, Trash2 } from "lucide-react";

const Teachers = () => {
  // UI-derived values (NOT stored in data)
  const activeTeachers = teachers;
  const onLeaveTeachers = []; // future: leave collection
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);

  // Assigned Class Login..
const assignedClasses = teacherClassAssignments.filter(
  (a) => a.teacherId === teachers.id
);
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Teacher Management</h1>
          <p className="text-gray-500">Manage teachers and their assignments</p>
        </div>

        <Button className="gap-2" onClick={() => setAddOpen(true)}>
          <Plus size={16} />
          Add Teacher
        </Button>
      </div>

      {/* ================= SEARCH & FILTER ================= */}
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search by name, email, or subject..."
            className="md:w-1/2"
          />

          <Select>
            <SelectTrigger className="md:w-48">
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="mathematics">Mathematics</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="english">English</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">More Filters</Button>
        </CardContent>
      </Card>

      {/* ================= TABS ================= */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">
            All Teachers ({teachers.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Active ({activeTeachers.length})
          </TabsTrigger>
          <TabsTrigger value="leave">
            On Leave ({onLeaveTeachers.length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* ================= TEACHER CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <Card key={teacher.id}>
            <CardContent className="p-6 space-y-4">
              {/* Top Section */}
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                    👤
                  </div>

                  <div>
                    <h3 className="font-semibold">{teacher.fullName}</h3>
                    <p className="text-sm text-gray-500">{teacher.subject}</p>
                  </div>
                </div>

                {/* UI-derived status */}
                <Badge className="bg-green-100 text-green-700">Active</Badge>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  {teacher.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  {teacher.phone}
                </div>
              </div>

              {/* Assigned Classes (UI placeholder) */}
                        <div>
                <p className="text-sm text-gray-500">
                  Assigned Classes
                </p>
                <p className="text-sm font-medium">
                  Class 9A, 9B, 10A
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="secondary"
                  className=""
                  onClick={() => navigate(`/teachers/${teacher.id}`)}
                >
                  View Profile
                </Button>

                <div className="flex gap-2 ml-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      setSelectedTeacher(teacher);
                      setEditOpen(true);
                    }}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-red-500"
                    onClick={() => {
                      setTeacherToDelete(teacher);
                      setDeleteOpen(true);
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <EditTeacherDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        teacher={selectedTeacher}
      />
      <AddTeacherDialog open={addOpen} onOpenChange={setAddOpen} />
      <DeleteTeacherDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        teacher={teacherToDelete}
      />
    </div>
  );
};

export default Teachers;
