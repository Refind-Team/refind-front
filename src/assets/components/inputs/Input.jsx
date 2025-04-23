const Input = ({ id, label, type, placeholder, value, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-900">{label}</label>
    <input
      id={id}
      type={type}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-400 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default Input;
