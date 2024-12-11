import React, { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

const Modal = () => {
  const { isModalOpen, modalContent, modalProps, closeModal } =
    useContext(ModalContext);

  if (!isModalOpen) return null; // Jangan render modal jika tidak aktif

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
        {/* Header Modal */}
        {modalProps.header && (
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold">{modalProps.header}</h2>
          </div>
        )}

        {/* Konten Modal */}
        <div className="p-6">{modalContent}</div>

        {/* Footer Modal */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          {/* <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Close
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
