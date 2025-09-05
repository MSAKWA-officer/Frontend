// src/components/ProfileUpload.tsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext"; // ✅ import context

const ProfileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const { user, setUser } = useContext(UserContext); // ✅ use context

  const handleUpload = async () => {
    if (!file || !user?.id) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `http://localhost:8080/api/users/${user.id}/upload-profile`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // ✅ Update context and localStorage
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Profile image updated!");
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  return (
    <div className="mt-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Upload Profile Image
      </button>
    </div>
  );
};

export default ProfileUpload;
