import React from "react";
import { format } from "date-fns";          // ← novo

const ItemCard = ({ item }) => {
  const statusLabel = item.status === "LOST" ? "Perdido" : "Encontrado";
  const isLost = item.status === "LOST";
  const statusStyles = isLost
    ? "bg-red-100 text-red-700"
    : "bg-green-100 text-green-700";

  /* formata data se existir */
  const dateLabel =
    item.date ? format(new Date(item.date), "dd/MM/yyyy") : null;

  return (
    <div className="bg-[#f4f4f4] shadow-md rounded-xl p-4 flex gap-4 items-start h-full">
      <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
        {item.photo ? (
          <img
            src={item.photo}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Sem foto
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold line-clamp-1">{item.name}</h3>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyles}`}
          >
            {statusLabel}
          </span>
        </div>

        {item.location && (
          <p className="text-sm text-gray-600 line-clamp-1">
            Local: {item.location}
          </p>
        )}
        {dateLabel && (
          <p className="text-xs text-gray-500 mt-2">Data: {dateLabel}</p>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
