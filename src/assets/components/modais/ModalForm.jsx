import Modal from "./Modal";
import FileUpload from "../inputs/FileUpload";
import { useEffect, useState } from "react";
import Select from "../inputs/Select";
import Input from "../inputs/Input";
import { useForm, Controller, FormProvider } from "react-hook-form";
import UnifiedContactInput from "../inputs/UnifiedContactInput";
import { itemFormValidation } from "../../../validation/formSchemas";

const ModalForm = ({ onClose, onSave, onDelete, item, isEditing }) => {
  const methods = useForm({
    defaultValues: {
      name: "",
      category: "",
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
    watch,
    reset,
    formState: { errors },
    trigger,
  } = methods;

  const [file, setFile] = useState(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const contactValue = watch("contact");
  const isEmail = contactValue?.includes("@");

  useEffect(() => {
    if (isEditing && item) {
      const translateStatusToFrontend = (status) =>
        status === "LOST" ? "Perdido" : status === "FOUND" ? "Encontrado" : "";

      reset({
        name: item.name || "",
        category: item.category || "",
        date: item.date || "",
        location: item.location || "",
        responsible: item.responsible || "",
        contact: item.contact || item.email || "",
        status: translateStatusToFrontend(item.status) || "",
        photo: item.photo || null,
      });
    } else {
      reset({
        name: "",
        category: "",
        date: "",
        location: "",
        responsible: "",
        contact: "",
        status: "",
        photo: null,
      });
      setFile(null);
    }
  }, [isEditing, item, reset]);

  useEffect(() => {
    if (submitAttempted) {
      trigger();
    }
  }, [trigger, submitAttempted]);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
  };

  const onSubmit = (data) => {
    const translateStatusToBackend = (status) =>
      status === "Perdido" ? "LOST" : "FOUND";

    const prepareAndSubmit = (base64Image = null) => {
      const isEmailValue = data.contact.includes("@");
      const itemData = {
        ...data,
        email: isEmailValue ? data.contact : "",
        contact: isEmailValue ? "" : data.contact,
        status: translateStatusToBackend(data.status),
        photo: base64Image,
      };

      if (isEditing && item) {
        itemData.id = item.id;
      }
      onSave(itemData);
    };
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        prepareAndSubmit(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      prepareAndSubmit(data.photo || null);
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
                <Controller
                  name="category"
                  control={control}
                  rules={itemFormValidation.category}
                  render={({ field }) => (
                    <Select {...field} error={errors.category?.message} />
                  )}
                />
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
                  placeholder="Onde foi visto pela última vez ou encontrado"
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
                  placeholder="Digite seu telefone ou e-mail"
                  type="text"
                  {...field}
                  error={errors.responsible?.message}
                />
              )}
            />
            <UnifiedContactInput
              control={control}
              name="contact"
              errors={errors}
            />

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
                    {["Perdido", "Encontrado"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          {...field}
                          value={option}
                          checked={field.value === option}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              />
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>
            <div className="mt-4">
              <label className="block font-sm mb-1 text-gray-900 font-semibold">
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
                  className="text-gray-900 px-4 py-2 font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                {isEditing && onDelete && (
                  <button
                    type="button"
                    onClick={() => onDelete(item.code)}
                    className="text-red-600 px-4 py-2 font-semibold cursor-pointer"
                  >
                    Excluir
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
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
