import React from 'react';
import { Building2, Mail, Phone, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Building2 className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                EMERALD<span className="text-emerald-400">LAND</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Hệ sinh thái thông tin bất động sản cao cấp hàng đầu Việt Nam. Cung cấp dữ liệu minh bạch, phân tích thị trường chuẩn xác và giải pháp giao dịch nhà đất an toàn, tiện lợi.
            </p>
            <div className="pt-2 text-xs text-emerald-400 font-medium">
              Chủ đề thực hành Lab 2: Bất động sản | Màu chủ đạo: Emerald (#059669) | MSSV: 6651071098
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Phân khúc BĐS
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Căn hộ chung cư cao cấp</li>
              <li>Biệt thự nghỉ dưỡng & ven sông</li>
              <li>Nhà phố thương mại Shophouse</li>
              <li>Đất nền dự án & Thổ cư</li>
              <li>Penthouse & Duplex hạng sang</li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Thông tin liên hệ
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Tòa nhà Emerald Tower, Đại lộ Nguyễn Cơ Thạch, TP. Thủ Đức, TP.HCM</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>Hotline: 1900 6868 - (028) 3888 9999</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>support@emeraldland.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 EmeraldLand Real Estate. Bài thực hành Lab 2 - Môn Thiết kế Web.</p>
          <p className="flex items-center gap-1">
            Xây dựng với <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" aria-hidden="true" /> bởi Sinh viên MSSV 6651071098
          </p>
        </div>
      </div>
    </footer>
  );
};
