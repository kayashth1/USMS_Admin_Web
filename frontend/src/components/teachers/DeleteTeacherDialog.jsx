import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteTeacherDialog = ({ open, onOpenChange, teacher }) => {
  if (!teacher) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600">
            Delete Teacher
          </DialogTitle>
        </DialogHeader>

        <div className="text-sm text-gray-600 space-y-2">
          <p>
            Are you sure you want to delete the following teacher?
          </p>

          <div className="bg-gray-50 border rounded-md p-3">
            <p className="font-medium text-gray-800">
              {teacher.fullName}
            </p>
            <p className="text-xs text-gray-500">
              {teacher.subject} · {teacher.employeeId}
            </p>
          </div>

          <p className="text-xs text-gray-500">
            This action cannot be undone. All related data
            (attendance, notices, materials) will be affected.
          </p>
        </div>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            disabled
          >
            Delete Teacher
          </Button>
        </DialogFooter>

        <p className="text-xs text-gray-500 mt-2">
          * Delete action will be enabled after Firebase integration.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTeacherDialog;
