import { useRef, useState } from "react";
import { CloudUpload, CheckCheck, X } from "lucide-react";

const FileUpload = ({ onFileSelect }) => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFiles(file);
      onFileSelect && onFileSelect(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFiles(null);
    onFileSelect && onFileSelect(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <div
        className="border-2 border-dashed border-blue-400 bg-blue-50 rounded-xl p-6 text-center cursor-pointer"
        onClick={() => fileInputRef.current.click()}
      >
        <CloudUpload className="text-blue-500 mx-auto" size={40} />
        <p className="mt-2 font-semibold text-blue-500">
          Carregue suas imagens aqui
        </p>
        <p className="text-sm text-gray-600">Ou navegue pelos arquivos</p>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
      {selectedFiles && (
        <div className="border border-gray-300 mt-2 rounded-md p-2 flex items-center justify-between">
          <div className="flex items-center">
            <CheckCheck className="text-green-600" />
            <span className="text-sm text-gray-700 mx-2">
              {selectedFiles.name}
            </span>
          </div>
          <X
            className="cursor-pointer text-gray-700"
            onClick={handleRemoveFile}
          />
        </div>
      )}
    </div>
  );
};
export default FileUpload;
