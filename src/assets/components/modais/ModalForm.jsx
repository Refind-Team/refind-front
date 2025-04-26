import Modal from "./Modal";
import FileUpload from "../inputs/FileUpload";
import { useEffect, useState } from "react";
import Select from "../inputs/Select";
import Input from "../inputs/Input";
import { useForm, Controller, FormProvider } from "react-hook-form";
import UnifiedContactInput from "../inputs/UnifiedContactInput";
import { itemFormValidation } from "../../../validation/formSchemas";
import { useCategories } from "../../hooks/useCategories";

const ModalForm = ({ onClose, onSave, onDelete, item, isEditing }) => {
  const { categories, loading: catLoading, error: catError } = useCategories();
  const categoryOptions = categories.map((c) => ({
    label: c.name,
    value: String(c.id),
  }));

  const methods = useForm({
    defaultValues: {
      name: "",
      categoryId: "",
      date: "",
      location: "",
      responsible: "",
      contact: "",
      status: "",
      photo: null,
    },
    mode: "all",
    reValidateMode: "onChange",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
  } = methods;

  const [file, setFile] = useState(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    if (isEditing && item) {
      const toFront = (s) => (s === "LOST" ? "Perdido" : "Encontrado");
      reset({
        name: item.name ?? "",
        categoryId: String(item.categoryId ?? ""),
        date: item.date?.slice(0, 10) ?? "",
        location: item.location ?? "",
        responsible: item.responsible ?? "",
        contact: item.contact ?? "",
        status: toFront(item.status) ?? "",
        photo: item.photo ?? null,
      });
    } else {
      reset();
      setFile(null);
    }
  }, [isEditing, item, reset]);

  useEffect(() => {
    if (submitAttempted) trigger();
  }, [submitAttempted, trigger]);

  const handleFileSelect = (f) => setFile(f);

  const onSubmit = (data) => {
    const toBack = (s) => (s === "Perdido" ? "LOST" : "FOUND");

    const send = (base64 = null) => {
      const payload = {
        name: data.name,
        categoryId: Number(data.categoryId),
        date: data.date,
        location: data.location,
        responsible: data.responsible,
        contact: data.contact,
        status: toBack(data.status),
        photo: base64,
      };

      if (isEditing && item) payload.code = item.code;
      onSave(payload);
    };

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => send(reader.result);
      reader.readAsDataURL(file);
    } else {
      send(data.photo || null);
    }
  };

  const handleFormSubmit = async (e) => {
    setSubmitAttempted(true);
    await handleSubmit(onSubmit)(e);
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">
          {isEditing ? "Editar item" : "Cadastrar item"}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 text-sm"
        >
          ✕
        </button>
      </div>

      <div className="max-h-[80vh] overflow-y-auto px-1 py-2">
        <FormProvider {...methods}>
          <form onSubmit={handleFormSubmit} noValidate>
            <Controller
              name="name"
              control={control}
              rules={itemFormValidation.name}
              render={({ field }) => (
                <Input
                  label="Título"
                  id="name"
                  placeholder="Ex: Celular A53"
                  type="text"
                  {...field}
                  error={errors.name?.message}
                />
              )}
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                {catLoading ? (
                  <p className="text-sm text-gray-500">Carregando categorias...</p>
                ) : catError ? (
                  <p className="text-sm text-red-500">{catError}</p>
                ) : (
                  <Controller
                    name="categoryId"
                    control={control}
                    rules={itemFormValidation.categoryId}
                    render={({ field }) => (
                      <Select
                        label="Categoria"
                        options={categoryOptions}
                        {...field}
                        error={errors.categoryId?.message}
                      />
                    )}
                  />
                )}
              </div>
              <div className="w-full sm:w-1/2">
                <Controller
                  name="date"
                  control={control}
                  rules={itemFormValidation.date}
                  render={({ field }) => (
                    <Input
                      label="Data"
                      id="date"
                      type="date"
                      {...field}
                      error={errors.date?.message}
                    />
                  )}
                />
              </div>
            </div>

            <Controller
              name="location"
              control={control}
              rules={itemFormValidation.location}
              render={({ field }) => (
                <Input
                  label="Localização"
                  id="location"
                  placeholder="Onde foi visto/encontrado"
                  type="text"
                  {...field}
                  error={errors.location?.message}
                />
              )}
            />

            <Controller
              name="responsible"
              control={control}
              rules={itemFormValidation.responsible}
              render={({ field }) => (
                <Input
                  label="Responsável"
                  id="responsible"
                  placeholder="Nome do responsável"
                  type="text"
                  {...field}
                  error={errors.responsible?.message}
                />
              )}
            />

            <UnifiedContactInput control={control} name="contact" errors={errors} />

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Status
              </label>
              <Controller
                name="status"
                control={control}
                rules={itemFormValidation.status}
                render={({ field }) => (
                  <div className="flex space-x-4">
                    {["Perdido", "Encontrado"].map((opt) => (
                      <label key={opt} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          {...field}
                          value={opt}
                          checked={field.value === opt}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
              />
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Imagem
              </label>
              <FileUpload onFileSelect={handleFileSelect} />
              {isEditing && item?.photo && !file && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Imagem atual:</p>
                  <img
                    src={item.photo}
                    alt="Imagem atual"
                    className="mt-1 h-24 w-auto object-cover rounded"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-between mt-10">
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-900 px-4 py-2 font-semibold"
                >
                  Cancelar
                </button>
                {isEditing && onDelete && (
                  <button
                    type="button"
                    onClick={() => onDelete(item.code)}
                    className="text-red-600 px-4 py-2 font-semibold"
                  >
                    Excluir
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {isEditing ? "Salvar" : "Cadastrar"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

export default ModalForm;
