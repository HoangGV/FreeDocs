import React from 'react';

// SỬA LỖI: Chuyển sang dùng class name của Font Awesome từ CDN (đã có trong index.html)
// thay vì import từ react-icons.

// Thêm link của bạn vào đây
const socialLinks = [
  // Lưu ý: 'fab' cho các icon thương hiệu (brands)
  { name: 'Website', icon: 'fas fa-globe', href: 'https://ndh.io.vn' },
  { name: 'Facebook', icon: 'fab fa-facebook', href: 'https://www.facebook.com/HoangGVVN' },
  { name: 'YouTube', icon: 'fab fa-youtube', href: 'https://www.youtube.com/@HoangGV' },
  { name: 'Pinterest', icon: 'fab fa-pinterest', href: 'https://www.pinterest.com/HoangGVVN/' },
  { name: 'GitHub', icon: 'fab fa-github', href: 'https://github.com/HoangGV' }
];

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner mt-12 py-8 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Vùng các liên kết icon */}
        <div className="flex justify-center space-x-6 mb-4">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <span className="sr-only">{item.name}</span>
              {/* Thay đổi từ component React <item.icon /> thành thẻ <i> */}
              <i className={`${item.icon} w-6 h-6`} aria-hidden="true" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-600 dark:text-gray-400">
          Copyright &copy; {new Date().getFullYear()} by NDH. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;