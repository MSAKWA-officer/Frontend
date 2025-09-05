import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { CLIENT } from "../utils/constants/apiClient";


// src/staffs/types.ts
export type Staff = {
  phone: string;
  address: string;
  id: number;
  name: string;
  email: string;
  departmentId?: number;
};


export default function StaffListPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const { data } = await CLIENT.get("/staffs");
      setStaff(data as Staff[]);
    } catch (error) {
      console.error("Error fetching staff members", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteStaff = async (
    e: React.MouseEvent<SVGSVGElement>,
    staffMember: Staff
  ) => {
    e.preventDefault();

    if (!confirm(`Are you sure you want to delete ${staffMember.name}?`)) return;

    try {
      await CLIENT.delete(`/staffs/${staffMember.id}`);
      alert("Staff member deleted successfully");
      fetchStaff();
    } catch (error) {
      console.error("Error deleting staff member", error);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 p-4">
      {/* Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex border-b justify-between items-center pb-4 mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Staff Members</h1>
          <Link
            to="/create-staff"
            className="px-4 py-2 text-lg rounded-lg shadow-md bg-blue-600 hover:bg-blue-500 text-white"
          >
            New Staff
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="text-center py-10 text-lg font-semibold">
              Loading staff members...
            </div>
          ) : staff.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No staff members found.
            </div>
          ) : (
            <table className="w-full border-collapse border border-slate-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-slate-300 uppercase p-2">S/N</th>
                  <th className="border border-slate-300 uppercase p-2">Name</th>
                  <th className="border border-slate-300 uppercase p-2">Email</th>
                  <th className="border border-slate-300 uppercase p-2">Phone</th>
                  <th className="border border-slate-300 uppercase p-2">Address</th>
                  <th className="border border-slate-300 uppercase p-2">
                    DepartmentId
                  </th>
                  <th className="border border-slate-300 uppercase p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((staffMember, index) => (
                  <tr key={staffMember.id} className="hover:bg-gray-100">
                    <td className="border border-slate-300 p-2">{index + 1}</td>
                    <td className="border border-slate-300 p-2">{staffMember.name}</td>
                    <td className="border border-slate-300 p-2">{staffMember.email}</td>
                    <td className="border border-slate-300 p-2">{staffMember.phone}</td>
                    <td className="border border-slate-300 p-2">{staffMember.address}</td>
                    <td className="border border-slate-300 p-2">
                      {staffMember.departmentId}
                    </td>
                    <td className="border border-slate-300 p-2">
                      <div className="flex items-center justify-center space-x-2">
                        <Link to={`/edit-staff/${staffMember.id}`}>
                          <PencilSquareIcon
                            title="Edit Staff"
                            className="size-6 text-green-500 cursor-pointer"
                          />
                        </Link>
                        <TrashIcon
                          title="Delete Staff"
                          onClick={(e) => deleteStaff(e, staffMember)}
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
