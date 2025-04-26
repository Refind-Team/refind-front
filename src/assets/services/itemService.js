import { api } from "./api";

export const itemService = {
  getAll: () =>
    api.get("/items")
       .then(res => res.data.data),

  create: (item) =>
    api.post("/items", item)
       .then(res => res.data.item),

  update: (code, item) =>
    api.put(`/items/${code}`, item)
       .then(res => res.data.item),

  remove: (code) =>
    api.delete(`/items/${code}`),

  getByCode: (code) =>
    api.get(`/items/code/${code}`)
       .then(res => res.data.item),
};
