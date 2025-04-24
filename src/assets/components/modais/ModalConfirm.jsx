import Modal from "./Modal";
import { MessageSquareWarning } from "lucide-react";

const ModalConfirm = ({ onClose, onConfirm, message }) => {
  return (
    <Modal onClose={onClose} maxWidth="sm">
      <div className="text-center space-y-4">
        <MessageSquareWarning className="mx-auto text-blue-500 w-12 h-12" />
        <h2 className="text-lg font-bold">Tem certeza?</h2>
        <p className="text-gray-700 font-semibold">{message}</p>
        <p className="text-gray-600 mb-6">
          Essa ação é permanente e não poderá ser desfeita.
        </p>
        <div className="flex justify-end gap-12 mt-6">
          <button
            onClick={onClose}
            className="text-gray-800 font-bold cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 font-semibold text-white px-4 py-2 rounded cursor-pointer"
          >
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default ModalConfirm;
