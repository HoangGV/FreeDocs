import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getFiles } from '../api/driveApi.js';
import { ROOT_FOLDER_ID } from '../config.js';

export const useDrive = () => {
  const [searchParams] = useSearchParams();

  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);

  const folderId = searchParams.get('folderId') || ROOT_FOLDER_ID;
  const searchQuery = searchParams.get('q') || '';
  const pageToken = searchParams.get('pageToken') || '';

  const fetchFiles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getFiles(folderId, searchQuery, pageToken);
      setFiles(data.files || []);
      setNextPageToken(data.nextPageToken || null);
    } catch (err) {
      setError('Lỗi khi tải tài liệu, vui lòng thử lại. ' + err.message);
      setFiles([]);
      setNextPageToken(null);
    } finally {
      setIsLoading(false);
    }
  }, [folderId, searchQuery, pageToken]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]); // Phụ thuộc vào hàm đã được useCallback

  return {
    files,
    isLoading,
    error,
    nextPageToken,
    folderId,
    searchQuery,
    pageToken,
    isRootFolder: folderId === ROOT_FOLDER_ID
  };
};