import React from "react";
import Modal from "./Modal";
import {
  CircleDashed,
  CalendarFold,
  MapPin,
  User,
  Tag,
  Phone,
  Pencil,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";

const ItemDetailsModal = ({ item, onClose, onEdit, onDelete }) => {
  if (!item) return null;

  const categoryName =
    typeof item.category === "object" ? item.category.name : item.category;
  const statusLabel = item.status === "LOST" ? "Perdido" : "Encontrado";
  const dateLabel = item.date
    ? format(new Date(item.date), "dd/MM/yyyy")
    : "Não informada";

  return (
    <Modal onClose={onClose}>
      <div className="relative flex flex-col md:flex-row gap-6 p-4">
        <div className="absolute top-3 right-3 flex gap-2">
          <button title="Fechar" onClick={onClose} className="text-gray-500">
            ✕
          </button>
          {onEdit && (
            <button
              title="Editar"
              onClick={() => onEdit(item)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Pencil size={18} />
            </button>
          )}
          {onDelete && (
            <button
              title="Excluir"
              onClick={() => onDelete(item.code)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>

        {item.photo && (
          <div className="w-full md:w-2/5">
            <img
              src={item.photo}
              alt={item.name}
              className="rounded-lg w-full object-cover shadow-md"
            />
          </div>
        )}

        <div className="flex-1 space-y-5">
          <h2 className="text-2xl font-bold">{item.name}</h2>

          <Detail icon={User} label="Responsável">
            {item.user?.name || "João Paulo Almeida"}
          </Detail>

          <Detail icon={Tag} label="Categoria">
            {categoryName || "Não informada"}
          </Detail>

          <Detail icon={MapPin} label="Localização">
            {item.location || "Não informada"}
          </Detail>

          <Detail icon={CalendarFold} label="Data">
            {dateLabel}
          </Detail>

          <Detail icon={CircleDashed} label="Status">
            <span className="text-blue-500 font-semibold">{statusLabel}</span>
          </Detail>

          {item.contact && (
            <button className="mt-6 flex items-center gap-2 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600">
              <Phone size={18} /> Entrar em contato
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

const Detail = ({ icon: Icon, label, children }) => (
  <div className="flex items-start gap-3">
    <Icon size={20} className="text-blue-500 mt-1" />
    <div>
      <h3 className="text-lg font-medium">{label}</h3>
      <p className="text-gray-700">{children}</p>
    </div>
  </div>
);

export default ItemDetailsModal;
