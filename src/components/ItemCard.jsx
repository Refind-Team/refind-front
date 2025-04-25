import { useState } from "react";
import { EditModal } from "./EditModal";
import { DeleteModal } from "./DeleteModal";

export default function ItemCard({ item, editable = false }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="border rounded-lg p-4 shadow bg-white relative">
      <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover rounded" />
      <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
      <p className="text-sm text-gray-600">{item.description}</p>

      {editable && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            className="bg-yellow-400 text-white text-xs px-2 py-1 rounded"
            onClick={() => setShowEditModal(true)}
          >
            Editar
          </button>
          <button
            className="bg-red-500 text-white text-xs px-2 py-1 rounded"
            onClick={() => setShowDeleteModal(true)}
          >
            Excluir
          </button>
        </div>
      )}

      {showEditModal && (
        <EditModal item={item} onClose={() => setShowEditModal(false)} />
      )}
      {showDeleteModal && (
        <DeleteModal itemId={item.id} onClose={() => setShowDeleteModal(false)} />
      )}
    </div>
  );
}
