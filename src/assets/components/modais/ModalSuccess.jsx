import Modal from "./Modal";
import { CircleCheckBig } from "lucide-react";

const ModalSuccess = ({ onClose, title, code }) => {
  return (
    <Modal onClose={onClose}>
      <div className="text-left space-y-4">
        <CircleCheckBig className="text-blue-500 w-12 h-12" />
        <h2 className="text-lg font-bold">Item cadastrado!</h2>
        <p className="text-sm font-mono text-gray-600">
          {`O item ${title} foi adicionado com sucesso.`}
        </p>
        {code && (
          <p className="text-sm font-mono text-gray-600">
            Código do item: <strong>{code}</strong>
          </p>
        )}
        <p>
          Anota esse código direitinho! Ele é sua chave pra editar ou apagar
          esse item depois.
        </p>
        <button
          onClick={onClose}
          className="mt-4
         bg-blue-600 text-white px-4 py-1 rounded cursor-pointer"
        >
          OK
        </button>
      </div>
    </Modal>
  );
};
export default ModalSuccess;
