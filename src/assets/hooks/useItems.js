import { useState, useEffect } from "react";
import { itemService } from "../services/itemService";

export function useItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadItems = async () => {
    setLoading(true);
    try {
      const loadedItems = await itemService.getAll(); // retorna array diretamente
      setItems(loadedItems);
      setError(null);
    } catch (err) {
      console.error("Erro ao carregar itens:", err);
      setError("Falha ao carregar itens. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const addItem = async (itemData) => {
    setLoading(true);
    try {
      const created = await itemService.create(itemData);
      await loadItems();
      return { success: true, data: created };
    } catch (err) {
      console.error("Erro ao adicionar item:", err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (code, data) => {
    setLoading(true);
    try {
      const updated = await itemService.update(code, data);
      await loadItems();
      return { success: true, data: updated };
    } catch (err) {
      console.error("Erro ao atualizar item:", err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (code) => {
    setLoading(true);
    try {
      await itemService.remove(code);
      await loadItems();
      return { success: true };
    } catch (err) {
      console.error("Erro ao deletar item:", err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const getItemByCode = async (code) => {
    try {
      return await itemService.getByCode(code);
    } catch (err) {
      console.error("Erro ao buscar item por código:", err);
      return null;
    }
  };

  return {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    getItemByCode,
  };
}