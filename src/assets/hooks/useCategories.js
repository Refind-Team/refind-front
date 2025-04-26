import { useState, useEffect } from "react";
import { categoryService } from "../services/categoryService";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  useEffect(() => {
    categoryService
      .getAll()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.error("Erro ao carregar categorias:", err);
        setError("Falha ao carregar categorias");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { categories, loading, error };
}