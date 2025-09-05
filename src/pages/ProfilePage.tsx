// src/pages/ProfilePage.tsx
import React, { useContext } from "react";
import ProfileUpload from "../components/ProfileUpload";
import { UserContext } from "../contexts/UserContext"; // ✅ import context

const ProfilePage: React.FC = () => {
  const { user } = useContext(UserContext); // ✅ use context

  if (!user) {
    return <p>Please login first</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{user.username}’s Profile</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

      {user.profileImage ? (
        <img
          src={`http://localhost:8080${user.profileImage}`}
          alt="Profile"
          className="w-32 h-32 rounded-full mt-4"
        />
      ) : (
        <p>No profile image uploaded</p>
      )}

      {/* ✅ Upload Section */}
      <ProfileUpload />
    </div>
  );
};

export default ProfilePage;
