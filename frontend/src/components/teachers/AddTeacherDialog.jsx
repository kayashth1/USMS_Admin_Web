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

const AddTeacherDialog = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Teacher</DialogTitle>
        </DialogHeader>

        {/* ===== FORM (UI only) ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="space-y-1">
            <Label>Full Name</Label>
            <Input placeholder="Enter full name" />
          </div>

          <div className="space-y-1">
            <Label>Employee ID</Label>
            <Input placeholder="EMP-001" />
          </div>

          <div className="space-y-1">
            <Label>Email</Label>
            <Input placeholder="teacher@school.com" />
          </div>

          <div className="space-y-1">
            <Label>Phone</Label>
            <Input placeholder="+91 9876543210" />
          </div>

          <div className="space-y-1">
            <Label>Subject</Label>
            <Input placeholder="Mathematics" />
          </div>

          <div className="space-y-1">
            <Label>Joining Date</Label>
            <Input placeholder="April 15, 2025" />
          </div>

          <div className="space-y-1 md:col-span-2">
            <Label>Address</Label>
            <Input placeholder="Enter address" />
          </div>

          <div className="space-y-1 md:col-span-2">
            <Label>School Name</Label>
            <Input placeholder="IIT ISM Dhanbad" />
          </div>

        </div>

        {/* ===== FOOTER ===== */}
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled>
            Add Teacher
          </Button>
        </DialogFooter>

        {/* NOTE */}
        <p className="text-xs text-gray-500 mt-2">
          * This is a dummy form. Firebase integration will be added later.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeacherDialog;
