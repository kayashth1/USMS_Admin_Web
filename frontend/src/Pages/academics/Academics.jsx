import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import UpgradeClassDialog from "@/components/academics/UpgradeClassDialog";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const classStats = [
  {
    id: "class-9",
    title: "Class 9",
    total: 287,
    eligible: 275,
    review: 12,
  },
  {
    id: "class-10",
    title: "Class 10",
    total: 287,
    eligible: 275,
    review: 12,
  },
  {
    id: "class-11",
    title: "Class 11",
    total: 287,
    eligible: 275,
    review: 12,
  },
];

const Academics = () => {
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* ===== Page Header ===== */}
      <div>
        <h1 className="text-2xl font-semibold">Academic Management</h1>
        <p className="text-gray-500">
          Manage student promotions, results, and grades
        </p>
      </div>

      {/* ===== Tabs ===== */}
      <Tabs defaultValue="upgrade">
        <TabsList>
          <TabsTrigger value="upgrade">Upgrade Students</TabsTrigger>
          <TabsTrigger value="results">Results Management</TabsTrigger>
          <TabsTrigger value="grades">Grade Configuration</TabsTrigger>
        </TabsList>

        {/* ================= UPGRADE STUDENTS ================= */}
        <TabsContent value="upgrade" className="space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Student Class Promotion</h2>
              <p className="text-sm text-gray-500">
                Promote students to next academic year
              </p>
            </div>

            <Button className="gap-2" onClick={() => setUpgradeOpen(true)}>
              ⬆️ Upgrade Class
            </Button>
          </div>

          {/* Class Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {classStats.map((cls) => (
              <Card key={cls.id}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{cls.title}</h3>
                    <span className="text-indigo-600">⬆️</span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Students</span>
                      <span className="font-medium">{cls.total}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Eligible for Promotion
                      </span>
                      <span className="font-medium text-green-600">
                        {cls.eligible}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Need Review</span>
                      <span className="font-medium text-red-500">
                        {cls.review}
                      </span>
                    </div>
                  </div>

                  <Button variant="secondary" className="w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ================= PLACEHOLDERS ================= */}
        <TabsContent value="results">
          <Card>
            <CardContent className="p-6 text-gray-500">
              Results Management will be implemented later.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grades" className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-lg font-semibold">Grade Configuration</h2>
            <p className="text-sm text-gray-500">
              Configure grading system and score ranges
            </p>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Grade</th>
                  <th className="text-left px-4 py-3 font-medium">Min Score</th>
                  <th className="text-left px-4 py-3 font-medium">Max Score</th>
                  <th className="text-left px-4 py-3 font-medium">Color</th>
                  <th className="text-left px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {/* A+ */}
                <tr>
                  <td className="px-4 py-3 font-medium">A+</td>
                  <td className="px-4 py-3">
                    <Input className="w-20" defaultValue="90" />
                  </td>
                  <td className="px-4 py-3">
                    <Input className="w-20" defaultValue="100" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-6 h-6 rounded bg-green-500" />
                  </td>
                  <td className="px-4 py-3 text-indigo-600 cursor-pointer">
                    ✏️
                  </td>
                </tr>

                {/* A */}
                <tr>
                  <td className="px-4 py-3 font-medium">A</td>
                  <td className="px-4 py-3">
                    <Input className="w-20" defaultValue="80" />
                  </td>
                  <td className="px-4 py-3">
                    <Input className="w-20" defaultValue="89" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-6 h-6 rounded bg-blue-500" />
                  </td>
                  <td className="px-4 py-3 text-indigo-600 cursor-pointer">
                    ✏️
                  </td>
                </tr>

                {/* B+ */}
                <tr>
                  <td className="px-4 py-3 font-medium">B+</td>
                  <td className="px-4 py-3">
                    <Input className="w-20" defaultValue="70" />
                  </td>
                  <td className="px-4 py-3">
                    <Input className="w-20" defaultValue="79" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-6 h-6 rounded bg-yellow-400" />
                  </td>
                  <td className="px-4 py-3 text-indigo-600 cursor-pointer">
                    ✏️
                  </td>
                </tr>

                {/* B */}
                <tr>
                  <td className="px-4 py-3 font-medium">B</td>
                  <td className="px-4 py-3">
                    <Input className="w-20" defaultValue="60" />
                  </td>
                  <td className="px-4 py-3">
                    <Input className="w-20" defaultValue="69" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-6 h-6 rounded bg-orange-500" />
                  </td>
                  <td className="px-4 py-3 text-indigo-600 cursor-pointer">
                    ✏️
                  </td>
                </tr>

                {/* C */}
                <tr>
                  <td className="px-4 py-3 font-medium">C</td>
                  <td className="px-4 py-3">
                    <Input className="w-20" defaultValue="50" />
                  </td>
                  <td className="px-4 py-3">
                    <Input className="w-20" defaultValue="59" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-6 h-6 rounded bg-red-400" />
                  </td>
                  <td className="px-4 py-3 text-indigo-600 cursor-pointer">
                    ✏️
                  </td>
                </tr>

                {/* F */}
                <tr>
                  <td className="px-4 py-3 font-medium">F</td>
                  <td className="px-4 py-3">
                    <Input className="w-20" defaultValue="0" />
                  </td>
                  <td className="px-4 py-3">
                    <Input className="w-20" defaultValue="49" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-6 h-6 rounded bg-red-600" />
                  </td>
                  <td className="px-4 py-3 text-indigo-600 cursor-pointer">
                    ✏️
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Save Button */}
          <div className="flex justify-start">
            <Button>Save Configuration</Button>
          </div>
        </TabsContent>
      </Tabs>

      <UpgradeClassDialog open={upgradeOpen} onOpenChange={setUpgradeOpen} />
    </div>
  );
};

export default Academics;
