import React from 'react';
import { MultiStepForm } from '../components/MultiStepForm';
import { PlusCircle } from 'lucide-react';

export const PostPropertyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
            <PlusCircle className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
            <span>Tính năng bắt buộc: Form nhiều bước có validate đầy đủ</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Đăng tin Rao bán / Cho thuê Bất động sản
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Quy trình đăng tin 3 bước nhanh chóng và dễ dàng. Tin đăng của bạn sẽ ngay lập tức xuất hiện trên trang chủ sau khi hoàn tất.
          </p>
        </div>

        {/* Multi-step Form Component */}
        <MultiStepForm />
      </div>
    </div>
  );
};
