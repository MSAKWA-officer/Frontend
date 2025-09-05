// src/pages/dashboards/DashboardPage.tsx
import React, { useEffect, useState } from "react";
import {
  Building2,
  School,
  BookOpen,
  Book,
  Users,
  ClipboardList,
  ChartPie,
  CalendarCheck,
} from "lucide-react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

// Define Types
interface Stats {
  colleges: number;
  departments: number;
  programmes: number;
  courses: number;
  staff: number;
  tasks: number;
}

interface CompletionData {
  name: string;
  value: number;
}

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    colleges: 0,
    departments: 0,
    programmes: 0,
    courses: 0,
    staff: 0,
    tasks: 0,
  });

  const [completionData, setCompletionData] = useState<CompletionData[]>([
    { name: "Completed", value: 0 },
    { name: "Pending", value: 0 },
  ]);

  const COLORS = ["#4ade80", "#fbbf24"];

  // Fetch stats from backend
  const fetchStats = async () => {
    try {
      const res = await axios.get<Stats>("http://localhost:8080/api/dashboard/stats");
      setStats(res.data);

      const completionRes = await axios.get<CompletionData[]>(
        "http://localhost:8080/api/tasks/completion"
      );
      setCompletionData(completionRes.data);
    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err);
    }
  };

  // Fetch on mount + optional polling
  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000); // update every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <School size={32} className="text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold">Colleges</h2>
            <p className="text-gray-600">Manage and view colleges</p>
            <span className="text-2xl font-bold text-gray-800">{stats.colleges}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <Building2 size={32} className="text-green-600" />
          <div>
            <h2 className="text-xl font-semibold">Departments</h2>
            <p className="text-gray-600">Academic departments</p>
            <span className="text-2xl font-bold text-gray-800">{stats.departments}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <BookOpen size={32} className="text-purple-600" />
          <div>
            <h2 className="text-xl font-semibold">Programmes</h2>
            <p className="text-gray-600">Track and manage programmes</p>
            <span className="text-2xl font-bold text-gray-800">{stats.programmes}</span>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <Book size={32} className="text-yellow-600" />
          <div>
            <h2 className="text-xl font-semibold">Courses</h2>
            <p className="text-gray-600">Organize and update courses</p>
            <span className="text-2xl font-bold text-gray-800">{stats.courses}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <Users size={32} className="text-red-600" />
          <div>
            <h2 className="text-xl font-semibold">Staff</h2>
            <p className="text-gray-600">Manage staff records</p>
            <span className="text-2xl font-bold text-gray-800">{stats.staff}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <ClipboardList size={32} className="text-indigo-600" />
          <div>
            <h2 className="text-xl font-semibold">Tasks</h2>
            <p className="text-gray-600">Assign and monitor tasks</p>
            <span className="text-2xl font-bold text-gray-800">{stats.tasks}</span>
          </div>
        </div>
      </div>

      {/* Third Row: Task Completion Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <ChartPie size={24} className="text-purple-600" />
            <h2 className="text-xl font-semibold">Task Completion</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={completionData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {completionData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-center text-gray-400">
          <CalendarCheck size={24} className="text-green-600" />
          <span className="ml-2 text-xl font-semibold">Upcoming Events Placeholder</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
