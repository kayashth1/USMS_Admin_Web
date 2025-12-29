import { getTeachersBySchool } from "@/services/teacher.service";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import EditTeacherDialog from "@/components/teachers/EditTeacherDialog";
import AddTeacherDialog from "@/components/teachers/AddTeacherDialog";
import DeleteTeacherDialog from "@/components/teachers/DeleteTeacherDialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Plus, Mail, Phone, Pencil, Trash2 } from "lucide-react";

const Teachers = () => {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tab, setTab] = useState("all");

  const [editOpen, setEditOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const [addOpen, setAddOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);

  /* ================= CONTEXT ================= */
  const schoolId = localStorage.getItem("principalSchoolId");

  /* ================= FETCH ================= */
const reloadTeachers = async () => {
  try {
    setLoading(true);

    if (!schoolId) {
      console.error("School ID missing");
      setTeachers([]); // ✅ always array
      return;
    }

    const data = await getTeachersBySchool(schoolId);

    // ✅ HARD GUARD
    setTeachers(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    setTeachers([]); // ✅ prevent crash
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    reloadTeachers();
  }, [schoolId]);

  /* ================= DERIVED ================= */
const activeTeachers = (teachers ?? []).filter(
  (t) => t.isActive !== false
);


const visibleTeachers =
  tab === "active" ? activeTeachers : (teachers ?? []);


  /* ================= LOADING ================= */
  if (loading) {
    return <div className="p-6 text-gray-500">Loading teachers...</div>;
  }

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Teacher Management</h1>
          <p className="text-gray-500">
            Manage teachers associated with your school
          </p>
        </div>

        <Button className="gap-2" onClick={() => setAddOpen(true)}>
          <Plus size={16} />
          Add Teacher
        </Button>
      </div>

      {/* SEARCH (UI ONLY) */}
      <Card>
        <CardContent className="p-4">
          <Input placeholder="Search teachers..." />
        </CardContent>
      </Card>

      {/* TABS */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">
            All ({teachers.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Active ({activeTeachers.length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* TEACHERS GRID */}
      {visibleTeachers.length === 0 ? (
        <p className="text-gray-500">No teachers found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleTeachers.map((teacher) => (
            <Card key={teacher.id}>
              <CardContent className="p-6 space-y-4">
                {/* Header */}
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {teacher.fullName}
                    </h3>
                    <p className="text-sm text-gray-500">
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

                {/* Contact */}
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail size={14} />
                    {teacher.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} />
                    {teacher.phone || "-"}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between pt-2">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      navigate(`/teachers/${teacher.id}`)
                    }
                  >
                    View Profile
                  </Button>

                  <div className="flex gap-2">
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
      )}

      {/* DIALOGS */}
      <AddTeacherDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        onSuccess={reloadTeachers}
      />

      <EditTeacherDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        teacher={selectedTeacher}
        onUpdated={reloadTeachers}
      />

      <DeleteTeacherDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        teacher={teacherToDelete}
        onDeleted={reloadTeachers}
      />
    </div>
  );
};

export default Teachers;
