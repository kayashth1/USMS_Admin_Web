import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {["Students", "Teachers", "Attendance"].map((item) => (
        <Card key={item}>
          <CardContent className="p-6">
            <h3 className="font-semibold">{item}</h3>
            <p className="text-gray-500 mt-2">Dummy data</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;
