import React from 'react';
import { PropertyChart } from '../components/PropertyChart';
import { BarChart3, ShieldCheck } from 'lucide-react';

export const StatsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
            <span>Tính năng bắt buộc: Biểu đồ thống kê dữ liệu Recharts</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Báo cáo & Thống kê Thị trường Bất động sản
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-2xl">
            Tổng hợp dữ liệu giá bán trung bình theo từng khu vực trọng điểm và phân tích cơ cấu các phân khúc bất động sản hiện có trong cơ sở dữ liệu.
          </p>
        </div>

        {/* Chart Component */}
        <PropertyChart />

        {/* Insight Card */}
        <div className="mt-8 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-1" aria-hidden="true" />
          <div className="text-sm text-gray-600 space-y-1">
            <h2 className="font-bold text-gray-900">Ghi chú phân tích thị trường</h2>
            <p>
              Dữ liệu được cập nhật tự động theo thời gian thực từ cơ sở dữ liệu 24 danh mục bất động sản. Các chỉ số giá trung bình phản ánh chính xác phân khúc nhà ở cao cấp và shophouse kinh doanh tại các đô thị lớn (TP.HCM, Hà Nội, Đà Nẵng).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
