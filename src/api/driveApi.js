import { API_KEY } from '../config.js';

function buildSearchQuery(searchQuery, folderId) {
  const trimmedQuery = searchQuery.trim();
  const escapedQuery = trimmedQuery.replace(/'/g, "\\'");

  let q = `'${folderId}' in parents and trashed=false`;

  if (trimmedQuery) {
    q += ` and name contains '${escapedQuery}'`;
  }
  return q;
}

export async function getFiles(folderId, searchQuery = '', pageToken = '') {
  try {
    const query = buildSearchQuery(searchQuery, folderId);
    let url = `https://www.googleapis.com/drive/v3/files?key=${API_KEY}&q=${encodeURIComponent(query)}&fields=nextPageToken,files(id,name,mimeType,thumbnailLink,webContentLink,iconLink,modifiedTime)&pageSize=12&orderBy=modifiedTime desc`;

    if (pageToken) {
      url += `&pageToken=${pageToken}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Gọi API thất bại: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error('Lỗi trong getFiles:', e);
    throw e; // Ném lỗi ra để useDrive xử lý
  }
}

// Hàm này không còn dùng trong React, nhưng logic được giữ lại
export function removeFileExtension(fileName) {
  if (!fileName.includes('.')) {
    return fileName;
  }
  return fileName.split('.').slice(0, -1).join('.');
}