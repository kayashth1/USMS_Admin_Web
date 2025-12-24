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

const EditTeacherDialog = ({ open, onOpenChange, teacher }) => {
  if (!teacher) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Teacher</DialogTitle>
        </DialogHeader>

        {/* ===== FORM (UI only) ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="space-y-1">
            <Label>Full Name</Label>
            <Input defaultValue={teacher.fullName} />
          </div>

          <div className="space-y-1">
            <Label>Employee ID</Label>
            <Input defaultValue={teacher.employeeId} disabled />
          </div>

          <div className="space-y-1">
            <Label>Email</Label>
            <Input defaultValue={teacher.email} />
          </div>

          <div className="space-y-1">
            <Label>Phone</Label>
            <Input defaultValue={teacher.phone} />
          </div>

          <div className="space-y-1">
            <Label>Subject</Label>
            <Input defaultValue={teacher.subject} />
          </div>

          <div className="space-y-1">
            <Label>Joining Date</Label>
            <Input defaultValue={teacher.joiningDate} />
          </div>

          <div className="space-y-1 md:col-span-2">
            <Label>Address</Label>
            <Input defaultValue={teacher.address} />
          </div>

          <div className="space-y-1 md:col-span-2">
            <Label>School Name</Label>
            <Input defaultValue={teacher.schoolName} />
          </div>

        </div>

        {/* ===== FOOTER ===== */}
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled>
            Save Changes
          </Button>
        </DialogFooter>

        {/* NOTE */}
        <p className="text-xs text-gray-500 mt-2">
          * This is UI only. Changes will be connected to Firebase later.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default EditTeacherDialog;
