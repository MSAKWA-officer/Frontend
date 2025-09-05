// src/pages/CollegeListPage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

import type { College } from "../utils/responses/College";
import { CLIENT } from "../utils/constants/apiClient";

export default function CollegeListPage() {
  // -------------------- State --------------------
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // -------------------- Effects --------------------
  useEffect(() => {
    fetchColleges();
  }, []);

  // -------------------- API Calls --------------------
  const fetchColleges = async () => {
    setLoading(true);
    try {
      const { data } = await CLIENT.get("colleges");
      setColleges(data as College[]);
    } catch (error) {
      console.error("Error fetching colleges", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCollege = async (
    e: React.MouseEvent<SVGSVGElement>,
    college: College
  ) => {
    e.preventDefault();

    if (!confirm(`Are you sure you want to delete ${college.name}?`)) return;

    try {
      await CLIENT.delete(`colleges/${college.id}`);
      alert("College deleted successfully");
      fetchColleges();
    } catch (error) {
      console.error("Error deleting college", error);
    }
  };

  // -------------------- Render --------------------
  return (
    <div className="w-full h-screen p-4 bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex border-b pb-4 justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Colleges</h1>
          <Link
            to="/create-college"
            className="px-4 py-2 text-lg rounded-lg shadow bg-blue-600 hover:bg-blue-500 text-white"
          >
            New College
          </Link>
        </div>

        {/* Loading / Empty State */}
        {loading ? (
          <div className="flex flex-1 justify-center items-center text-lg font-semibold">
            Loading colleges...
          </div>
        ) : colleges.length === 0 ? (
          <div className="flex flex-1 justify-center items-center text-gray-500">
            No colleges found.
          </div>
        ) : (
          /* Table */
          <div className="flex-1 overflow-auto">
            <table className="border-collapse border border-slate-400 w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-slate-300 uppercase p-2">S/N</th>
                  <th className="border border-slate-300 uppercase p-2">
                    Full Name
                  </th>
                  <th className="border border-slate-300 uppercase p-2">
                    Description
                  </th>
                  <th className="border border-slate-300 uppercase p-2">
                    Created At
                  </th>
                  <th className="border border-slate-300 uppercase p-2">
                    Updated At
                  </th>
                  
                  <th className="border border-slate-300 uppercase p-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {colleges.map((college, index) => (
                  <tr key={college.id} className="hover:bg-gray-50">
                    <td className="border border-slate-300 p-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-slate-300 p-2">
                      {college.name}
                    </td>
                    <td className="border border-slate-300 p-2">
                      {college.description}
                    </td>
                    <td className="border border-slate-300 p-2">
                      {college.createdAt}
                    </td>
                    <td className="border border-slate-300 p-2">
                      {college.updatedAt}
                    </td>
                    <td className="border border-slate-300 p-2">
                      <div className="flex items-center justify-center space-x-2">
                        <Link to={`/edit-college/${college.id}`}>
                          <PencilSquareIcon
                            title="Edit College"
                            className="size-6 text-green-500 cursor-pointer"
                          />
                        </Link>
                        <TrashIcon
                          title="Delete College"
                          onClick={(e) => deleteCollege(e, college)}
                          className="size-6 text-red-500 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
