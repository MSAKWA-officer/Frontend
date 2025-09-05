// src/pages/programmes/EditProgrammePage.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CLIENT } from "../utils/constants/apiClient";
import { PROGRAMMES_API, DEPARTMENTS_API } from "../utils/constants/appConstants";
import type { Programme } from "../utils/responses/Programme";
import type { Department } from "../utils/responses/department";

export default function EditProgrammePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [code, setCode] = useState(""); // New code field
  const [description, setDescription] = useState("");
  const [departmentId, setDepartmentId] = useState<number | "">("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch programme details
  useEffect(() => {
    if (id) {
      CLIENT.get<Programme>(`${PROGRAMMES_API}/${id}`)
        .then(({ data }) => {
          setName(data.name);
          setCode(data.code || ""); // load code
          setDescription(data.description);
          setDepartmentId(data.departmentId);
        })
        .catch((err: any) => console.error("Error fetching programme", err));
    }
  }, [id]);

  // Fetch departments for dropdown
  useEffect(() => {
    CLIENT.get<Department[]>(DEPARTMENTS_API)
      .then(({ data }) => setDepartments(data))
      .catch((err) => console.error("Error fetching departments", err));
  }, []);

  const updateProgramme = (e: any) => {
    e.preventDefault();
    if (!departmentId) {
      alert("Please select a department");
      return;
    }

    setIsSubmitting(true);

    CLIENT.put<Programme>(`${PROGRAMMES_API}/${id}`, { name, code, description, departmentId })
      .then(() => {
        setIsSubmitting(false);
        navigate("/programmes");
      })
      .catch((error: any) => {
        console.error("Error updating programme", error);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="h-screen flex justify-center items-start">
      <div className="w-3/4">
        <div className="flex border-b justify-between items-center p-3">
          <h1 className="text-3xl font-bold">Edit Programme</h1>
          <Link
            to="/programmes"
            className="px-2 py-2 text-lg rounded-lg shadow-lg border-2 border-blue-700 hover:bg-blue-100 text-blue-950"
          >
            Go Back
          </Link>
        </div>

        <form onSubmit={updateProgramme} className="w-full mt-4">
          {/* Name */}
          <div className="w-full">
            <label htmlFor="name" className="block text-left text-sm/6 font-medium">
              Programme Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                value={name}
                placeholder="Programme Name"
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
              Programme Code
            </label>
            <div className="mt-1">
              <input
                id="code"
                value={code}
                placeholder="Programme Code"
                required
                onChange={(e) => setCode(e.target.value)}
                type="text"
                name="code"
                className="w-full rounded-md ring-1 ring-slate-800 px-3 py-1.5 text-base text-slate-950 outline-1 outline-slate-800 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          {/* Department Select */}
          <div className="w-full mt-3">
            <label htmlFor="departmentId" className="block text-left text-sm/6 font-medium">
              Select Department
            </label>
            <div className="mt-1">
              <select
                id="departmentId"
                value={departmentId}
                onChange={(e) => setDepartmentId(Number(e.target.value))}
                required
                className="w-full rounded-md ring-1 ring-slate-800 px-3 py-1.5 text-base text-slate-950 outline-1 outline-slate-800 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
              >
                <option value="">-- Select Department --</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
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
                placeholder="Programme description"
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
              {isSubmitting ? "Updating..." : "Update Programme"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
