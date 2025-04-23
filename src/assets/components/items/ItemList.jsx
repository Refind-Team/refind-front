import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import { Turtle } from "lucide-react";

const ItemList = ({ onViewDetails, items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum item encontrado</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item) => (
        <div
          key={item.id || item.code}
          onClick={() => onViewDetails(item)}
          className="cursor-pointer"
        >
          <ItemCard item={item} />
        </div>
      ))}
    </div>
  );
};
export default ItemList;
