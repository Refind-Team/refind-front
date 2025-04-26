
import { useForm } from "react-hook-form";
import { authService } from "../services/authService";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data) => {
    try {
      await authService.forgotPassword(data.email);
      setMessage("Se o email existir, você receberá instruções de redefinição.");
      setErrorMsg("");
    } catch (err) {
      setErrorMsg(err?.response?.data?.error || "Falha ao solicitar redefinição.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Esqueceu a senha</h1>
        {message && <p className="text-green-600 mb-4">{message}</p>}
        {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input type="email" {...register("email", { required: "Obrigatório" })} className="w-full p-2 border rounded" />
            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
          </div>
          <button type="submit" className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
            Enviar
          </button>
        </form>
        <div className="flex justify-between mt-4 text-sm">
          <Link to="/" className="text-blue-600 hover:underline">Voltar para login</Link>
        </div>
      </div>
    </div>
  );
}
