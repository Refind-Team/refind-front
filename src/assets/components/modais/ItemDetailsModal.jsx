import React from "react";
import Modal from "./Modal";
import {
  CircleDashed,
  CalendarFold,
  MapPin,
  User,
  Tag,
  Phone,
} from "lucide-react";

const ItemDetailsModal = ({ item, onClose }) => {
  if (!item) {
    return null;
  }

  const { name, responsible, category, location, date, status, photo } = item;

  const statusLabel = status === "LOST" ? "Perdido" : "Encontrado";

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col md:flex-row gap-6 p-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {photo && (
          <div className="w-full md:w-2/5 mb-4 md:mb-0">
            <img
              src={photo}
              alt={name}
              className="rounded-lg w-full h-auto object-cover shadow-md"
            />
          </div>
        )}
        <div className="flex-1">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ccolor-title-subtitle">
              {name}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User size={20} className="text-blue-500 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-color-text">
                  Encontrado por
                </h3>
                <p className="text-color-text">
                  {responsible || "Não informado"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Tag size={20} className="text-blue-500 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-color-text">
                  Categoria
                </h3>
                <p className="text-color-text">{category}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-blue-500 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-color-text">
                  Localização
                </h3>
                <p className="text-color-text">{location || "Não informada"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarFold size={20} className="text-blue-500 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-color-text">Data</h3>
                <p className="text-color-text">{date}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CircleDashed size={20} className="text-blue-500" />
              <div>
                <h3 className="text-lg font-medium text-color-text">Status</h3>
                <p className="text-blue-500">{statusLabel}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button className="flex items-center justify-center gap-2 bg-ccolor-primary text-color-white-text py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md w-full md:w-auto">
              <Phone size={18} />
              <span>Entrar em contato</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ItemDetailsModal;
