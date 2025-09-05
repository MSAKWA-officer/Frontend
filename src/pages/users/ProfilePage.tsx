// src/pages/ProfilePage.tsx
import { useEffect, useState } from "react";
import { CLIENT } from "../utils/constants/apiClient";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  joined: string;
  avatar?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    try {
      // Replace "/user" with your actual API endpoint
      const { data } = await CLIENT.get<User>("/user");
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = () => {
    if (!user) return;
    if (!confirm(`Are you sure you want to delete ${user.name}?`)) return;
    // Add delete API call here
    alert("User deleted successfully");
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4 pt-24">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
        </div>

        {/* Loading / No User / Info */}
        {loading ? (
          <div className="text-center py-10 text-lg font-semibold text-gray-600">
            Loading user data...
          </div>
        ) : !user ? (
          <div className="text-center py-10 text-gray-500">No user found.</div>
        ) : (
          <>
            {/* User Info */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300">
                <img
                  src={user.avatar || "https://via.placeholder.com/80"}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-2 mb-6 text-gray-700">
              <p>
                <span className="font-semibold">Role:</span> {user.role}
              </p>
              <p>
                <span className="font-semibold">Department:</span> {user.department}
              </p>
              <p>
                <span className="font-semibold">Joined:</span> {user.joined}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                Edit Profile
              </button>
              <button
                onClick={deleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
              >
                Delete User
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
