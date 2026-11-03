import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PropertyProvider } from './context/PropertyContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { ListPage } from './pages/ListPage';
import { DetailPage } from './pages/DetailPage';
import { StatsPage } from './pages/StatsPage';
import { PostPropertyPage } from './pages/PostPropertyPage';

export const App: React.FC = () => {
  return (
    <PropertyProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              {/* Route trang danh sách chính */}
              <Route path="/" element={<ListPage />} />

              {/* Route trang chi tiết: hỗ trợ cả /property/:id và /item/:id theo đúng yêu cầu thầy */}
              <Route path="/property/:id" element={<DetailPage />} />
              <Route path="/item/:id" element={<DetailPage />} />

              {/* Route tính năng bắt buộc 1: Thống kê Recharts */}
              <Route path="/stats" element={<StatsPage />} />

              {/* Route tính năng bắt buộc 2: Form đăng tin nhiều bước */}
              <Route path="/post-property" element={<PostPropertyPage />} />

              {/* Điều hướng mặc định nếu route không khớp */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
          <Toast />
        </div>
      </BrowserRouter>
    </PropertyProvider>
  );
};

export default App;
