import { Plus } from "lucide-react";

const AddItemFloatingButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="sm:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all z-50"
    aria-label="Registrar perda ou achado"
  >
    <Plus size={24} />
  </button>
);

export default AddItemFloatingButton;
