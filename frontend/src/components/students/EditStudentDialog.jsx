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

const EditStudentDialog = ({ open, onOpenChange, student }) => {
  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          {/* Student Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Student Name
            </label>
            <Input defaultValue={student.name} />
          </div>

          {/* Class */}
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Class
            </label>
            <Select defaultValue={student.class}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10-A">Class 10-A</SelectItem>
                <SelectItem value="9-A">Class 9-A</SelectItem>
                <SelectItem value="9-B">Class 9-B</SelectItem>
                <SelectItem value="8-C">Class 8-C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Roll Number */}
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Roll Number
            </label>
            <Input defaultValue={student.roll} />
          </div>

          {/* Parent Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Parent Name
            </label>
            <Input defaultValue={student.parentName} />
          </div>

          {/* Contact */}
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Contact Number
            </label>
            <Input defaultValue={student.contact} />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Student Email
            </label>
            <Input defaultValue={student.email} />
          </div>

        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudentDialog;
