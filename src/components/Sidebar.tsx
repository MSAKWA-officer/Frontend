// src/components/Sidebar.tsx
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  School,
  Building2,
  BookOpen,
  Book,
  Users,
  ClipboardList,
  Menu,
  X,
} from "lucide-react";
import { UserContext } from "../contexts/UserContext";

// Sidebar items array
const sidebarItems = [
  { name: "Dashboard", path: "/dashboards", icon: LayoutDashboard },
  { name: "Colleges", path: "/colleges", icon: School },
  { name: "Departments", path: "/departments", icon: Building2 },
  { name: "Programmes", path: "/programmes", icon: BookOpen },
  { name: "Courses", path: "/courses", icon: Book },
  { name: "Staff", path: "/staffs", icon: Users },
  { name: "Tasks", path: "/tasks", icon: ClipboardList },
  { name: "Profile", path: "/profile", icon: Users },
];

const Sidebar: React.FC = () => {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false); // For mobile toggle

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white scale-105 shadow-lg"
        : "text-gray-200 hover:bg-blue-700 hover:text-white hover:scale-105"
    }`;

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-blue-400 to-blue-500 text-gray-200 shadow-lg flex flex-col transition-transform duration-300 ease-in-out z-40
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-48 w-64`}
      >
        {/* User Profile Section */}
        <div className="flex flex-row items-end justify-center h-48 border-b border-blue-500 p-1">
          {user?.profileImage ? (
            <img
              src={`http://localhost:8080${user.profileImage}`}
              alt="Profile"
              className="w-15 h-15 rounded-full mb-3 object-cover "
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-500 mb-3"></div>
          )}
          <p className="text-white font-semibold text-center truncate max-w-full">
            {user?.username || "User"}
          </p>
          <p className="text-gray-200 text-xs text-center">{user?.role || ""}</p>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col gap-2 mt-4 px-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.path} to={item.path} className={linkClass} onClick={() => setOpen(false)}>
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto px-4 py-4 border-t border-blue-600 text-gray-200 text-sm text-center">
          © 2025 MyApp
        </div>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
