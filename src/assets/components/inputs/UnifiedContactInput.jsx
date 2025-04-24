import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { itemFormValidation } from "../../../validation/formSchemas";
import { useState, useEffect } from "react";

const UnifiedContactInput = ({ control, name, errors }) => {
  const [inputType, setInputType] = useState("phone");

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-900 mb-2"
      >
        Contato
      </label>

      <div className="mb-2">
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              checked={inputType === "phone"}
              onChange={() => setInputType("phone")}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span>Telefone</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              checked={inputType === "email"}
              onChange={() => setInputType("email")}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span>Email</span>
          </label>
        </div>
      </div>

      <Controller
        name={name}
        control={control}
        rules={itemFormValidation.contact}
        render={({ field }) => {
          useEffect(() => {
            if (
              inputType === "email" &&
              field.value &&
              !field.value.includes("@")
            ) {
              field.onChange("");
            }
            if (
              inputType === "phone" &&
              field.value &&
              field.value.includes("@")
            ) {
              field.onChange("");
            }
          }, [inputType]);

          return (
            <>
              {inputType === "email" ? (
                <input
                  type="email"
                  id={`${name}-email`}
                  placeholder="email@exemplo.com"
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                    errors[name] ? "border-red-400" : "border-gray-300"
                  }`}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  onBlur={field.onBlur}
                />
              ) : (
                <IMaskInput
                  id={`${name}-phone`}
                  mask="(00) 00000-0000"
                  definitions={{ 0: /[0-9]/ }}
                  placeholder="(00) 00000-0000"
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                    errors[name] ? "border-red-500" : "border-gray-300"
                  }`}
                  value={field.value || ""}
                  onAccept={(value) => field.onChange(value)}
                  onBlur={field.onBlur}
                />
              )}
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[name].message}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default UnifiedContactInput;
