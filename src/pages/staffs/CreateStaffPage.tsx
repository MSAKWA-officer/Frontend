import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CLIENT } from "../utils/constants/apiClient";
import { STAFF_API, DEPARTMENTS_API } from "../utils/constants/appConstants";
import type { Department } from "../utils/responses/department"; // Assuming this type exists

export default function CreateStaffPage() {
  const navigate = useNavigate();
  // State for staff member fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [departmentId, setDepartmentId] = useState<number | "">("");

  const [departments, setDepartments] = useState<Department[]>([]); // List of departments
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch departments for dropdown
  useEffect(() => {
    CLIENT.get<Department[]>(DEPARTMENTS_API)
      .then(({ data }) => setDepartments(data))
      .catch((err) => console.error("Error fetching departments", err));
  }, []);

  const saveStaff = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!departmentId) {
      alert("Please select a department");
      return;
    }
    setIsSubmitting(true);

    CLIENT.post(STAFF_API, { name, email, phone, address, departmentId })
      .then(() => {
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setDepartmentId("");
        setIsSubmitting(false);
        navigate("/staffs");
      })
      .catch((error: any) => {
        console.error("Error saving staff member", error);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="h-screen flex justify-center items-start">
      <div className="w-3/4">
        <div className="flex border-b justify-between items-center p-3">
          <h1 className="text-3xl font-bold">Create Staff Member</h1>
          <Link
            to="/staffs"
            className="px-2 py-2 text-lg rounded-lg shadow-lg border-2 border-blue-700 hover:bg-blue-100 text-blue-950"
          >
            Go Back
          </Link>
        </div>

        <form onSubmit={saveStaff} className="w-full mt-4">
          {/* Name */}
          <div className="w-full">
            <label htmlFor="name" className="block text-left text-sm/6 font-medium">
              Staff Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                value={name}
                placeholder="Staff Name"
                required
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                className="w-full rounded-md ring-1 ring-slate-800 px-3 py-1.5 text-base text-slate-950 outline-1 outline-slate-800 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          {/* Email */}
          <div className="w-full mt-3">
            <label htmlFor="email" className="block text-left text-sm/6 font-medium">
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                value={email}
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                className="w-full rounded-md ring-1 ring-slate-800 px-3 py-1.5 text-base text-slate-950 outline-1 outline-slate-800 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="w-full mt-3">
            <label htmlFor="phone" className="block text-left text-sm/6 font-medium">
              Phone
            </label>
            <div className="mt-1">
              <input
                id="phone"
                value={phone}
                placeholder="Phone Number"
                required
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                name="phone"
                className="w-full rounded-md ring-1 ring-slate-800 px-3 py-1.5 text-base text-slate-950 outline-1 outline-slate-800 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          {/* Address */}
          <div className="w-full mt-3">
            <label htmlFor="address" className="block text-left text-sm/6 font-medium">
              Address
            </label>
            <div className="mt-1">
              <input
                id="address"
                value={address}
                placeholder="Address"
                required
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                name="address"
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
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex mt-3 items-center justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="disabled:cursor-not-allowed cursor-pointer px-3 py-2 text-md rounded-lg shadow-lg bg-indigo-600 hover:bg-indigo-300 text-white hover:text-indigo-950"
            >
              {isSubmitting ? "Saving..." : "Save Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}