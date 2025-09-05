import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CLIENT } from "../utils/constants/apiClient";
import { SEARCH_API } from "../utils/constants/appConstants"; // your search endpoint

type SearchResult = {
  id: string | number;
  name: string;
};

const SearchResultsPage: React.FC = () => {
  const [results, setResults] = useState<SearchResult[]>([]); // ✅ typed state
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await CLIENT.get<SearchResult[]>(`${SEARCH_API}?query=${encodeURIComponent(query)}`);
        setResults(res.data); // ✅ now TypeScript knows this is SearchResult[]
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
          {results.map((item) => (
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
