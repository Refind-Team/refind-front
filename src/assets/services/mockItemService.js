const generateUniqueCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  for (let i = 0; i < 4; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
};

export const mockItemService = {
  getAllItems: () => {
    const items = JSON.parse(localStorage.getItem("items") || "[]");
    return Promise.resolve(items);
  },

  addItem: (itemData) => {
    const items = JSON.parse(localStorage.getItem("items") || "[]");
    const code = generateUniqueCode();
    const newItem = {
      ...itemData,
      id: Date.now().toString(),
      code,
      createdAt: new Date().toISOString(),
    };
    items.push(newItem);
    localStorage.setItem("items", JSON.stringify(items));
    return Promise.resolve({ success: true, data: newItem });
  },

  getItemByCode: (code) => {
    const items = JSON.parse(localStorage.getItem("items") || "[]");
    const item = items.find((item) => item.code === code);
    return Promise.resolve(item || null);
  },

  updateItem: (code, itemData) => {
    const items = JSON.parse(localStorage.getItem("items") || "[]");
    const index = items.findIndex((item) => item.code === code);
    if (index !== -1) {
      items[index] = {
        ...items[index],
        ...itemData,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem("items", JSON.stringify(items));
      return Promise.resolve({ success: true, data: items[index] });
    }
    return Promise.resolve({ success: false, message: "Item não encontrado" });
  },
  deleteItem: (code) => {
    const items = JSON.parse(localStorage.getItem('items') || '[]');
    const newItems = items.filter(item => item.code !== code);
    localStorage.setItem('items', JSON.stringify(newItems));
    return Promise.resolve({ success: true });
  }
};
