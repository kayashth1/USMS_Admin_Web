import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { updateStudent } from "@/services/student.service";
import { getClassesBySchool } from "@/services/class.service";

const EditStudentDialog = ({ open, onOpenChange, student, onSuccess }) => {
  const schoolId = localStorage.getItem("principalSchoolId");

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(null);
  const [classes, setClasses] = useState([]);

  /* ================= INIT FORM ================= */
  useEffect(() => {
    if (student) {
      setForm({
        fullName: student.fullName || "",
        roll: student.roll || "",
        classLabel: student.classLabel || "",
        parentName: student.parentName || "",
        contact: student.contact || "",
      });
    }
  }, [student]);

  /* ================= FETCH CLASSES ================= */
  useEffect(() => {
    const fetchClasses = async () => {
      if (!schoolId) return;

      try {
        const data = await getClassesBySchool(schoolId);
        setClasses(data.filter((c) => c.isActive));
      } catch (err) {
        console.error("Failed to fetch classes:", err);
        setClasses([]);
      }
    };

    fetchClasses();
  }, [schoolId]);

  if (!student || !form) return null;

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await updateStudent(student.id, form);

      onOpenChange(false);
      onSuccess?.();
    } catch (err) {
      alert(err.message || "Failed to update student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Student Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Student Name</label>
            <Input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>

          {/* Class (FROM SCHOOL CLASSES) */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Class</label>
            <Select
              value={form.classLabel}
              onValueChange={(v) =>
                setForm((p) => ({ ...p, classLabel: v }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>

              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem
                    key={cls.docId}
                    value={`${cls.grade}-${cls.section}`}
                  >
                    Class {cls.grade}-{cls.section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Roll */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Roll Number</label>
            <Input
              name="roll"
              value={form.roll}
              onChange={handleChange}
            />
          </div>

          {/* Parent Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Parent Name</label>
            <Input
              name="parentName"
              value={form.parentName}
              onChange={handleChange}
            />
          </div>

          {/* Contact */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Parent Contact</label>
            <Input
              name="contact"
              value={form.contact}
              onChange={handleChange}
            />
          </div>

          {/* Email (READ ONLY) */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <Input value={student.email} disabled />
            <p className="text-xs text-gray-500">
              Email cannot be changed (login credential)
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudentDialog;
