import { useEffect, useState } from "react";
import { getSubjectsBySchool } from "@/services/subject.service";
import {
  getClassSubjects,
  addSubjectToClass,
  removeSubjectFromClass,
} from "@/services/classSubject.service";
import { getClassesBySchool } from "@/services/class.service";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const ClassSubjectManagement = () => {
  const schoolId = localStorage.getItem("principalSchoolId");

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [assigned, setAssigned] = useState([]);

  /* ================= LOAD BASE DATA ================= */
  useEffect(() => {
    if (!schoolId) return;

    getClassesBySchool(schoolId).then(setClasses);
    getSubjectsBySchool(schoolId).then((data) =>
      setSubjects(data.filter((s) => s.isActive))
    );
  }, [schoolId]);

  /* ================= LOAD CLASS SUBJECTS ================= */
  useEffect(() => {
    if (!selectedClass || !schoolId) return;

    getClassSubjects(selectedClass, schoolId).then(setAssigned);
  }, [selectedClass, schoolId]);

  const toggleSubject = async (subjectId) => {
    const existing = assigned.find(
      (a) => a.subjectId === subjectId
    );

    if (existing) {
      await removeSubjectFromClass(existing.id);
    } else {
      await addSubjectToClass({
        classId: selectedClass,
        subjectId,
        schoolId,
      });
    }

    const updated = await getClassSubjects(selectedClass, schoolId);
    setAssigned(updated);
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-6">

        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold">
            Assign Subjects to Section
          </h2>
          <p className="text-sm text-gray-500">
            Subjects selected here apply only to the chosen section
          </p>
        </div>

        {/* Class Select */}
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Section" />
          </SelectTrigger>
          <SelectContent>
            {classes.map((cls) => (
              <SelectItem key={cls.docId} value={cls.id}>
                {cls.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Subject Checkboxes */}
        {selectedClass && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {subjects.map((subject) => (
              <label
                key={subject.id}
                className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer"
              >
                <Checkbox
                  checked={assigned.some(
                    (a) => a.subjectId === subject.id
                  )}
                  onCheckedChange={() =>
                    toggleSubject(subject.id)
                  }
                />
                <span>{subject.name}</span>
              </label>
            ))}
          </div>
        )}

      </CardContent>
    </Card>
  );
};

export default ClassSubjectManagement;
