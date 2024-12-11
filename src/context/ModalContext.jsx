import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null); // Konten modal
  const [modalProps, setModalProps] = useState({}); // Properti tambahan modal

  const openModal = (content, props = {}) => {
    setModalContent(content);
    setModalProps(props);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Sembunyikan modal
    setModalContent(null); // Reset konten modal
    setModalProps({}); // Reset properti modal
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalContent,
        modalProps,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
