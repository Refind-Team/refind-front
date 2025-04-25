import { useEffect, useState } from "react";

const Modal = ({ onClose = () => {}, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10);

    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      if (typeof onClose === "function") {
        onClose();
      }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-50" : "opacity-0"
        }`}
        onClick={handleClose}
      ></div>

      <div
        className={`bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-2xl mx-auto z-10 relative transition-all duration-300 max-h-[90vh] overflow-hidden ${
          isOpen
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform -translate-y-4"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
