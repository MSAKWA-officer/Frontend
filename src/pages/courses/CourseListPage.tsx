import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { CLIENT } from "../utils/constants/apiClient";
import { COURSES_API } from "../utils/constants/appConstants"; 


// src/courses/types.ts
export type Course = {
  title: string;
  code: string;
  id: number;
  name: string;
  programmeId?: number;
  description?: string;
};


export default function CourseListPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { data } = await CLIENT.get<Course[]>(COURSES_API);
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (
    e: React.MouseEvent<SVGSVGElement>,
    course: Course
  ) => {
    e.preventDefault();
    if (!confirm(`Are you sure you want to delete the course: "${course.name}"?`)) return;

    try {
      await CLIENT.delete(`${COURSES_API}/${course.id}`);
      alert("Course deleted successfully");
      fetchCourses(); 
    } catch (error) {
      console.error("Error deleting course", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      {/* Card Wrapper */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full h-full">
        {/* Header */}
        <div className="flex border-b pb-4 justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Courses</h1>
          <Link
            to="/create-course"
            className="px-4 py-2 text-lg rounded-lg shadow-md bg-blue-600 hover:bg-blue-500 text-white"
          >
            + New Course
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-10 text-lg font-semibold">
            Loading courses...
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No courses found.
          </div>
        ) : (
          /* Table */
          <div className="overflow-x-auto">
            <table className="border-collapse border border-slate-400 w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-slate-300 uppercase p-2">S/N</th>
                  <th className="border border-slate-300 uppercase p-2">Name</th>
                  <th className="border border-slate-300 uppercase p-2">Code</th>
                  <th className="border border-slate-300 uppercase p-2">Description</th>
                  <th className="border border-slate-300 uppercase p-2">ProgrammeId</th>
                  <th className="border border-slate-300 uppercase p-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="border border-slate-300 p-2">{index + 1}</td>
                    <td className="border border-slate-300 p-2">{course.name}</td>
                    <td className="border border-slate-300 p-2">{course.code}</td>
                    <td className="border border-slate-300 p-2">{course.description}</td>
                    <td className="border border-slate-300 p-2">{course.programmeId}</td>
                    <td className="border border-slate-300 p-2">
                      <div className="flex items-center justify-center space-x-2">
                        <Link to={`/edit-course/${course.id}`}>
                          <PencilSquareIcon
                            title="Edit Course"
                            className="size-6 text-green-600 cursor-pointer"
                          />
                        </Link>
                        <TrashIcon
                          title="Delete Course"
                          onClick={(e) => deleteCourse(e, course)}
                          className="size-6 text-red-600 cursor-pointer"
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
