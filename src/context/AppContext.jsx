import React, { createContext, useState } from "react";
import Toast from "../components/Toast";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- Logic cho Toast (Giữ nguyên) ---
  const [toastMessage, setToastMessage] = useState("");
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 2000);
  };

  // --- THÊM MỚI: Logic cho Query Search ---
  const [query, setQuery] = useState("");

  // --- Gộp tất cả các giá trị vào 'value' ---
  const contextValue = {
    showToast, // Của toast
    query, // Của search
    setQuery, // Của search
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
      {toastMessage && <Toast message={toastMessage} />}
    </AppContext.Provider>
  );
};
