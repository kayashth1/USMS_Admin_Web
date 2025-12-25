import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { School } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">

      {/* ===== Page Header ===== */}
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-gray-500">
          Manage school settings and configurations
        </p>
      </div>

      {/* ===== Tabs ===== */}
      <Tabs defaultValue="school">
        <TabsList>
          <TabsTrigger value="school">School Profile</TabsTrigger>
          <TabsTrigger value="academic">Academic Year</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="backup">Backup & Export</TabsTrigger>
        </TabsList>

        {/* ================= SCHOOL PROFILE TAB ================= */}
        <TabsContent value="school">
          <Card>
            <CardContent className="p-6 space-y-6">

              {/* Section Header */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <School size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">
                    School Information
                  </h2>
                  <p className="text-sm text-gray-500">
                    Update your school's basic information
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    School Name
                  </label>
                  <Input defaultValue="Universal School Management System" />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    School Code
                  </label>
                  <Input defaultValue="USMS001" />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    Email
                  </label>
                  <Input defaultValue="admin@usms.edu" />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    Phone Number
                  </label>
                  <Input defaultValue="+1 234-567-8900" />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium">
                    Address
                  </label>
                  <Textarea
                    rows={3}
                    defaultValue="123 Education Lane, Springfield, IL 62701"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    Principal Name
                  </label>
                  <Input defaultValue="Dr. Robert Anderson" />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    Established Year
                  </label>
                  <Input defaultValue="1985" />
                </div>

              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button className="gap-2">
                  💾 Save Changes
                </Button>
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= PLACEHOLDER TABS ================= */}
<TabsContent value="academic">
  <Card>
    <CardContent className="p-6 space-y-6">

      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
          📅
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            Academic Year Configuration
          </h2>
          <p className="text-sm text-gray-500">
            Set up academic year and term dates
          </p>
        </div>
      </div>

      {/* Academic Year & Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="space-y-1">
          <label className="text-sm font-medium">
            Current Academic Year
          </label>
          <Select defaultValue="2024-2025">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023-2024">2023–2024</SelectItem>
              <SelectItem value="2024-2025">2024–2025</SelectItem>
              <SelectItem value="2025-2026">2025–2026</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">
            Number of Terms
          </label>
          <Select defaultValue="2">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Term</SelectItem>
              <SelectItem value="2">2 Terms</SelectItem>
              <SelectItem value="3">3 Terms</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>

      {/* Term Dates */}
      <div className="space-y-4">

        {/* Term 1 */}
        <div className="bg-gray-50 border rounded-lg p-4 space-y-4">
          <h3 className="font-medium">Term 1</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Start Date</label>
              <Input defaultValue="01-04-2024" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Start Date</label>
              <Input defaultValue="01-04-2024" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">End Date</label>
              <Input defaultValue="30-09-2024" />
            </div>
          </div>
        </div>

        {/* Term 2 */}
        <div className="bg-gray-50 border rounded-lg p-4 space-y-4">
          <h3 className="font-medium">Term 2</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Start Date</label>
              <Input defaultValue="01-10-2024" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Start Date</label>
              <Input defaultValue="01-10-2024" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">End Date</label>
              <Input defaultValue="31-03-2025" />
            </div>
          </div>
        </div>

      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="gap-2">
          💾 Save Configuration
        </Button>
      </div>

    </CardContent>
  </Card>
</TabsContent>


        <TabsContent value="roles">
          <Card>
            <CardContent className="p-6 text-gray-500">
              Roles & Permissions management will be implemented later.
            </CardContent>
          </Card>
        </TabsContent>

<TabsContent value="backup">
  <Card>
    <CardContent className="p-6 space-y-8">

      {/* ===== Header ===== */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
          🗄️
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            Data Backup & Export
          </h2>
          <p className="text-sm text-gray-500">
            Manage data backups and exports
          </p>
        </div>
      </div>

      {/* ===== Automated Backups ===== */}
      <div className="space-y-4">
        <h3 className="font-medium">Automated Backups</h3>

        <div className="bg-gray-50 border rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="font-medium">Enable Daily Backups</p>
            <p className="text-sm text-gray-500">
              Automatic backup at 2:00 AM daily
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="bg-gray-50 border rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="font-medium">Enable Weekly Backups</p>
            <p className="text-sm text-gray-500">
              Full backup every Sunday
            </p>
          </div>
          <Switch />
        </div>
      </div>

      {/* ===== Export Data ===== */}
      <div className="space-y-4">
        <h3 className="font-medium">Export Data</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Card className="bg-gray-50">
            <CardContent className="p-4 space-y-1">
              <p className="font-medium">Export Student Data</p>
              <p className="text-sm text-gray-500">
                Download all student records as CSV
              </p>
              <Button variant="outline" disabled className="mt-2">
                Export CSV
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-50">
            <CardContent className="p-4 space-y-1">
              <p className="font-medium">Export Teacher Data</p>
              <p className="text-sm text-gray-500">
                Download all teacher records as CSV
              </p>
              <Button variant="outline" disabled className="mt-2">
                Export CSV
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-50">
            <CardContent className="p-4 space-y-1">
              <p className="font-medium">Export Attendance</p>
              <p className="text-sm text-gray-500">
                Download attendance reports as Excel
              </p>
              <Button variant="outline" disabled className="mt-2">
                Export Excel
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-50">
            <CardContent className="p-4 space-y-1">
              <p className="font-medium">Export Results</p>
              <p className="text-sm text-gray-500">
                Download academic results as PDF
              </p>
              <Button variant="outline" disabled className="mt-2">
                Export PDF
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* ===== Manual Backup ===== */}
      <div className="flex justify-start pt-4">
        <Button className="gap-2">
          🗃️ Create Manual Backup Now
        </Button>
      </div>

      <p className="text-xs text-gray-500">
        * Backup and export features will be enabled after backend integration.
      </p>

    </CardContent>
  </Card>
</TabsContent>


      </Tabs>

    </div>
  );
};

export default Settings;
