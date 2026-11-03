import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <nav
      className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-slate-200 mt-8"
      aria-label="Phân trang danh sách bất động sản"
    >
      {/* Information text */}
      <div className="text-sm text-gray-600">
        Đang hiển thị{' '}
        <span className="font-semibold text-gray-900">{startItem}</span> -{' '}
        <span className="font-semibold text-gray-900">{endItem}</span> trong tổng số{' '}
        <span className="font-semibold text-emerald-700">{totalItems}</span> bất động sản
      </div>

      {/* Page controls */}
      <div className="flex items-center gap-1.5">
        {/* Previous page button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Trang trước"
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-300 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-9 h-9 flex items-center justify-center text-gray-400 select-none"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isCurrent = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              aria-label={`Trang ${pageNum}`}
              aria-current={isCurrent ? 'page' : undefined}
              className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                isCurrent
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-bold'
                  : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next page button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Trang tiếp theo"
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-300 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
};
