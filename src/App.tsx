// src/App.tsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import DashboardPage from "./pages/dashboards/DashboardPage";
import CollegeListPage from "./pages/colleges/CollegeListPage";
import CreateCollegePage from "./pages/colleges/CreateCollegePage";
import EditCollegePage from "./pages/colleges/EditCollegePage";
import DepartmentListPage from "./pages/departments/DepartmentListPage";
import CreateDepartmentPage from "./pages/departments/CreateDepartmentPage";
import EditDepartmentPage from "./pages/departments/EditDepartmentPage";
import ProgrammeListPage from "./pages/programmes/ProgrammeLIstPage";
import CreateProgrammePage from "./pages/programmes/CreateProgrammPage";
import EditProgrammePage from "./pages/programmes/EditProgrammePage";
import CourseListPage from "./pages/courses/CourseListPage";
import CreateCoursePage from "./pages/courses/CreateCoursePage";
import EditCoursePage from "./pages/courses/EditCoursePage";
import StaffListPage from "./pages/staffs/StaffListPage";
import CreateStaffPage from "./pages/staffs/CreateStaffPage";
import EditStaffPage from "./pages/staffs/EditStaffPage";
import TaskListPage from "./pages/tasks/TaskListPage";
import CreateTaskPage from "./pages/tasks/CreateTaskPage";
import EditTaskPage from "./pages/tasks/EditTaskPage";
import ProfilePage from "./pages/ProfilePage";   // ✅ renamed import
import LoginPage from "./pages/logs/LoginPage";
import RegisterPage from "./pages/logs/RegisterPage";
import SearchResultsPage from "./pages/search/SearchResultsPage";

// ✅ Import the SearchProvider


function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    // ✅ Wrap the entire app with SearchProvider
 
      <div className="h-screen flex flex-col">
        {/* Show Navbar only if NOT on login/register */}
        {!isAuthPage && (
          <div className="flex">
            <Navbar />
          </div>
        )}

        <div className="flex flex-1 pt-16">
          {/* Show Sidebar only if NOT on login/register */}
          {!isAuthPage && (
            <aside className="w-48 fixed top-16 left-0 bottom-0 bg-gray-900 text-gray-300 shadow-lg flex flex-col">
              <Sidebar />
            </aside>
          )}

          {/* Main content */}
          <main
            className={`flex-1 ${
              !isAuthPage ? "ml-48" : ""
            } bg-sky-500  p-6 overflow-y-auto`}
          >
            <Routes>
              {/* Default route redirects to login */}
              <Route path="/" element={<Navigate to="/login" />} />

              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected routes */}
              <Route path="/dashboards" element={<DashboardPage />} />
              <Route path="/colleges" element={<CollegeListPage />} />
              <Route path="/create-college" element={<CreateCollegePage />} />
              <Route path="/edit-college/:id" element={<EditCollegePage />} />
              <Route path="/departments" element={<DepartmentListPage />} />
              <Route path="/create-department" element={<CreateDepartmentPage />} />
              <Route path="/edit-department/:id" element={<EditDepartmentPage />} />
              <Route path="/programmes" element={<ProgrammeListPage />} />
              <Route path="/create-programme" element={<CreateProgrammePage />} />
              <Route path="/edit-programme/:id" element={<EditProgrammePage />} />
              <Route path="/courses" element={<CourseListPage />} />
              <Route path="/create-course" element={<CreateCoursePage />} />
              <Route path="/edit-course/:id" element={<EditCoursePage />} />
              <Route path="/staffs" element={<StaffListPage />} />
              <Route path="/create-staff" element={<CreateStaffPage />} />
              <Route path="/edit-staff/:id" element={<EditStaffPage />} />
              <Route path="/tasks" element={<TaskListPage />} />
              <Route path="/create-task" element={<CreateTaskPage />} />
              <Route path="/edit-task/:id" element={<EditTaskPage />} />
              <Route path="/search" element={<SearchResultsPage />} />

              {/* ✅ User Profile Route */}
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
        </div>
      </div>
 
  );
}

export default App;
