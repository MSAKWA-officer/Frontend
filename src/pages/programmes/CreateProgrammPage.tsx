// src/pages/programmes/CreateProgrammePage.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CLIENT } from "../utils/constants/apiClient";
import { PROGRAMMES_API, DEPARTMENTS_API } from "../utils/constants/appConstants";
import type { Department } from "../utils/responses/department";

export default function CreateProgrammePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [code, setCode] = useState(""); // ✅ New Code field
  const [description, setDescription] = useState("");
  const [departmentId, setDepartmentId] = useState<number | "">(""); 
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch departments for dropdown
  useEffect(() => {
    CLIENT.get<Department[]>(DEPARTMENTS_API)
      .then(({ data }) => setDepartments(data))
      .catch((err) => console.error("Error fetching departments", err));
  }, []);

  const handleDescriptionChange = ({ target }: any) => {
    setDescription(target.value);
  };

  const saveProgramme = (e: any) => {
    e.preventDefault();
    if (!departmentId) {
      alert("Please select a department");
      return;
    }
    setIsSubmitting(true);

    CLIENT.post(PROGRAMMES_API, { name, code, description, departmentId }) // ✅ send code
      .then(() => {
        setName("");
        setCode(""); // reset
        setDescription("");
        setDepartmentId("");
        setIsSubmitting(false);
        navigate("/programmes");
      })
      .catch((error: any) => {
        console.error("Error saving programme", error);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="h-screen flex justify-center items-start">
      <div className="w-3/4">
        <div className="flex border-b justify-between items-center p-3">
          <h1 className="text-3xl font-bold">Create Programme</h1>
          <Link
            to="/programmes"
            className="px-2 py-2 text-lg rounded-lg shadow-lg border-2 border-blue-700 hover:bg-blue-100 text-blue-950"
          >
            Go Back
          </Link>
        </div>

        <form onSubmit={saveProgramme} className="w-full mt-4">
          {/* Programme Name */}
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
                className="w-full rounded-md ring-1 ring-slate-800 px-3 py-1.5 text-base"
              />
            </div>
          </div>

          {/* Programme Code */}
          <div className="w-full mt-3">
            <label htmlFor="code" className="block text-left text-sm/6 font-medium">
              Programme Code
            </label>
            <div className="mt-1">
              <input
                id="code"
                value={code}
                placeholder="e.g. CS101"
                required
                onChange={(e) => setCode(e.target.value)}
                type="text"
                className="w-full rounded-md ring-1 ring-slate-800 px-3 py-1.5 text-base"
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
                className="w-full rounded-md ring-1 ring-slate-800 px-3 py-1.5 text-base"
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
                onChange={handleDescriptionChange}
                placeholder="Programme description"
                required
                className="w-full rounded-md ring-1 ring-slate-800 px-3 py-1.5 text-base"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex mt-3 items-center justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="disabled:cursor-not-allowed cursor-pointer px-3 py-2 text-md rounded-lg shadow-lg bg-indigo-600 hover:bg-indigo-300 text-white hover:text-indigo-950"
            >
              {isSubmitting ? "Saving..." : "Save Programme"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
