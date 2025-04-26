import { Search } from "lucide-react";

const SearchBar = ({ isInNavbar = false, filters = {}, onSearch }) => {
  const container = isInNavbar
    ? "relative w-full max-w-sm"
    : "w-full flex flex-col gap-4 mt-16";

  return (
    <div className={container}>
      <div className="flex items-center bg-white rounded-full border border-gray-300 px-3 py-1 shadow-sm">
        <Search className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type="text"
          className="flex-grow bg-transparent focus:outline-none text-sm"
          placeholder="Procurar objeto..."
          value={filters.search || ""}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
