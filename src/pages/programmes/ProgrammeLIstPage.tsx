import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { CLIENT } from "../utils/constants/apiClient";


// src/programmes/types.ts
export type Programme = {
  id: number;
  name: string;
  departmentId?: number;
  description?: string;
};



export default function ProgrammeListPage() {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProgrammes();
  }, []);

  const fetchProgrammes = async () => {
    setLoading(true);
    try {
      const { data } = await CLIENT.get("programmes");
      setProgrammes(data as Programme[]);
    } catch (error) {
      console.error("Error fetching programmes", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProgramme = async (
    e: React.MouseEvent<SVGSVGElement>,
    programme: Programme
  ) => {
    e.preventDefault();
    if (!confirm(`Are you sure you want to delete ${programme.name}?`)) return;

    try {
      await CLIENT.delete(`programmes/${programme.id}`);
      alert("Programme deleted successfully");
      fetchProgrammes();
    } catch (error) {
      console.error("Error deleting programme", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full h-full">
        {/* Header */}
        <div className="flex border-b pb-3 justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Programmes</h1>
          <Link
            to="/create-programme"
            className="px-4 py-2 text-lg rounded-lg shadow-md bg-blue-600 hover:bg-blue-500 text-white"
          >
            New Programme
          </Link>
        </div>

        {/* Loading / No Data / Table */}
        {loading ? (
          <div className="text-center py-10 text-lg font-semibold text-gray-600">
            Loading programmes...
          </div>
        ) : programmes.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No programmes found.
          </div>
        ) : (
          <div className="overflow-x-auto h-[calc(100vh-160px)]">
            <table className="table-auto border-collapse border border-slate-400 w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-slate-300 uppercase p-2">S/N</th>
                  <th className="border border-slate-300 uppercase p-2">
                    Name
                  </th>
                  <th className="border border-slate-300 uppercase p-2">
                    Description
                  </th>
                  <th className="border border-slate-300 uppercase p-2">
                    DepartmentId
                  </th>
                  <th className="border border-slate-300 uppercase p-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {programmes.map((programme, index) => (
                  <tr key={programme.id} className="hover:bg-gray-50">
                    <td className="border border-slate-300 p-2">{index + 1}</td>
                    <td className="border border-slate-300 p-2">
                      {programme.name}
                    </td>
                    <td className="border border-slate-300 p-2">
                      {programme.description}
                    </td>
                    <td className="border border-slate-300 p-2">
                      {programme.departmentId}
                    </td>
                    <td className="border border-slate-300 p-2">
                      <div className="flex items-center justify-center space-x-2">
                        <Link to={`/edit-programme/${programme.id}`}>
                          <PencilSquareIcon
                            title="Edit Programme"
                            className="size-6 text-green-500 cursor-pointer"
                          />
                        </Link>
                        <TrashIcon
                          title="Delete Programme"
                          onClick={(e) => deleteProgramme(e, programme)}
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
