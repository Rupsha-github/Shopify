import { useState, useEffect, useRef } from "react";

export const SearchBar = ({ data, onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Debouncing Logic: Updates the parent page's search results after 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  // Suggestion Logic: Filters immediately for the dropdown
  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()),
    );
    setSuggestions(filtered.slice(0, 5)); // Limit to top 5 suggestions
  }, [query, data]);

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (title) => {
    setQuery(title);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-md mx-4" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border-none rounded-full focus:outline-3 focus:outline-offset-3 focus:outline-yellow-300"
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="material-icons-outlined text-gray-400">search</span>
        </span>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 truncate"
              onClick={() => handleSuggestionClick(item.title)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
