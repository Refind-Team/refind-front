import { useState } from "react";
import { LogIn, UserPlus, Boxes, Menu, X } from "lucide-react";
import SearchBar from "../SearchBar";

const Navbar = ({
  filters,
  onSearch,
  onTypeChange,
  onFilterApply,
  onClearFilters,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = ["Todos", "Encontrados", "Perdidos"];

  const handleItemClick = (item) => {
    onTypeChange(item);
    setIsMobileMenuOpen(false);
  };
  return (
    <div className="fixed top-5 left-0 w-full px-4 z-50">
      <header className="w-full max-w-7xl m-auto flex justify-between items-center px-4 py-4 bg-blue-500 z-50 rounded-full shadow-md">
        <div className="flex items-center gap-3 mr-4">
          <Boxes className="text-white" size={30} />
          <span className="text-white font-bold text-lg">Refind</span>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => handleItemClick(item)}
              className={`text-sm font-semibold px-4 py-2 rounded-full transition-all ${
                filters.type === item
                  ? "bg-blue-600 text-white shadow"
                  : "text-white hover:bg-blue-600"
              }`}
            >
              {item}
            </button>
          ))}

          <div className="flex-grow flex justify-center mx-2">
            <SearchBar
              isInNavbar={true}
              filters={filters}
              onSearch={onSearch}
              onFilterApply={onFilterApply}
              onClearFilters={onClearFilters}
            />
          </div>
          <button className="flex items-center gap-2 text-sm font-medium text-white hover:bg-blue-600 px-4 py-2 rounded-full transition-colors">
            <LogIn size={18} /> Login
          </button>
          <button className="flex items-center gap-2 text-sm font-medium bg-white text-gray-900 px-4 py-2 rounded-full shadow hover:bg-blue-600 hover:text-white transition-colors">
            <UserPlus size={18} /> Criar conta
          </button>
        </div>
        <button
          className="sm:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col sm:hidden p-4 gap-2 z-40">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  handleItemClick(item);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-sm font-semibold px-4 py-2 rounded-md text-left ${
                  filters.type === item
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-800 hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            ))}
            <hr className="my-2" />
            <button className="flex items-center gap-2 text-sm text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-md">
              <LogIn size={18} /> Login
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-md">
              <UserPlus size={18} /> Criar conta
            </button>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
