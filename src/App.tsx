// src/App.tsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// ✅ Lazy-loaded pages for dynamic imports
const DashboardPage = lazy(() => import("./pages/dashboards/DashboardPage"));
const CollegeListPage = lazy(() => import("./pages/colleges/CollegeListPage"));
const CreateCollegePage = lazy(() => import("./pages/colleges/CreateCollegePage"));
const EditCollegePage = lazy(() => import("./pages/colleges/EditCollegePage"));
const DepartmentListPage = lazy(() => import("./pages/departments/DepartmentListPage"));
const CreateDepartmentPage = lazy(() => import("./pages/departments/CreateDepartmentPage"));
const EditDepartmentPage = lazy(() => import("./pages/departments/EditDepartmentPage"));
const ProgrammeListPage = lazy(() => import("./pages/programmes/ProgrammeLIstPage"));
const CreateProgrammePage = lazy(() => import("./pages/programmes/CreateProgrammPage"));
const EditProgrammePage = lazy(() => import("./pages/programmes/EditProgrammePage"));
const CourseListPage = lazy(() => import("./pages/courses/CourseListPage"));
const CreateCoursePage = lazy(() => import("./pages/courses/CreateCoursePage"));
const EditCoursePage = lazy(() => import("./pages/courses/EditCoursePage"));
const StaffListPage = lazy(() => import("./pages/staffs/StaffListPage"));
const CreateStaffPage = lazy(() => import("./pages/staffs/CreateStaffPage"));
const EditStaffPage = lazy(() => import("./pages/staffs/EditStaffPage"));
const TaskListPage = lazy(() => import("./pages/tasks/TaskListPage"));
const CreateTaskPage = lazy(() => import("./pages/tasks/CreateTaskPage"));
const EditTaskPage = lazy(() => import("./pages/tasks/EditTaskPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const LoginPage = lazy(() => import("./pages/logins/LoginPage"));
const RegisterPage = lazy(() => import("./pages/registers/RegisterPage"));
const SearchResultsPage = lazy(() => import("./pages/search/SearchResultsPage"));

function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
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
          className={`flex-1 ${!isAuthPage ? "ml-48" : ""} bg-sky-500 p-6 overflow-y-auto`}
        >
          {/* Wrap routes with Suspense for lazy loading */}
          <Suspense fallback={<div>Loading...</div>}>
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

              {/* User Profile Route */}
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default App;
