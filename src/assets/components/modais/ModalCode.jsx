import React, { useState } from "react";
import Modal from "./Modal";
import Input from "../inputs/Input";

const ModalCode = ({ onClose, onAccess, code, setCode }) => {
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const ok = await onAccess();
    if (!ok) {
      setError("Código não encontrado");
    }
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <h2 className="text-lg font-bold">Acessar registro com código</h2>
        <Input
          id="access-code"
          label="Digite o código"
          placeholder="Ex: ABC123"
          value={code}
          onChange={(e) => setCode(e.target.value.trim())}
          error={error}
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Acessar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalCode;
