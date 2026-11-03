import React from 'react';
import { useProperties } from '../context/PropertyContext';
import { PropertyCard } from '../components/PropertyCard';
import { Pagination } from '../components/Pagination';
import { PropertyFilter } from '../components/PropertyFilter';
import { Building2, Sparkles } from 'lucide-react';

export const ListPage: React.FC = () => {
  const { filteredProperties, currentPage, setCurrentPage, itemsPerPage } = useProperties();

  // Slice properties for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header Section */}
      <section className="bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Hệ thống phân phối Bất động sản cao cấp số 1 Việt Nam</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Khám phá Không gian sống Đẳng cấp & Thịnh vượng
          </h1>
          <p className="mt-4 text-base sm:text-lg text-emerald-100/80 max-w-2xl mx-auto font-light">
            Tuyển chọn hơn 24 danh mục biệt thự, căn hộ cao cấp, shophouse thương mại và đất nền pháp lý chuẩn chỉnh.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-20">
        {/* Filter component */}
        <PropertyFilter />

        {/* Results Count Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" aria-hidden="true" />
            <h2 className="text-xl font-bold text-gray-900">Danh mục Bất động sản</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
              {filteredProperties.length} kết quả
            </span>
          </div>
        </div>

        {/* Property Grid: Responsive đúng 3 breakpoint:
            - Mobile (< 640px): 1 cột
            - Tablet (640 - 1024px): 2 cột
            - Desktop (> 1024px): 3 cột
        */}
        {currentProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {currentProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination Component (Tính năng 1) */}
            <Pagination
              currentPage={currentPage}
              totalItems={filteredProperties.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" aria-hidden="true" />
            <h3 className="text-lg font-bold text-gray-800">Không tìm thấy bất động sản phù hợp</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
              Hãy thử thay đổi từ khóa tìm kiếm hoặc đặt lại bộ lọc để xem các tài sản khác.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
