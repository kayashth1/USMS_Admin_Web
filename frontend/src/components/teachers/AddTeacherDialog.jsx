import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createTeacher } from "@/services/teacher.service";

const AddTeacherDialog = ({ open, onOpenChange }) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    employeeId: "",
    email: "",
    password: "",
    phone: "",
    subject: "",
    joiningDate: "",
    address: "",
    schoolName: "IIT ISM Dhanbad",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTeacher = async () => {
    try {
      setLoading(true);

      await createTeacher(form);

      onOpenChange(false);
    } catch (error) {
      console.error("Create teacher error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Teacher</DialogTitle>
        </DialogHeader>

        {/* ===== FORM ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label>Full Name</Label>
            <Input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <Label>Employee ID</Label>
            <Input
              name="employeeId"
              value={form.employeeId}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <Label>Phone</Label>
            <Input
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <Label>Subject</Label>
            <Input
              name="subject"
              value={form.subject}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <Label>Joining Date</Label>
            <Input
              name="joiningDate"
              value={form.joiningDate}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <Label>Address</Label>
            <Input
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <Label>School Name</Label>
            <Input
              name="schoolName"
              value={form.schoolName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={handleAddTeacher} disabled={loading}>
            {loading ? "Adding..." : "Add Teacher"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeacherDialog;
