import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CLIENT } from "../utils/constants/apiClient";
import type { College } from "../utils/responses/College";

export default function EditCollegePage() {
  const { id } = useParams<{ id: string }>(); // Get college ID from URL
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch college details on mount
  useEffect(() => {
    if (id) {
      CLIENT.get<College>(`colleges/${id}`)
        .then(({ data }) => {
          setName(data.name);
          setDescription(data.description);
        })
        .catch((error) => console.error("Error fetching college", error));
    }
  }, [id]);

  const updateCollege = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!id) return;

    CLIENT.put<College>(`colleges/${id}`, { name, description })
      .then(() => {
        setIsSubmitting(false);
        navigate("/"); // Go back to college list
      })
      .catch((error) => {
        console.error("Error updating college", error);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="h-screen flex justify-center items-start">
      <div className="w-3/4">
        <div className="flex border-b justify-between items-center p-3">
          <h1 className="text-3xl font-bold">Edit College</h1>
          <Link
            to="/"
            className="px-2 py-2 text-lg rounded-lg shadow-lg border-2 border-blue-700 hover:bg-blue-100 text-blue-950"
          >
            Go Back
          </Link>
        </div>

        <form onSubmit={updateCollege} className="w-full mt-4">
          {/* Name */}
          <div className="w-full">
            <label htmlFor="name" className="block text-left text-sm/6 font-medium">
              College Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                value={name}
                placeholder="College Name"
                required
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                className="w-full rounded-md ring-1 ring-slate-800 px-3 py-1.5 text-base text-slate-950 outline-1 outline-slate-800 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
              />
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
                placeholder="College description"
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
              {isSubmitting ? "Updating..." : "Update College"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
