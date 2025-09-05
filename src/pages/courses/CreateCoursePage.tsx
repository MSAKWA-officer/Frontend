import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:8080/api";
const PROGRAMMES_API = `${API_BASE}/programmes`;
const COURSES_API = `${API_BASE}/courses`;

// Type for Programme
type Programme = {
  id: number;
  name: string;
};

export default function CreateCoursePage() {
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [programmeId, setProgrammeId] = useState<number | "">("");

  // Dropdown data
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch programmes on mount
  useEffect(() => {
    axios
      .get<Programme[]>(PROGRAMMES_API)
      .then(({ data }) => {
        if (Array.isArray(data)) {
          setProgrammes(data);
        } else {
          console.error("Invalid programmes response", data);
          setProgrammes([]);
        }
      })
      .catch((err) => console.error("Error fetching programmes", err));
  }, []);

  // Save course handler
  const saveCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!programmeId) {
      alert("Please select a programme");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name,
        code,
        description,
        programmeId: Number(programmeId),
      };

      const response = await axios.post(COURSES_API, payload);
      console.log("Course saved:", response.data);

      // Reset form
      setName("");
      setCode("");
      setDescription("");
      setProgrammeId("");
      setIsSubmitting(false);

      // Navigate to courses list
      navigate("/courses");
    } catch (error: any) {
      console.error("Error saving course", error.response || error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-start p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h1 className="text-2xl font-bold">Create Course</h1>
          <Link
            to="/courses"
            className="px-3 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Go Back
          </Link>
        </div>

        <form onSubmit={saveCourse} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Course Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Course Name"
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Code */}
          <div>
            <label htmlFor="code" className="block font-medium mb-1">
              Course Code
            </label>
            <input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Course Code"
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Programme Select */}
          <div>
            <label htmlFor="programmeId" className="block font-medium mb-1">
              Select Programme
            </label>
            <select
              id="programmeId"
              value={programmeId}
              onChange={(e) =>
                setProgrammeId(e.target.value ? Number(e.target.value) : "")
              }
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">-- Select Programme --</option>
              {programmes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Course Description"
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
