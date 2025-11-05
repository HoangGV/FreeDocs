import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { AppContext } from '../context/AppContext.jsx'; // Đã thêm .jsx

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localQuery, setLocalQuery] = useState(searchParams.get('q') || '');
  const { setQuery } = useContext(AppContext);

  // Cập nhật URL khi query thay đổi (sau một khoảng trễ)
  useEffect(() => {
    const handler = setTimeout(() => {
      // Chỉ cập nhật nếu query thực sự thay đổi
      const currentQuery = searchParams.get('q') || '';
      if (localQuery.trim() !== currentQuery) {
        const params = new URLSearchParams(searchParams);
        params.set('q', localQuery.trim());
        params.delete('pageToken'); // Quay về trang 1 khi tìm kiếm mới

        setSearchParams(params, { replace: true });
        setQuery(localQuery.trim());
      }
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [localQuery, searchParams, setSearchParams, setQuery]);

  // Cập nhật state cục bộ nếu URL thay đổi (ví dụ: nhấn nút 'về trang trước')
  useEffect(() => {
    const queryFromUrl = searchParams.get('q') || '';
    if (queryFromUrl !== localQuery) {
      setLocalQuery(queryFromUrl);
      setQuery(queryFromUrl);
    }
    // Lắng nghe sự thay đổi của searchParams
  }, [searchParams]);


  const handleSubmit = (e) => {
    e.preventDefault();
    // Kích hoạt tìm kiếm ngay lập tức khi nhấn Enter hoặc click
    const currentQuery = searchParams.get('q') || '';
    if (localQuery.trim() !== currentQuery) {
      const params = new URLSearchParams(searchParams);
      params.set('q', localQuery.trim());
      params.delete('pageToken');

      setSearchParams(params, { replace: true });
      setQuery(localQuery.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      {/* Quay lại style flex, overflow-hidden để nút sát mép */}
      <form 
        onSubmit={handleSubmit} 
        className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-300 dark:border-gray-700 overflow-hidden focus-within:ring-2 focus-within:ring-blue-400"
      >
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Nhập tên tài liệu cần tìm..."
          className="w-full p-3 pl-5 border-none focus:outline-none bg-transparent text-gray-900 dark:text-gray-100"
        />

      </form>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2 px-4">
        Tìm theo tên viết tắt hoặc tên đầy đủ của học phần, ví dụ: ktct (kinh tế chính trị)...
      </p>
    </div>
  );
};

export default SearchBar;