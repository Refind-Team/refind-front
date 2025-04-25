import React from "react";
// componente itemcard
const ItemCard = ({ item }) => {
  const statusLabel = item.status === "LOST" ? "Perdido" : "Encontrado";
  const isLost = item.status === "LOST";

  const statusStyles = isLost
    ? "bg-red-100 text-red-700"
    : "bg-green-100 text-green-700";


  return (
    <div className="bg-[#f4f4f4] shadow-md rounded-xl p-4 flex gap-4 items-start h-full">
      <div className="w-24 h-24 sm:w-30 sm:h-30 md:w-35 md:h-35 lg:w-30 lg:h-30 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
        {item.photo ? (
          <img
            src={item.photo || item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            Sem imagem
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-base text-gray-800 line-clamp-1">
            {item.name}
          </h3>

          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyles}`}
          >
            {statusLabel}
          </span>
        </div>

        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          Quem encontrou/perdeu: <strong>{item.responsible}</strong>
        </p>

        {item.location && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
            Local: {item.location}
          </p>
        )}
        <div className="mt-5">
        {item.date && (
          <p className="text-xs text-gray-500 line-clamp-1">Data: {item.date}</p>
        )}
        </div>
        
      </div>
      
    </div>
  );

};
export default ItemCard;
