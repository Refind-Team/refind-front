import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <div className="w-64 h-full bg-blue-600 text-white fixed flex flex-col justify-between">
      <div>
        <div className="p-4 flex items-center justify-center">
          <img src="/logo.svg" alt="Refind Logo" className="h-12" />
        </div>

        <nav className="space-y-2 mt-4 px-4">
          <Link to="/todos" className="block py-2 px-3 rounded hover:bg-blue-500">Todos</Link>
          <Link to="/encontrados" className="block py-2 px-3 rounded hover:bg-blue-500">Encontrados</Link>
          <Link to="/perdidos" className="block py-2 px-3 rounded hover:bg-blue-500">Perdidos</Link>
        </nav>
      </div>

      <div className="p-4">
        {user ? (
          <div className="flex items-center space-x-2">
            <img src={user.avatar || "/default-avatar.png"} className="w-8 h-8 rounded-full" />
            <span>{user.name}</span>
          </div>
        ) : (
          <div className="space-y-2">
            <Link to="/login" className="block">Login</Link>
            <Link to="/criar-conta" className="block">Criar conta</Link>
          </div>
        )}
      </div>
    </div>
  );
}
