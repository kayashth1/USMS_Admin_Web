import { useState } from "react";

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

const AddStudentDialog = ({ open, onOpenChange, onSuccess }) => {
  const schoolId = localStorage.getItem("principalSchoolId"); // ✅ ONLY THIS

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    roll: "",
    classLabel: "",
    parentName: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!schoolId) {
        throw new Error("School context missing. Please login again.");
      }

      setLoading(true);

      await createStudent({
        ...form,
        schoolId, // 🔥 ONLY FOREIGN KEY
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
          <Input name="fullName" placeholder="Student Name" onChange={handleChange} />
          <Input name="email" placeholder="Email" onChange={handleChange} />
          <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
          <Input name="roll" placeholder="Roll Number" onChange={handleChange} />

          <Select onValueChange={(v) =>
            setForm((p) => ({ ...p, classLabel: v }))
          }>
            <SelectTrigger>
              <SelectValue placeholder="Class & Section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10-A">10-A</SelectItem>
              <SelectItem value="10-B">10-B</SelectItem>
              <SelectItem value="9-A">9-A</SelectItem>
            </SelectContent>
          </Select>

          <Input name="parentName" placeholder="Parent Name" onChange={handleChange} />
          <Input name="contact" placeholder="Parent Contact" onChange={handleChange} />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
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
  