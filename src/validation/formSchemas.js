// src/validation/formSchemas.js
export const itemFormValidation = {
  name: {
    required: "O título é obrigatório",
    minLength: { value: 3, message: "Mínimo de 3 caracteres" },
  },
  categoryId: {
    required: "Selecione uma categoria",
    validate: (v) => (Number(v) > 0) || "Categoria inválida",
  },
  date: { required: "A data é obrigatória" },
  location: { required: "A localização é obrigatória" },
  responsible: { required: "O nome do responsável é obrigatório" },
  contact: {
    required: "O contato é obrigatório",
    validate: {
      emailOrPhone: (value) => {
        if (value.includes("@")) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? true
            : "Formato de email inválido";
        }
        const nums = value.replace(/\D/g, "");
        return (nums.length >= 10 && nums.length <= 11)
          ? true
          : "Telefone deve ter 10 ou 11 dígitos";
      },
    },
  },
  status: { required: "Selecione um status" },
};
