import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaSpinner, FaArrowLeft } from 'react-icons/fa6'; // Đã sửa
import { useDrive } from '../hooks/useDrive'; // Đã sửa
import SearchBar from './SearchBar'; // Đã sửa
import FileGrid from './FileGrid'; // Đã sửa
import Pagination from './Pagination'; // Đã sửa
import { ROOT_FOLDER_ID } from '../config'; // Đã sửa

const FileBrowser = () => {
  const {
    files,
    isLoading,
    error,
    searchQuery,
    isRootFolder,
  } = useDrive();

  const [searchParams] = useSearchParams();
  const folderId = searchParams.get('folderId') || ROOT_FOLDER_ID;

  const getParentFolderLink = () => {
    // Logic này cần được cải tiến nếu muốn có breadcrumbs đầy đủ
    // Hiện tại, chỉ cho phép quay lại thư mục gốc
    const params = new URLSearchParams(searchParams);
    params.delete('folderId');
    params.delete('pageToken');
    return `?${params.toString()}`;
  };

  const renderHeader = () => {
    let title = 'Tài liệu công khai';
    if (searchQuery) {
      title = `Kết quả tìm kiếm cho "${searchQuery}"`;
    } else if (!isRootFolder) {
      title = 'Đang xem thư mục'; // Cần gọi API để lấy tên thư mục
    }

    return (
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2 sm:mb-0">
          {title}
        </h2>
        {!isRootFolder && (
          <Link
            to={getParentFolderLink()}
            className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <FaArrowLeft className="mr-2" />
            Quay lại
          </Link>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <SearchBar />
      {renderHeader()}

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="w-16 h-16 text-blue-500 animate-spin" /> {/* Đã thay icon loading */}
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900 border border-red-400 rounded-lg p-4">
          {error}
        </div>
      )}

      {!isLoading && !error && files.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <p>Không tìm thấy tài liệu nào.</p>
        </div>
      )}

      {!isLoading && !error && files.length > 0 && (
        <FileGrid files={files} />
      )}

      <Pagination />
    </div>
  );
};

export default FileBrowser;