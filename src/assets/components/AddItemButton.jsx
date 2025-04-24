import React from 'react';
import { Plus } from 'lucide-react';

const AddItemButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer shadow"
      aria-label="Adicionar novo item"
    > 
    <Plus/> Registrar perda/achado
    </button>
  );
};

export default AddItemButton;