import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase";

import { saveTeacherTimetable } from "@/services/timetable.service";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const EMPTY_WEEK = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
};

const EMPTY_SLOT = {
  from: "",
  to: "",
  classId: "",
  subjectId: "",
  classLabel: "",
  subjectName: "",
};

const TeacherTimetableTab = ({ teacherId, schoolId }) => {
  const [timetable, setTimetable] = useState({ week: EMPTY_WEEK });
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addingDay, setAddingDay] = useState(null);
  const [editing, setEditing] = useState(null); // { day, index }
  const [slotForm, setSlotForm] = useState(EMPTY_SLOT);

  /* ================= LOAD TIMETABLE ================= */
  useEffect(() => {
    const load = async () => {
      try {
        if (!teacherId || !schoolId) return;

        const ref = doc(db, "teacherTimetables", teacherId);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setTimetable(snap.data());
        } else {
          setTimetable({ week: EMPTY_WEEK });
        }
      } catch (err) {
        console.error("Failed to load timetable", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [teacherId, schoolId]);

  /* ================= LOAD ASSIGNMENTS ================= */
  useEffect(() => {
    const loadAssignments = async () => {
      if (!teacherId || !schoolId) return;

      const q = query(
        collection(db, "teacherClassSubjects"),
        where("teacherId", "==", teacherId),
        where("schoolId", "==", schoolId)
      );

      const snap = await getDocs(q);

      const resolved = await Promise.all(
        snap.docs.map(async (d) => {
          const { classId, subjectId } = d.data();

          const classSnap = await getDoc(doc(db, "classes", classId));
          const subjectSnap = await getDoc(doc(db, "subjects", subjectId));

          return {
            classId,
            subjectId,
            classLabel: classSnap.exists()
              ? `${classSnap.data().grade}-${classSnap.data().section}`
              : "Unknown Class",
            subjectName: subjectSnap.exists()
              ? subjectSnap.data().name
              : "Unknown Subject",
          };
        })
      );

      setAssignments(resolved);
    };

    loadAssignments();
  }, [teacherId, schoolId]);

  /* ================= SAVE ================= */
  const persist = async (updatedWeek) => {
    await saveTeacherTimetable({
      teacherId,
      schoolId,
      week: updatedWeek,
    });
    setTimetable({ week: updatedWeek });
  };

  /* ================= ADD SLOT ================= */
  const handleAddSlot = async (day) => {
    if (!slotForm.from || !slotForm.to || !slotForm.classId) {
      alert("All fields required");
      return;
    }

    const updated = structuredClone(timetable.week);
    updated[day].push(slotForm);

    await persist(updated);

    setAddingDay(null);
    setSlotForm(EMPTY_SLOT);
  };

  /* ================= UPDATE SLOT ================= */
  const handleUpdateSlot = async (day, index) => {
    const updated = structuredClone(timetable.week);
    updated[day][index] = slotForm;

    await persist(updated);

    setEditing(null);
    setSlotForm(EMPTY_SLOT);
  };

  /* ================= DELETE SLOT ================= */
  const handleDeleteSlot = async (day, index) => {
    if (!window.confirm("Delete this slot?")) return;

    const updated = structuredClone(timetable.week);
    updated[day].splice(index, 1);

    await persist(updated);
  };

  if (loading) return <p className="text-gray-500">Loading timetable…</p>;

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <h2 className="text-lg font-semibold">
          Weekly Timetable
        </h2>

        {Object.entries(timetable.week).map(([day, slots]) => (
          <div key={day} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium capitalize">{day}</h3>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setAddingDay(day);
                  setEditing(null);
                  setSlotForm(EMPTY_SLOT);
                }}
              >
                + Add Slot
              </Button>
            </div>

            {/* ADD SLOT */}
            {addingDay === day && (
              <div className="border rounded-md p-3 space-y-2">
                <Input
                  placeholder="From (9:00 AM)"
                  value={slotForm.from}
                  onChange={(e) =>
                    setSlotForm({ ...slotForm, from: e.target.value })
                  }
                />
                <Input
                  placeholder="To (9:45 AM)"
                  value={slotForm.to}
                  onChange={(e) =>
                    setSlotForm({ ...slotForm, to: e.target.value })
                  }
                />

                <select
                  className="w-full border rounded-md p-2 text-sm"
                  value={`${slotForm.classId}_${slotForm.subjectId}`}
                  onChange={(e) => {
                    const selected = assignments.find(
                      (a) =>
                        `${a.classId}_${a.subjectId}` === e.target.value
                    );
                    if (!selected) return;

                    setSlotForm({
                      ...slotForm,
                      ...selected,
                    });
                  }}
                >
                  <option value="">
                    Select Class & Subject
                  </option>
                  {assignments.map((a) => (
                    <option
                      key={`${a.classId}_${a.subjectId}`}
                      value={`${a.classId}_${a.subjectId}`}
                    >
                      {a.classLabel} • {a.subjectName}
                    </option>
                  ))}
                </select>

                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleAddSlot(day)}>
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setAddingDay(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* SLOTS */}
            {slots.map((s, idx) => (
  <div key={idx} className="space-y-2">
    
    {/* EDIT SLOT */}
    {editing?.day === day && editing?.index === idx ? (
      <div className="border rounded-md p-3 space-y-2">
        <Input
          placeholder="From (9:00 AM)"
          value={slotForm.from}
          onChange={(e) =>
            setSlotForm({ ...slotForm, from: e.target.value })
          }
        />
        <Input
          placeholder="To (9:45 AM)"
          value={slotForm.to}
          onChange={(e) =>
            setSlotForm({ ...slotForm, to: e.target.value })
          }
        />

        <select
          className="w-full border rounded-md p-2 text-sm"
          value={`${slotForm.classId}_${slotForm.subjectId}`}
          onChange={(e) => {
            const selected = assignments.find(
              (a) =>
                `${a.classId}_${a.subjectId}` === e.target.value
            );
            if (!selected) return;

            setSlotForm({
              ...slotForm,
              ...selected,
            });
          }}
        >
          <option value="">Select Class & Subject</option>
          {assignments.map((a) => (
            <option
              key={`${a.classId}_${a.subjectId}`}
              value={`${a.classId}_${a.subjectId}`}
            >
              {a.classLabel} • {a.subjectName}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => handleUpdateSlot(day, idx)}
          >
            Update
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setEditing(null);
              setSlotForm(EMPTY_SLOT);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    ) : (
      /* NORMAL VIEW */
      <div className="border rounded-md p-3 flex justify-between">
        <div>
          <p className="font-medium">
            {s.from} – {s.to}
          </p>
          <p className="text-sm text-gray-500">
            {s.classLabel} • {s.subjectName}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setEditing({ day, index: idx });
              setAddingDay(null);
              setSlotForm(s);
            }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDeleteSlot(day, idx)}
          >
            Delete
          </Button>
        </div>
      </div>
    )}
  </div>
))}

          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TeacherTimetableTab;
