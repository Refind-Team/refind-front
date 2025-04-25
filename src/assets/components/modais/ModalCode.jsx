import Modal from "./Modal";
import { RotateCcwKey } from "lucide-react";
import Input from "../inputs/Input";
import { useState } from "react";

const ModalCode = ({ onClose, onAccess, code, setCode }) => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateCode = () => {
    setError("");

    if (!code || code.trim() === "") {
      setError("O código não pode estar vazio.");
      return false;
    }

    return true;
  };

  const handleAccess = async () => {
    if (!validateCode()) return;

    setIsSubmitting(true);
    const success = await onAccess();
    if (!success) {
      setError("Código não encontrado ou erro ao acessar");
    }
    setIsSubmitting(false);
  };
  
  return (
    <Modal onClose={onClose} maxWidth="sm">
      <div className="px-2 py-2 sm:px-4">
        <div className="flex justify-center sm:justify-start mb-4">
          <RotateCcwKey className="text-blue-500 w-10 h-10 sm:w-12 sm:h-12" />
        </div>
        <h2 className="text-lg font-bold text-center sm:text-left mb-4">
          Acessar registro com código
        </h2>
        <Input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            if (error) validateCode();
          }}
          placeholder="Digite o código"
          className={error ? "border-red-500" : ""}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="text-gray-700 font-semibold py-2"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            onClick={handleAccess}
            className={`${
              isSubmitting ? "bg-blue-300" : "bg-blue-500"
            } text-white px-4 py-2 rounded font-semibold`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verificando..." : "Acessar"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCode;
