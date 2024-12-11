import React, { useState } from "react";
import AppRoutes from "./routes";
import { Toaster } from "sonner";
import { ModalContextProvider } from "./context/ModalContext";
import Modal from "./components/Modal";

function App() {
  return (
    <>
      <Toaster position="top-left" />
      <ModalContextProvider>
        <Modal />
        <AppRoutes />
      </ModalContextProvider>
    </>
  );
}

export default App;
