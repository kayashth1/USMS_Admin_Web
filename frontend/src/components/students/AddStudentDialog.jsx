import { useEffect, useState } from "react";

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

import { createStudent } from "@/services/student.service";
import { getClassesBySchool } from "@/services/class.service";

const AddStudentDialog = ({ open, onOpenChange, onSuccess }) => {
  const schoolId = localStorage.getItem("principalSchoolId"); // ✅ DO NOT CHANGE

  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    roll: "",
    classId: "",        // ✅ SOURCE OF TRUTH (DB)
    classLabel: "",     // UI ONLY
    parentName: "",
    contact: "",
  });

  /* ================= FETCH CLASSES ================= */
  useEffect(() => {
    if (!schoolId || !open) return;

    const loadClasses = async () => {
      const data = await getClassesBySchool(schoolId);
      setClasses(data.filter((c) => c.isActive));
    };

    loadClasses();
  }, [schoolId, open]);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  /* ================= CLASS SELECT ================= */
  const handleClassSelect = (docId) => {
    const cls = classes.find((c) => c.docId === docId);
    if (!cls) return;

    setForm((p) => ({
      ...p,
      classId: cls.docId,
      classLabel: `${cls.grade}-${cls.section}`, // UI display only
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      if (!schoolId) {
        throw new Error("School context missing. Please login again.");
      }

      if (
        !form.fullName ||
        !form.email ||
        !form.password ||
        !form.roll ||
        !form.classId
      ) {
        throw new Error("Please fill all required fields");
      }

      setLoading(true);

      await createStudent({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        roll: form.roll,
        classId: form.classId,       // ✅ DB FIELD
        classLabel: form.classLabel, // optional / UI
        parentName: form.parentName,
        contact: form.contact,
        schoolId,
      });

      onOpenChange(false);
      onSuccess?.();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            name="fullName"
            placeholder="Student Name"
            value={form.fullName}
            onChange={handleChange}
          />

          <Input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <Input
            name="roll"
            placeholder="Roll Number"
            value={form.roll}
            onChange={handleChange}
          />

          {/* 🔥 CLASS DROPDOWN (BY SCHOOL) */}
          <Select onValueChange={handleClassSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Class & Section" />
            </SelectTrigger>

            <SelectContent>
              {classes.map((cls) => (
                <SelectItem key={cls.docId} value={cls.docId}>
                  {cls.grade}-{cls.section}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            name="parentName"
            placeholder="Parent Name"
            value={form.parentName}
            onChange={handleChange}
          />

          <Input
            name="contact"
            placeholder="Parent Contact"
            value={form.contact}
            onChange={handleChange}
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add Student"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentDialog;
