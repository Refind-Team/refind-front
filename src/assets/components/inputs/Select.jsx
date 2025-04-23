import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
const Select = ({ value, onChange, error, onBlur }) => {
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
    { value: "eletrônicos", label: "Eletrônicos" },
    { value: "documentos", label: "Documentos" },
    { value: "roupas", label: "Roupas" },
    { value: "acessórios", label: "Acessórios" },
    { value: "outros", label: "Outros" },
  ];

  return (
    <div className="flex-1">
      <label className="block text-sm font-semibold text-gray-900 mb-1 ">
        Categoria
      </label>
      <div className="relative w-full">
        <select
          value={selectedValue}
          onChange={handleChange}
          className={`w-full p-2 border rounded appearance-none ${
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
