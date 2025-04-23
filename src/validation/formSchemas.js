export const itemFormValidation = {
  name: {
    required: "O título é obrigatório",
    minLength: { value: 3, message: "Mínimo de 3 caracteres" },
  },
  category: {
    required: "Selecione uma categoria",
  },
  date: {
    required: "A data é obrigatória",
  },
  location: {
    required: "A localização é obrigatório",
  },
  responsible: {
    required: "O nome do responsável é obrigatório",
  },
  contact: {
    required: "O contato é obrigatório",
    validate: {
      validFormat: (value) => {
        if (!value) return true;
        if (value.includes("@")) {
          const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          return isValidEmail || "Formato de email inválido";
        } else {
          const numbersOnly = value.replace(/\D/g, "");
          return (
            (numbersOnly.length >= 10 && numbersOnly.length <= 11) ||
            "Telefone deve ter 10 ou 11 dígitos"
          );
        }
      },
    },
  },

  status: {
    required: "Selecione um status",
  },
};
