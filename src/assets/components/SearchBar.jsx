import { useState } from "react";
import { Search, ListFilterPlus } from "lucide-react";
import Input from "./inputs/Input";
import Select from "./inputs/Select";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("procurando por:", searchTerm);
    // lógica aqui depois
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleCancelFilter = () => {
    setIsFilterOpen(false);
  };

  return (
    <div className="w-full flex flex-col gap-4 mt-16">
      <form
        onSubmit={handleSearch}
        className="flex sm:flex-row items-center gap-2"
      >
        <div className="relative w-full sm:max-w-sm flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
            placeholder="Procurar objeto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={toggleFilter}
            className="flex items-center justify-center px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Filtrar
          </button>
        </div>
      </form>

      {isFilterOpen && (
        <div className="w-full max-w-2xl p-4 border border-gray-200 rounded-md shadow-sm bg-white transition-all">
          <h3 className="text-lg font-semibold mb-4">Pesquisar em:</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Select />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 ">
                Localização
              </label>
              <Input placeholder="Onde foi visto pela última vez ou encontrado" />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex space-x-6">
              <label className="flex items-center space-x-2">
                <input type="radio" name="status" value="lost" />
                <span>Perdido</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="status" value="found" />
                <span>Encontrado</span>
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancelFilter}
              className="text-gray-600 font-semibold px-4 py-2 rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
