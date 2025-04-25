import { useState, useEffect } from "react";
import { mockItemService } from "../services/mockItemService";

// Trocar pelo dados da api real
export function useItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const loadItems = async () => {
    setLoading(true);
    try {
      const loadedItems = await mockItemService.getAllItems();
      setItems(loadedItems);
      setError(null);
    } catch (error) {
      console.error("Erro ao carregar itens:", error);
      setError("Falha ao carregar itens. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadItems();
  }, []);

  const addItem = async (itemData) => {
    try {
      const response = await mockItemService.addItem(itemData);
      if (response.success) {
        await loadItems();
        return { success: true, data: response.data };
      }
      return { success: false };
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
      return { success: false, error };
    }
  };

  const updateItem = async (code, itemData) => {
    try {
      const response = await mockItemService.updateItem(code, itemData);
      if (response.success) {
        await loadItems();
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      return { success: false, error };
    }
  };
  const deleteItem = async (code) => {
    try {
      await mockItemService.deleteItem(code);
      await loadItems();
      return { success: true };
    } catch (error) {
      console.error("Erro ao excluir item:", error);
      return { success: false, error };
    }
  };

  const getItemByCode = async (code) => {
    try {
      return await mockItemService.getItemByCode(code);
    } catch (error) {
      console.error("Erro ao buscar item:", error);
      return null;
    }
  };


  return {
    items,
    loading,
    error,
    loadItems,
    addItem,
    updateItem,
    deleteItem,
    getItemByCode,
  };
}
