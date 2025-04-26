import { ChevronDown } from "lucide-react";

const Select = ({ label, options, value, onChange, error }) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full p-2 border rounded appearance-none focus:outline-none focus:ring-1 focus:ring-blue-400 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Select;
