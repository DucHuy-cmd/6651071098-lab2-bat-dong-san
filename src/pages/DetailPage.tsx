import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import { formatCurrency } from '../utils';
import { ContactModal } from '../components/ContactModal';
import {
  ArrowLeft,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Calendar,
  ShieldCheck,
  Phone,
  Mail,
  Share2,
  Check,
  Building,
} from 'lucide-react';

export const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { properties, showToast } = useProperties();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <Building className="w-16 h-16 text-gray-300 mb-4" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-gray-800">Không tìm thấy bất động sản</h1>
        <p className="text-sm text-gray-500 mt-2 mb-6">Mã tin đăng không tồn tại hoặc đã bị xóa.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Quay về trang danh sách</span>
        </Link>
      </div>
    );
  }

  const galleryImages = property.images && property.images.length > 0 ? property.images : [property.image];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Đã sao chép liên kết bất động sản vào bộ nhớ tạm!', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Danh sách Bất động sản</span>
          </Link>

          <button
            type="button"
            onClick={handleShare}
            aria-label="Chia sẻ liên kết bất động sản"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-gray-700 hover:bg-white transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
            <span>Chia sẻ</span>
          </button>
        </div>

        {/* Title and Price Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white">
                  {property.propertyType}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white">
                  {property.status}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  Đăng ngày {property.createdAt}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                {property.title}
              </h1>
              <p className="flex items-center gap-1.5 text-sm text-gray-500 mt-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                <span>{property.location}, {property.district}, {property.city}</span>
              </p>
            </div>

            <div className="md:text-right shrink-0">
              <span className="block text-xs uppercase text-gray-500 font-semibold tracking-wider">
                Mức giá công khai
              </span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-700">
                {formatCurrency(property.price)}
              </span>
              <span className="block text-xs text-gray-500 mt-0.5">
                (~ {(property.price / property.area / 1000000).toFixed(1)} triệu / m²)
              </span>
            </div>
          </div>
        </div>

        {/* Gallery and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Visuals & Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image Showcase */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
              <div className="aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={galleryImages[activeImageIndex]}
                  alt={`Góc chụp chi tiết của ${property.title}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails row */}
              {galleryImages.length > 1 && (
                <div className="p-4 flex gap-3 overflow-x-auto bg-slate-50 border-t border-slate-100">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`Xem ảnh số ${idx + 1}`}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-emerald-600 ring-2 ring-emerald-500/30'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Ảnh thu nhỏ số ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Key Specs Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Thông số kỹ thuật căn hộ</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <Maximize2 className="w-6 h-6 text-emerald-600 mx-auto mb-1.5" aria-hidden="true" />
                  <span className="block text-xs text-gray-500">Diện tích</span>
                  <span className="text-base font-bold text-gray-900">{property.area} m²</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <BedDouble className="w-6 h-6 text-emerald-600 mx-auto mb-1.5" aria-hidden="true" />
                  <span className="block text-xs text-gray-500">Phòng ngủ</span>
                  <span className="text-base font-bold text-gray-900">{property.bedrooms} PN</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <Bath className="w-6 h-6 text-emerald-600 mx-auto mb-1.5" aria-hidden="true" />
                  <span className="block text-xs text-gray-500">Phòng tắm</span>
                  <span className="text-base font-bold text-gray-900">{property.bathrooms} WC</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto mb-1.5" aria-hidden="true" />
                  <span className="block text-xs text-gray-500">Pháp lý</span>
                  <span className="text-base font-bold text-emerald-700">Sổ hồng riêng</span>
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Mô tả chi tiết tài sản</h2>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Features Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Tiện ích đặc quyền</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Agent Info and Contact */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm sticky top-24">
              <div className="text-center mb-6">
                <img
                  src={property.agent.avatar}
                  alt={`Ảnh đại diện chuyên viên ${property.agent.name}`}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-4 border-emerald-100 shadow-md"
                />
                <h3 className="font-bold text-gray-900 text-lg">{property.agent.name}</h3>
                <p className="text-xs text-emerald-700 font-semibold">Chuyên viên Tư vấn Cấp cao</p>
              </div>

              <div className="space-y-3 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                  <span className="font-semibold text-gray-800">{property.agent.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                  <span className="truncate text-gray-800">{property.agent.email}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <span>Hẹn lịch xem nhà & Nhận báo giá</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Accessible Contact Modal */}
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        agent={property.agent}
        propertyTitle={property.title}
      />
    </div>
  );
};
