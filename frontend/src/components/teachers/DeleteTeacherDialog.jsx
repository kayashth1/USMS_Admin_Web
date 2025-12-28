import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { deactivateTeacher } from "@/services/teacher.service";

const DeleteTeacherDialog = ({
  open,
  onOpenChange,
  teacher,
  onDeleted,
}) => {
  const [loading, setLoading] = useState(false);

  if (!teacher) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deactivateTeacher(teacher.id);

      onDeleted();              // refresh list/profile
      onOpenChange(false);      // close dialog
    } catch (error) {
      console.error("Delete teacher error:", error);
      alert("Failed to delete teacher");
    } finally {
      setLoading(false);
    }
  };

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
            Are you sure you want to deactivate the following teacher?
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
            The teacher will no longer be able to access the system.
            Related data will remain intact.
          </p>
        </div>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Teacher"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTeacherDialog;
