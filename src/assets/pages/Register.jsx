import { useForm } from "react-hook-form";
import { authService } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await authService.register(data.name, data.phone, data.email, data.password);
      setSuccessMsg("Conta criada com sucesso! Você já pode fazer login.");
      setErrorMsg("");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      const msg = err?.response?.data?.error 
        || (err.code === "ERR_NETWORK" && "Servidor inacessível.")
        || "Falha no cadastro";
      setErrorMsg(msg);
      setSuccessMsg("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastro</h1>

        {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}
        {errorMsg   && <p className="text-red-600 mb-4">{errorMsg}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Nome</label>
            <input {...register("name", { required: "Obrigatório" })} className="w-full p-2 border rounded" />
            {errors.name && <span className="text-red-600">{errors.name.message}</span>}
          </div>
          <div>
            <label className="block mb-1">Telefone</label>
            <input {...register("phone", { required: "Obrigatório" })} className="w-full p-2 border rounded" />
            {errors.phone && <span className="text-red-600">{errors.phone.message}</span>}
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input type="email" {...register("email", { required: "Obrigatório" })} className="w-full p-2 border rounded" />
            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
          </div>
          <div>
            <label className="block mb-1">Senha</label>
            <input type="password" {...register("password", { required: "Obrigatório", minLength: 6 })} className="w-full p-2 border rounded" />
            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
          </div>
          <button type="submit" className="w-full py-2 rounded bg-green-600 text-white hover:bg-green-700 transition">
            Criar conta
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm">
          <Link to="/" className="text-blue-600 hover:underline">Já possui conta? Entrar</Link>
        </div>
      </div>
    </div>
  );
}
