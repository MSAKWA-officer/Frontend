import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { CLIENT } from "../utils/constants/apiClient";
import { TASKS_API, COURSES_API, DEPARTMENTS_API, STAFF_API, PROGRAMMES_API } from "../utils/constants/appConstants";

// Types
export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  courseId: number;
  departmentId: number;
  staffId: number;
  programmeId: number;
  completed: boolean;
};

export type Course = { id: number; name: string };
export type Department = { id: number; name: string };
export type Staff = { id: number; name: string };
export type Programme = { id: number; name: string };

export default function TaskListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  // Fetch tasks and reference data
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [{ data: tasksData }, { data: coursesData }, { data: departmentsData }, { data: staffsData }, { data: programmesData }] =
        await Promise.all([
          CLIENT.get<Task[]>(TASKS_API),
          CLIENT.get<Course[]>(COURSES_API),
          CLIENT.get<Department[]>(DEPARTMENTS_API),
          CLIENT.get<Staff[]>(STAFF_API),
          CLIENT.get<Programme[]>(PROGRAMMES_API),
        ]);

      setTasks(tasksData);
      setCourses(coursesData);
      setDepartments(departmentsData);
      setStaffs(staffsData);
      setProgrammes(programmesData);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (e: React.MouseEvent<SVGSVGElement>, task: Task) => {
    e.preventDefault();
    if (!confirm(`Are you sure you want to delete the task: "${task.title}"?`)) return;

    try {
      await CLIENT.delete(`${TASKS_API}/${task.id}`);
      alert("Task deleted successfully");
      fetchAllData();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  // Helper functions to map IDs to names
  const getCourseName = (id: number) => courses.find(c => c.id === id)?.name || "N/A";
  const getDepartmentName = (id: number) => departments.find(d => d.id === id)?.name || "N/A";
  const getStaffName = (id: number) => staffs.find(s => s.id === id)?.name || "N/A";
  const getProgrammeName = (id: number) => programmes.find(p => p.id === id)?.name || "N/A";

  return (
    <div className="w-full h-screen p-4 bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg w-full h-full flex flex-col">
        <div className="flex border-b px-6 py-4 justify-between items-center">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <Link
            to="/create-task"
            className="px-4 py-2 text-sm rounded-lg shadow-md bg-blue-600 hover:bg-blue-500 text-white"
          >
            New Task
          </Link>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {loading ? (
            <div className="text-center py-10 text-lg font-semibold">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-10 text-gray-500">No tasks found.</div>
          ) : (
            <table className="border-collapse border border-slate-300 w-full text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-slate-300 uppercase p-2">S/N</th>
                  <th className="border border-slate-300 uppercase p-2">Title</th>
                  <th className="border border-slate-300 uppercase p-2">Description</th>
                  <th className="border border-slate-300 uppercase p-2">Due Date</th>
                  <th className="border border-slate-300 uppercase p-2">Course</th>
                  <th className="border border-slate-300 uppercase p-2">Department</th>
                  <th className="border border-slate-300 uppercase p-2">Staff</th>
                  <th className="border border-slate-300 uppercase p-2">Programme</th>
                  <th className="border border-slate-300 uppercase p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="border border-slate-300 p-2 text-center">{index + 1}</td>
                    <td className="border border-slate-300 p-2">{task.title}</td>
                    <td className="border border-slate-300 p-2">{task.description}</td>
                    <td className="border border-slate-300 p-2">{task.dueDate}</td>
                    <td className="border border-slate-300 p-2">{getCourseName(task.courseId)}</td>
                    <td className="border border-slate-300 p-2">{getDepartmentName(task.departmentId)}</td>
                    <td className="border border-slate-300 p-2">{getStaffName(task.staffId)}</td>
                    <td className="border border-slate-300 p-2">{getProgrammeName(task.programmeId)}</td>
                    <td className="border border-slate-300 p-2">
                      <div className="flex items-center justify-center space-x-2">
                        <Link to={`/edit-task/${task.id}`}>
                          <PencilSquareIcon title="Edit Task" className="h-5 w-5 text-green-500 cursor-pointer" />
                        </Link>
                        <TrashIcon
                          title="Delete Task"
                          onClick={(e) => deleteTask(e, task)}
                          className="h-5 w-5 text-red-500 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
