import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CLIENT } from "../utils/constants/apiClient";
import type { Department } from "../utils/responses/department";
import type { Staff } from "../staffs/StaffListPage"; // Make sure Staff is exported as default or named export
import type { Programme } from "../programmes/ProgrammeLIstPage"; // Fixed typo: ProgrammeListPage
import type { Course } from "../courses/CourseListPage"; // Make sure Course type exists and is exported

export default function CreateTaskPage() {
  const navigate = useNavigate();

  // Task fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [courseId, setCourseId] = useState<number | "">("");
  const [departmentId, setDepartmentId] = useState<number | "">("");
  const [staffId, setStaffId] = useState<number | "">("");
  const [programmeId, setProgrammeId] = useState<number | "">("");
  const [completed, setCompleted] = useState(false);

  // Dropdown data
  const [departments, setDepartments] = useState<Department[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [programmes, setProgrammes] = useState<Programme[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch dropdown data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [depRes, staffRes, courseRes, progRes] = await Promise.all([
          CLIENT.get<Department[]>("/departments"),
          CLIENT.get<Staff[]>("/staffs"),
          CLIENT.get<Course[]>("/courses"),
          CLIENT.get<Programme[]>("/programmes"),
        ]);

        setDepartments(depRes.data);
        setStaff(staffRes.data);
        setCourses(courseRes.data);
        setProgrammes(progRes.data);
      } catch (err) {
        console.error("Error fetching dropdown data", err);
      }
    };
    fetchData();
  }, []);

  const saveTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!departmentId || !courseId || !staffId || !programmeId) {
      alert("Please select all required fields.");
      return;
    }
    setIsSubmitting(true);

    try {
      await CLIENT.post("/tasks", {
        title,
        description,
        dueDate,
        courseId,
        departmentId,
        staffId,
        programmeId,
        completed,
      });
      navigate("/tasks");
    } catch (error) {
      console.error("Error saving task", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-start bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h1 className="text-3xl font-bold">Create Task</h1>
          <Link
            to="/tasks"
            className="px-3 py-2 text-lg rounded-lg shadow border-2 border-blue-700 hover:bg-blue-100 text-blue-950"
          >
            Go Back
          </Link>
        </div>

        <form onSubmit={saveTask} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium">Title</label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task Title"
              required
              type="text"
              className="w-full rounded-md border px-3 py-2 text-slate-900 focus:outline-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
              required
              className="w-full rounded-md border px-3 py-2 text-slate-900 focus:outline-indigo-500"
            />
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium">Due Date</label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2 text-slate-900 focus:outline-indigo-500"
            />
          </div>

          {/* Dropdowns */}
          <div className="grid grid-cols-2 gap-4">
            {/* Department */}
            <div>
              <label htmlFor="departmentId" className="block text-sm font-medium">Department</label>
              <select
                id="departmentId"
                value={departmentId}
                onChange={(e) => setDepartmentId(Number(e.target.value))}
                required
                className="w-full rounded-md border px-3 py-2 text-slate-900 focus:outline-indigo-500"
              >
                <option value="">-- Select Department --</option>
                {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>

            {/* Staff */}
            <div>
              <label htmlFor="staffId" className="block text-sm font-medium">Staff</label>
              <select
                id="staffId"
                value={staffId}
                onChange={(e) => setStaffId(Number(e.target.value))}
                required
                className="w-full rounded-md border px-3 py-2 text-slate-900 focus:outline-indigo-500"
              >
                <option value="">-- Select Staff --</option>
                {staff.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>

            {/* Course */}
            <div>
              <label htmlFor="courseId" className="block text-sm font-medium">Course</label>
              <select
                id="courseId"
                value={courseId}
                onChange={(e) => setCourseId(Number(e.target.value))}
                required
                className="w-full rounded-md border px-3 py-2 text-slate-900 focus:outline-indigo-500"
              >
                <option value="">-- Select Course --</option>
                {courses.map(c => <option key={c.id} value={c.id}>{c.title || c.name}</option>)}
              </select>
            </div>

            {/* Programme */}
            <div>
              <label htmlFor="programmeId" className="block text-sm font-medium">Programme</label>
              <select
                id="programmeId"
                value={programmeId}
                onChange={(e) => setProgrammeId(Number(e.target.value))}
                required
                className="w-full rounded-md border px-3 py-2 text-slate-900 focus:outline-indigo-500"
              >
                <option value="">-- Select Programme --</option>
                {programmes.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
          </div>

          {/* Completed */}
          <div className="flex items-center gap-2">
            <input
              id="completed"
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:outline-indigo-500"
            />
            <label htmlFor="completed" className="text-sm font-medium">Completed</label>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
