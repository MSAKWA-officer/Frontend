// src/pages/departments/CreateDepartmentPage.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CLIENT } from "../utils/constants/apiClient";
import { DEPARTMENTS_API, COLLEGES_API } from "../utils/constants/appConstants";
import type { College } from "../utils/responses/College";

export default function CreateDepartmentPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [collegeId, setCollegeId] = useState<number | "">(""); // New state
  const [colleges, setColleges] = useState<College[]>([]); // List of colleges
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch colleges for dropdown
  useEffect(() => {
    CLIENT.get<College[]>(COLLEGES_API) // <-- specify type here
  .then(({ data }) => setColleges(data)) // now data is College[]
  .catch((err) => console.error("Error fetching colleges", err));

  }, []);

  const handleDescriptionChange = ({ target }: any) => {
    setDescription(target.value);
  };

  const saveDepartment = (e: any) => {
    e.preventDefault();
    if (!collegeId) {
      alert("Please select a college");
      return;
    }
    setIsSubmitting(true);

    CLIENT.post(DEPARTMENTS_API, { name, description, collegeId })
      .then(() => {
        setName("");
        setDescription("");
        setCollegeId("");
        setIsSubmitting(false);
        navigate("/departments");
      })
      .catch((error: any) => {
        console.error("Error saving department", error);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="h-screen flex justify-center items-start">
      <div className="w-3/4">
        <div className="flex border-b justify-between items-center p-3">
          <h1 className="text-3xl font-bold">Create Department</h1>
          <Link
            to="/departments"
            className="px-2 py-2 text-lg rounded-lg shadow-lg border-2 border-blue-700 hover:bg-blue-100 text-blue-950"
          >
            Go Back
          </Link>
        </div>

        <form onSubmit={saveDepartment} className="w-full mt-4">
          {/* Name */}
          <div className="w-full">
            <label htmlFor="name" className="block text-left text-sm/6 font-medium">
              Department Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                value={name}
                placeholder="Department Name"
                required
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                className="w-full rounded-md ring-1 ring-slate-800 px-3 py-1.5 text-base text-slate-950 outline-1 outline-slate-800 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          {/* College Select */}
          <div className="w-full mt-3">
            <label htmlFor="collegeId" className="block text-left text-sm/6 font-medium">
              Select College
            </label>
            <div className="mt-1">
              <select
                id="collegeId"
                value={collegeId}
                onChange={(e) => setCollegeId(Number(e.target.value))}
                required
                className="w-full rounded-md ring-1 ring-slate-800 px-3 py-1.5 text-base text-slate-950 outline-1 outline-slate-800 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
              >
                <option value="">-- Select College --</option>
                {colleges.map((college) => (
                  <option key={college.id} value={college.id}>
                    {college.name}
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
                placeholder="Department description"
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
              {isSubmitting ? "Saving..." : "Save Department"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
