import { useState } from "react";
import { Search, ListFilterPlus, X } from "lucide-react";
import Select from "./inputs/Select";

const SearchBar = ({
  isInNavbar = false,
  filters = {},
  onSearch,
  onFilterApply,
  onClearFilters,
}) => {

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    category: filters.category || "",
    location: filters.location || "",
  });

  const handleInputChange = (e) => {
    onSearch(e.target.value); 
  };

  const handleCategoryChange = (value) => {
    setTempFilters((prev) => ({ ...prev, category: value }));
  };

  const handleLocationChange = (e) => {
    setTempFilters((prev) => ({ ...prev, location: e.target.value }));
  };

  const handleApplyFilters = () => {
    onFilterApply(tempFilters);
    setIsFilterOpen(false);
  };

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
    const { category = "", location = "" } = filters;
    setTempFilters({ category, location });
  };
  const handleClear = () => {
    const cleared = { category: "", location: "" };
    setTempFilters(cleared);
    onClearFilters && onClearFilters(cleared);
  };

  const containerClasses = isInNavbar
    ? "relative w-full max-w-sm"
    : "w-full flex flex-col gap-4 mt-16";

  return (
    <div className={containerClasses}>
      <div className="flex items-center bg-white rounded-full border border-gray-300 px-3 py-1 shadow-sm">
        <Search className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type="text"
          className="flex-grow bg-transparent focus:outline-none text-sm"
          placeholder="Procurar objeto..."
          value={filters.search || ""}
          onChange={handleInputChange}
        />
        <button
          type="button"
          onClick={toggleFilter}
          className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ListFilterPlus className="h-5 w-5" />
        </button>
      </div>

      {isFilterOpen && (
        <div className="absolute top-12 right-0 w-90 p-4 border border-gray-200 rounded-md shadow-sm bg-white transition-all">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-500 text-sm">
              Filtrar por:
            </h3>
            <X className="text-gray-400" onClick={toggleFilter} />
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <Select
                value={tempFilters.category}
                onChange={handleCategoryChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Localização
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                placeholder="Digite o local onde foi perdido ou achado."
                value={tempFilters.location}
                onChange={handleLocationChange}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-between gap-3">
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-600 font-semibold px-3 py-1 rounded hover:bg-gray-100 cursor-pointer text-sm"
            >
              Limpar
            </button>
            <button
              type="button"
              onClick={handleApplyFilters}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 cursor-pointer text-sm"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
