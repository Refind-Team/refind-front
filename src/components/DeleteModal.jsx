import axios from "axios";

function DeleteModal({ itemId, onClose, onDeleted }) {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDeleted(); // callback para atualizar a lista
      onClose();
    } catch (err) {
      console.error("Erro ao excluir item:", err);
      alert("Erro ao excluir item");
    }
  };

  return (
    <div className="modal">
      <h2>Confirmar exclusão</h2>
      <p>Tem certeza que deseja excluir este item?</p>
      <button onClick={handleDelete}>Excluir</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
}

export default DeleteModal;
