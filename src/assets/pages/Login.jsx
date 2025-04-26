
import { useForm } from "react-hook-form";
import { authService } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await authService.login(data.email, data.password);
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      setErrorMsg(err?.response?.data?.error || "Falha no login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input type="email" {...register("email", { required: "Obrigatório" })} className="w-full p-2 border rounded" />
            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
          </div>
          <div>
            <label className="block mb-1">Senha</label>
            <input type="password" {...register("password", { required: "Obrigatório" })} className="w-full p-2 border rounded" />
            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
          </div>
          <button type="submit" className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
            Entrar
          </button>
        </form>
        <div className="flex justify-center mt-4 text-sm">
          <Link to="/register" className="text-blue-600 hover:underline">Criar conta</Link>
        </div>
      </div>
    </div>
  );
}
