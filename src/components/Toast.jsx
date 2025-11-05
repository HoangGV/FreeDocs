import React from 'react';

const Toast = ({ message }) => {
  return (
    <div className="fixed bottom-5 right-5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
      {message}
    </div>
  );
};

export default Toast;