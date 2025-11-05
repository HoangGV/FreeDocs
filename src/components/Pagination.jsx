import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { useDrive } from '../hooks/useDrive.js';

const Pagination = () => {
  const { pageToken, nextPageToken } = useDrive();
  const [searchParams] = useSearchParams();

  const getLink = (token) => {
    const params = new URLSearchParams(searchParams);
    if (token) {
      params.set('pageToken', token);
    } else {
      params.delete('pageToken');
    }
    return `?${params.toString()}`;
  };

  const hasPrev = !!pageToken;
  const hasNext = !!nextPageToken;

  return (
    <div className="mt-8 flex justify-center space-x-4">
      <PaginationButton
        to={getLink('')} // Trang trước là về trang đầu (pageToken rỗng)
        disabled={!hasPrev}
        label="Trang trước"
        icon={<FaArrowLeft className="mr-2" />}
      />
      <PaginationButton
        to={getLink(nextPageToken)}
        disabled={!hasNext}
        label="Trang sau"
        icon={<FaArrowRight className="ml-2" />}
        isNext
      />
    </div>
  );
};

const PaginationButton = ({ to, disabled, label, icon, isNext = false }) => {
  const baseClass = "flex items-center px-4 py-2 font-medium rounded-lg transition-colors duration-200";
  const activeClass = "bg-blue-600 text-white hover:bg-blue-700";
  const disabledClass = "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed";

  const content = (
    <>
      {!isNext && icon}
      {label}
      {isNext && icon}
    </>
  );

  if (disabled) {
    return (
      <span className={`${baseClass} ${disabledClass}`}>
        {content}
      </span>
    );
  }

  return (
    <Link to={to} className={`${baseClass} ${activeClass}`}>
      {content}
    </Link>
  );
};

export default Pagination;