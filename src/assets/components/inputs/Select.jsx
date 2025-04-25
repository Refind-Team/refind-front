import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
const Select = ({ value, onChange, error}) => {
  const [selectedValue, setSelectedValue] = useState(value || "");

  useEffect(() => {
    setSelectedValue(value || "");
  }, [value]);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    onChange(e.target.value);
  };
  const categoryOptions = [
    { value: "", label: "Selecione uma categoria" },
    { value: "Eletrônicos", label: "Eletrônicos" },
    { value: "Documentos", label: "Documentos" },
    { value: "Roupas", label: "Roupas" },
    { value: "Acessórios", label: "Acessórios" },
    { value: "Outros", label: "Outros" },
  ];

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-900 mb-1 ">
        Categoria
      </label>
      <div className="relative w-full">
        <select
          value={selectedValue}
          onChange={handleChange}
          className={`w-full p-2 border rounded appearance-none focus:outline-none focus:ring-1 focus:ring-blue-400 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm mt-1 mb-3">{error}</p>}

        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Select;
