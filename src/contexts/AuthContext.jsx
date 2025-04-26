import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return setLoading(false);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const userRes = await axios.get("/auth/me", config);
        const itemsRes = await axios.get("/items", config);

        setUser(userRes.data);
        setItems(itemsRes.data);
      } catch (err) {
        console.error("Erro ao buscar dados de autenticação", err);
        setUser(null);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, items, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
