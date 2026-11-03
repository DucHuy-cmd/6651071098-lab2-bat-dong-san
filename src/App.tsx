import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PropertyProvider } from './context/PropertyContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

// Code-splitting routes để tối ưu tốc độ tải trang (Lighthouse Performance >= 90)
const ListPage = lazy(() => import('./pages/ListPage').then(m => ({ default: m.ListPage })));
const DetailPage = lazy(() => import('./pages/DetailPage').then(m => ({ default: m.DetailPage })));
const StatsPage = lazy(() => import('./pages/StatsPage').then(m => ({ default: m.StatsPage })));
const PostPropertyPage = lazy(() => import('./pages/PostPropertyPage').then(m => ({ default: m.PostPropertyPage })));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
  </div>
);

export const App: React.FC = () => {
  return (
    <PropertyProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
          <Navbar />
          <div className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Route trang danh sách chính */}
                <Route path="/" element={<ListPage />} />

                {/* Route trang chi tiết */}
                <Route path="/property/:id" element={<DetailPage />} />
                <Route path="/item/:id" element={<DetailPage />} />

                {/* Route tính năng bắt buộc 1: Thống kê Recharts */}
                <Route path="/stats" element={<StatsPage />} />

                {/* Route tính năng bắt buộc 2: Form đăng tin nhiều bước */}
                <Route path="/post-property" element={<PostPropertyPage />} />

                {/* Điều hướng mặc định */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
          <Toast />
        </div>
      </BrowserRouter>
    </PropertyProvider>
  );
};

export default App;
