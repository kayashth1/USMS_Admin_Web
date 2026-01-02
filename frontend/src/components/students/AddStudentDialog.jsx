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
    classLabel: "",
    parentName: "",
    contact: "",
  });

  /* ================= LOAD CLASSES ================= */
  useEffect(() => {
    if (!schoolId) return;

    const loadClasses = async () => {
      const data = await getClassesBySchool(schoolId);
      setClasses(data.filter((c) => c.isActive));
    };

    loadClasses();
  }, [schoolId]);

  /* ================= CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
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
        !form.classLabel
      ) {
        throw new Error("Please fill all required fields");
      }

      setLoading(true);

      await createStudent({
        ...form,
        schoolId, // ✅ ONLY FOREIGN KEY
      });

      onOpenChange(false);
      onSuccess?.();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

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

          {/* 🔥 DYNAMIC CLASSES */}
          <Select
            value={form.classLabel}
            onValueChange={(v) =>
              setForm((p) => ({ ...p, classLabel: v }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Class & Section" />
            </SelectTrigger>

            <SelectContent>
              {classes.map((c) => (
                <SelectItem
                  key={c.docId}
                  value={`${c.grade}-${c.section}`}
                >
                  {c.grade}-{c.section}
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
