import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CLIENT } from "../utils/constants/apiClient";
import { COURSES_API, PROGRAMMES_API } from "../utils/constants/appConstants";
import type { Course } from "./CourseListPage";
import type { Programme } from "../programmes/ProgrammeLIstPage";

export default function EditCoursePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [programmeId, setProgrammeId] = useState<number | "">("");
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch course details for editing
  useEffect(() => {
    if (id) {
      CLIENT.get<Course>(`${COURSES_API}/${id}`)
        .then(({ data }) => {
          setName(data.name);
          setCode(data.code);
          setDescription(data.description ?? ""); // fallback to empty string
          setProgrammeId(data.programmeId ?? ""); // fallback to empty string
        })
        .catch((err: any) => console.error("Error fetching course", err));
    }
  }, [id]);

  // Fetch programmes for dropdown
  useEffect(() => {
    CLIENT.get<Programme[]>(PROGRAMMES_API)
      .then(({ data }) => setProgrammes(data))
      .catch((err) => console.error("Error fetching programmes", err));
  }, []);

  const updateCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!programmeId) {
      alert("Please select a programme");
      return;
    }

    setIsSubmitting(true);

    try {
      await CLIENT.put<Course>(`${COURSES_API}/${id}`, {
        name,
        code,
        description,
        programmeId,
      });
      navigate("/courses");
    } catch (error) {
      console.error("Error updating course", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-start">
      <div className="w-3/4">
        <div className="flex border-b justify-between items-center p-3">
          <h1 className="text-3xl font-bold">Edit Course</h1>
          <Link
            to="/courses"
            className="px-2 py-2 text-lg rounded-lg shadow-lg border-2 border-blue-700 hover:bg-blue-100 text-blue-950"
          >
            Go Back
          </Link>
        </div>

        <form onSubmit={updateCourse} className="w-full mt-4">
          {/* Name */}
          <div className="w-full">
            <label htmlFor="name" className="block text-left text-sm/6 font-medium">
              Course Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                value={name}
                placeholder="Course Name"
                required
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                className="w-full rounded-md ring-1 ring-slate-800 px-3 py-1.5 text-base text-slate-950 outline-1 outline-slate-800 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          {/* Code */}
          <div className="w-full mt-3">
            <label htmlFor="code" className="block text-left text-sm/6 font-medium">
              Course Code
            </label>
            <div className="mt-1">
              <input
                id="code"
                value={code}
                placeholder="Course Code"
                required
                onChange={(e) => setCode(e.target.value)}
                type="text"
                name="code"
                className="w-full rounded-md ring-1 ring-slate-800 px-3 py-1.5 text-base text-slate-950 outline-1 outline-slate-800 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          {/* Programme Select */}
          <div className="w-full mt-3">
            <label htmlFor="programmeId" className="block text-left text-sm/6 font-medium">
              Select Programme
            </label>
            <div className="mt-1">
              <select
                id="programmeId"
                value={programmeId}
                onChange={(e) => setProgrammeId(Number(e.target.value))}
                required
                className="w-full rounded-md ring-1 ring-slate-800 px-3 py-1.5 text-base text-slate-950 outline-1 outline-slate-800 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
              >
                <option value="">-- Select Programme --</option>
                {programmes.map((programme) => (
                  <option key={programme.id} value={programme.id}>
                    {programme.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="w-full mt-3">
            <label htmlFor="description" className="block text-left text-sm/6 font-medium">
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Course description"
                required
                name="description"
                className="w-full rounded-md ring-1 ring-slate-800 px-3 py-1.5 text-base text-slate-950 outline-1 outline-slate-800 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex mt-3 items-center justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="disabled:cursor-not-allowed cursor-pointer px-3 py-2 text-md rounded-lg shadow-lg bg-indigo-600 hover:bg-indigo-300 text-white hover:text-indigo-950"
            >
              {isSubmitting ? "Updating..." : "Update Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
