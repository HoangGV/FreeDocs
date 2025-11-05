import React, { createContext, useState } from 'react';
import Toast from '../components/Toast'; // SỬA LỖI: Đã gỡ bỏ .jsx

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 2000);
  };

  return (
    <AppContext.Provider value={{ showToast }}>
      {children}
      {toastMessage && <Toast message={toastMessage} />}
    </AppContext.Provider>
  );
};