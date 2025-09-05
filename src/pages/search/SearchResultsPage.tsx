import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResultsPage: React.FC = () => {
  const [results, setResults] = useState([]); // State to store results
  const location = useLocation(); // Get URL info

  // Extract query parameter from URL
  const query = new URLSearchParams(location.search).get("query") || "";

  // Fetch data whenever query changes
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/search?query=${query}`
        );
        setResults(res.data);
      } catch (err) {
        console.error("Search failed:", err);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Search Results for "{query}"</h2>

      {results.length > 0 ? (
        <ul>
          {results.map((item: any) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
