import Home from "../pages/Home/Home";
import Login from "../pages/auth/LoginPage";
import Dashboard from "../pages/dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "@/Components/Layout/AdminLayout";
import Notices from "@/Pages/notices/Notices";
import Teachers from "@/Pages/teachers/Teachers";
import Students from "@/Pages/students/Students";
import Attendance from "@/Pages/attendance/Attendance";
import Academics from "@/Pages/academics/Academics";
import Books from "@/Pages/books/Books";
import Settings from "@/Pages/settings/Settings";
import TeacherProfile from "@/Pages/teachers/TeacherProfile";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Admin */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/students" element={<Students />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/books" element={<Books />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/teachers/:teacherId" element={<TeacherProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
