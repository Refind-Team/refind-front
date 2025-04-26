// src/services/itemService.js
import { api } from "./api";

export const itemService = {
  // Corrigido para retornar apenas o array de itens
  getAll: () =>
    api.get("/items")
       .then(res => res.data.data), // a API retorna { data: [...] }

  // Retorna apenas o item criado
  create: (item) =>
    api.post("/items", item)
       .then(res => res.data.item),

  // Atualiza e retorna o item atualizado
  update: (code, item) =>
    api.put(`/items/${code}`, item)
       .then(res => res.data.item),

  // Deleta item
  remove: (code) =>
    api.delete(`/items/${code}`),

  // Busca item por código e retorna apenas o item
  getByCode: (code) =>
    api.get(`/items/code/${code}`)
       .then(res => res.data.item),
};
