import { useState } from "react";
import axios from "axios";

function EditModal({ item, onClose, onUpdated }) {
  const [titulo, setTitulo] = useState(item.titulo);
  const [descricao, setDescricao] = useState(item.descricao);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/items/${item._id}`, { titulo, descricao }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onUpdated(); // callback para atualizar a lista
      onClose();
    } catch (err) {
      console.error("Erro ao atualizar item:", err);
      alert("Erro ao atualizar item");
    }
  };

  return (
    <div className="modal">
      <h2>Editar Item</h2>
      <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      <button onClick={handleUpdate}>Salvar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
}

export default EditModal;
