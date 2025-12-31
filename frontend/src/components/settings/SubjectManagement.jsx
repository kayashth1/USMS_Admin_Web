import { useEffect, useState } from "react";
import {
  addSubject,
  getSubjectsBySchool,
  toggleSubjectStatus,
} from "@/services/subject.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const SubjectManagement = () => {
  const schoolId = localStorage.getItem("principalSchoolId");

  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const loadSubjects = async () => {
    const data = await getSubjectsBySchool(schoolId);
    setSubjects(data);
  };

  useEffect(() => {
    if (schoolId) loadSubjects();
  }, [schoolId]);

  const handleAdd = async () => {
    try {
      setLoading(true);
      await addSubject({ name: newSubject, schoolId });
      setNewSubject("");
      await loadSubjects();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-6">

        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold">Subjects</h2>
          <p className="text-sm text-gray-500">
            Manage subjects offered by your school
          </p>
        </div>

        {/* Add Subject */}
        <div className="flex gap-3">
          <Input
            placeholder="Enter subject name (e.g. Mathematics)"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
          <Button onClick={handleAdd} disabled={loading || !newSubject}>
            Add
          </Button>
        </div>

        {/* Subject List */}
        <div className="space-y-3">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="flex items-center justify-between border rounded-lg p-3"
            >
              <div>
                <p className="font-medium">{subject.name}</p>
                <p className="text-xs text-gray-500">
                  {subject.isActive ? "Active" : "Inactive"}
                </p>
              </div>

              <Switch
                checked={subject.isActive}
                onCheckedChange={(val) =>
                  toggleSubjectStatus(subject.id, val).then(loadSubjects)
                }
              />
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
};

export default SubjectManagement;
