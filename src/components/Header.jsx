import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md lg:px-12">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-4">
          {/* Bạn có thể thay thế bằng tệp logo.png trong thư mục public */}
          <img 
            src="/hoanggv-ndh.webp" 
            alt="Logo" 
            className="h-16 w-16 rounded-md object-cover"
            onError={(e) => { e.target.src = 'https://placehold.co/64x64/3b82f6/ffffff?text=Logo'; }}
          />
          <div>
            <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              FreeDocs DHS
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Tổng hợp bởi <a href='https://www.facebook.com/HoangLamRV/' target='_blank' >Hoàng GV</a>
            </p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;