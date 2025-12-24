import { useParams, useNavigate } from "react-router-dom";
import { teachers } from "@/data/teachers";
import { teacherClassAssignments } from "@/data/teacherClassAssignments";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

const TeacherProfile = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();

  const teacher = teachers.find(t => t.id === teacherId);
const assignedClasses = teacherClassAssignments.filter(
  (a) => a.teacherId === teacher.id
);

  if (!teacher) {
    return <p>Teacher not found</p>;
  }

  return (
    <div className="space-y-6">

      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-2"
          >
            ← Back
          </Button>

          <h1 className="text-2xl font-semibold">
            {teacher.fullName}
          </h1>
          <p className="text-gray-500">
            {teacher.subject}
          </p>
        </div>

        <Badge className="bg-green-100 text-green-700">
          Active
        </Badge>
      </div>

      {/* ===== Profile Summary ===== */}
      <Card>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <p className="text-sm text-gray-500">Employee ID</p>
            <p className="font-medium">{teacher.employeeId}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Joining Date</p>
            <p className="font-medium">{teacher.joiningDate}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{teacher.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{teacher.phone}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">School</p>
            <p className="font-medium">{teacher.schoolName}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{teacher.address}</p>
          </div>

        </CardContent>
      </Card>

      {/* ===== Tabs ===== */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="classes">Assigned Classes</TabsTrigger>
          <TabsTrigger value="notices">Notices</TabsTrigger>
          <TabsTrigger value="materials">Study Materials</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardContent className="p-6 text-gray-600">
              This section will show performance, attendance summary,
              and teaching analytics in future.
            </CardContent>
          </Card>
        </TabsContent>

<TabsContent value="classes">
  <Card>
    <CardContent className="p-6 space-y-3">

      {assignedClasses.length === 0 ? (
        <p className="text-gray-500">
          No classes assigned yet.
        </p>
      ) : (
        assignedClasses.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border rounded-md p-3"
          >
            <div>
              <p className="font-medium">
                Class {item.class}
              </p>
              <p className="text-sm text-gray-500">
                Subject: {item.subject}
              </p>
            </div>

            <Badge variant="secondary">
              Active
            </Badge>
          </div>
        ))
      )}

    </CardContent>
  </Card>
</TabsContent>


        <TabsContent value="notices">
          <Card>
            <CardContent className="p-6">
              Notices sent by this teacher will appear here.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials">
          <Card>
            <CardContent className="p-6">
              Uploaded study material will appear here.
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

    </div>
  );
};

export default TeacherProfile;
