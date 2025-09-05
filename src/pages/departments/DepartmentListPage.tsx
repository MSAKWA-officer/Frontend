import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import type { Department } from "../utils/responses/department";
import { CLIENT } from "../utils/constants/apiClient";

export default function DepartmentListPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const { data } = await CLIENT.get("departments");
      setDepartments(data as Department[]);
    } catch (error) {
      console.error("Error fetching departments", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDepartment = async (
    e: React.MouseEvent<SVGSVGElement>,
    department: Department
  ) => {
    e.preventDefault();
    if (!confirm(`Are you sure you want to delete ${department.name}?`)) return;

    try {
      await CLIENT.delete(`departments/${department.id}`);
      alert("Department deleted successfully");
      fetchDepartments();
    } catch (error) {
      console.error("Error deleting department", error);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 p-4">
      {/* Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 h-full w-full flex flex-col">
        {/* Header */}
        <div className="flex border-b pb-3 justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Departments</h1>
          <Link
            to="/create-department"
            className="px-4 py-2 text-lg rounded-lg shadow bg-blue-600 hover:bg-blue-500 text-white"
          >
            New Department
          </Link>
        </div>

        {/* Content Area (fills card) */}
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="text-center py-10 text-lg font-semibold">
              Loading departments...
            </div>
          ) : departments.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No departments found.
            </div>
          ) : (
            <table className="border-collapse border border-slate-400 w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-slate-300 uppercase p-2">S/N</th>
                  <th className="border border-slate-300 uppercase p-2">Name</th>
                  <th className="border border-slate-300 uppercase p-2">
                    Description
                  </th>
                  <th className="border border-slate-300 uppercase p-2">
                    CollegeId
                  </th>
                  <th className="border border-slate-300 uppercase p-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {departments.map((department, index) => (
                  <tr key={department.id} className="hover:bg-gray-50">
                    <td className="border border-slate-300 p-2">{index + 1}</td>
                    <td className="border border-slate-300 p-2">
                      {department.name}
                    </td>
                    <td className="border border-slate-300 p-2">
                      {department.description}
                    </td>
                    <td className="border border-slate-300 p-2">
                      {department.collegeId}
                    </td>
                    <td className="border border-slate-300 p-2">
                      <div className="flex items-center justify-center space-x-2">
                        <Link to={`/edit-department/${department.id}`}>
                          <PencilSquareIcon
                            title="Edit Department"
                            className="size-6 text-green-500 cursor-pointer"
                          />
                        </Link>
                        <TrashIcon
                          title="Delete Department"
                          onClick={(e) => deleteDepartment(e, department)}
                          className="size-6 text-red-500 cursor-pointer"
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
