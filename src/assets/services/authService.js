import { api } from "./api";

export const authService = {
  login: (email, password) =>
    api.post("/auth/login", { email, password }),
  register: (name, phone, email, password, role="USER") =>
    api.post("/auth/register", { name, phone, email, password, role }),
  forgotPassword: (email) =>
    api.post("/auth/forgot-password", { email }),
};
