import React from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import FileBrowser from './components/FileBrowser.jsx';
import { AppProvider } from './context/AppContext.jsx';

function App() {
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6 lg:px-32">
          <FileBrowser />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;