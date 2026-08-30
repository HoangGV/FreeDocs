import React, { useState, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaFolder, FaFile, FaDownload, FaEye, FaLink, FaSpinner } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';
import { removeFileExtension } from '../api/driveApi';

const FileItem = ({ file }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [searchParams] = useSearchParams();
  const { showToast } = useContext(AppContext);

  const isFolder = file.mimeType === 'application/vnd.google-apps.folder';
  const fileName = removeFileExtension(file.name);

  const handleDownloadClick = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
    }, 5555);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(file.webContentLink).then(() => {
      showToast('Đã sao chép link!');
    }).catch(err => {
      console.error('Lỗi sao chép link:', err);
      showToast('Lỗi khi sao chép link.');
    });
  };

  const getFolderLink = () => {
    const params = new URLSearchParams(searchParams);
    params.set('folderId', file.id);
    params.delete('q'); 
    params.delete('pageToken');
    return `?${params.toString()}`;
  };

  const ActionButton = ({ id, href, onClick, icon, label, bgClass }) => (
    <a
      id={id}
      href={href}
      onClick={onClick}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className={`flex items-center justify-center px-3 py-2 rounded-lg text-white text-sm font-medium ${bgClass} hover:opacity-80 transition-opacity duration-200 cursor-pointer`}
      aria-label={label}
    >
      {icon}
    </a>
  );

  return (
    <> 
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        {/* Thumbnail/Icon Area */}
        <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center relative">
          {isFolder ? (
            <FaFolder className="w-16 h-16 text-blue-500" />
          ) : file.thumbnailLink ? (
            <img
              src={file.thumbnailLink}
              alt="Thumbnail"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={file.iconLink}
              alt="File Icon"
              className="w-16 h-16"
            />
          )}
        </div>

        {/* Content Area */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate" title={fileName}>
            {fileName}
          </h3>

          {/* Actions */}
          <div className="mt-4 flex space-x-2">
            {isFolder ? (
              <Link
                to={getFolderLink()}
                className="flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-white text-sm font-medium bg-blue-600 hover:bg-blue-700"
              >
                <FaFolder className="mr-1.5" /> Mở
              </Link>
            ) : (
              <>
                <ActionButton
                  href={file.webContentLink}
                  onClick={handleDownloadClick}
                  // id="download-popup"
                  // onClick={() => setShowPopup(true)}
                  icon={isDownloading ? <FaSpinner className="animate-spin" /> : <FaDownload />}
                  label="Tải xuống"
                  bgClass={isDownloading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600"}
                />
                <ActionButton
                  icon={<FaEye />}
                  label="Xem"
                  bgClass="bg-orange-500"
                  // bgClass="bg-orange-500 opacity-60 cursor-not-allowed"
                  // onClick={(e) => e.preventDefault()}
                  href={`https://drive.google.com/file/d/${file.id}`}
                />
                <ActionButton
                  onClick={handleCopyLink}
                  // onClick={(e) => e.preventDefault()}
                  icon={<FaLink />}
                  label="Sao chép link"
                  bgClass="bg-gray-600"
                  // bgClass="bg-gray-600 opacity-60 cursor-not-allowed"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full text-gray-800">
            <h3 className="text-xl font-bold mb-4 text-red-600 text-center">
              Thông báo
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-justify">
              Trang web tạm thời ngưng chức năng tải xuống trực tiếp. Để nhận tài liệu, bạn đọc vui lòng liên hệ qua email <a href="mailto:me@ndh.io.vn" className="text-blue-600 hover:underline font-semibold font-bold">me@ndh.io.vn</a> hoặc qua Facebook <a href="https://facebook.com/hoanglamrv" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold font-bold">Hoàng Lam</a>.
            </p>
            <p className="mb-6 text-sm text-center italic text-gray-600">
              Xin lỗi bạn đọc vì sự bất tiện này!
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowPopup(false)} // Click để đóng popup
                className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FileItem;