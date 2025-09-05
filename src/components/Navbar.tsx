import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm(""); // optional: clear input after search
    }
  };

  return (
    <nav className="fixed top-0 w-full z-10 flex justify-between items-center rounded-b-xl px-6 py-3 bg-blue-900 text-white">
      {/* Logo / Branding */}
      <div className="flex items-center gap-3">
        <Link to="/dashboards" className="font-bold text-lg">
          TAD<br />MUST
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="px-4 py-1 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring focus:ring-blue-500 w-60 md:w-96"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch(); // Press Enter to search
          }}
        />
        <button
          onClick={handleSearch}
          className="px-3 py-1 bg-slate-800 rounded hover:bg-blue-400"
        >
          Search
        </button>
      </div>

      {/* User Section */}
      <div className="relative">
        <button
          className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          User
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg flex-col">
            <Link
              to="/user"
              className="px-4 py-2 hover:bg-gray-200 rounded-t"
              onClick={() => setDropdownOpen(false)}
            >
              Profile
            </Link>
            <button
              className="px-4 py-2 hover:bg-gray-200 rounded-b text-left"
              onClick={() => {
                alert("Logged out!");
                setDropdownOpen(false);
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
