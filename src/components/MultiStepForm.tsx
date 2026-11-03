import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import { validateEmail, formatCurrency } from '../utils';
import type { PropertyType, PropertyStatus } from '../types/property';
import { Check, ArrowRight, ArrowLeft, Building2, MapPin, User, CheckCircle2 } from 'lucide-react';

interface FormData {
  // Bước 1: Thông tin cơ bản
  title: string;
  propertyType: PropertyType;
  status: PropertyStatus;
  price: number | '';
  area: number | '';

  // Bước 2: Vị trí & Chi tiết
  city: string;
  district: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  features: string[];
  description: string;

  // Bước 3: Thông tin liên hệ & Xác nhận
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  agreeTerms: boolean;
}

const AVAILABLE_FEATURES = [
  'Hồ bơi tràn viền',
  'Phòng gym quốc tế',
  'Bảo vệ 24/7',
  'Chỗ đậu ô tô',
  'Công viên cây xanh',
  'Sân tennis',
  'Gần trường quốc tế',
  'Sổ đỏ chính chủ',
  'Ban công view sông',
];

export const MultiStepForm: React.FC = () => {
  const { addProperty } = useProperties();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    propertyType: 'Căn hộ',
    status: 'Đang bán',
    price: '',
    area: '',
    city: 'TP. Hồ Chí Minh',
    district: '',
    location: '',
    bedrooms: 2,
    bathrooms: 2,
    features: ['Bảo vệ 24/7', 'Chỗ đậu ô tô'],
    description: '',
    agentName: '',
    agentPhone: '',
    agentEmail: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề không được để trống';
    } else if (formData.title.trim().length < 10) {
      newErrors.title = 'Tiêu đề cần tối thiểu 10 ký tự để người mua dễ tìm thấy';
    }

    if (formData.price === '' || Number(formData.price) <= 0) {
      newErrors.price = 'Giá bán phải là số dương lớn hơn 0';
    }

    if (formData.area === '' || Number(formData.area) <= 0) {
      newErrors.area = 'Diện tích phải là số dương lớn hơn 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.district.trim()) {
      newErrors.district = 'Vui lòng nhập hoặc chọn Quận/Huyện';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Vui lòng nhập địa chỉ chi tiết (tên đường, phường/xã)';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Vui lòng nhập mô tả tóm tắt bất động sản';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.agentName.trim()) {
      newErrors.agentName = 'Vui lòng nhập họ và tên người liên hệ';
    }

    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!formData.agentPhone.trim()) {
      newErrors.agentPhone = 'Vui lòng nhập số điện thoại liên hệ';
    } else if (!phoneRegex.test(formData.agentPhone.replace(/\s/g, ''))) {
      newErrors.agentPhone = 'Số điện thoại không hợp lệ (cần 10 chữ số)';
    }

    if (!formData.agentEmail.trim()) {
      newErrors.agentEmail = 'Vui lòng nhập email liên hệ';
    } else if (!validateEmail(formData.agentEmail)) {
      newErrors.agentEmail = 'Email không hợp lệ (ví dụ: contact@example.com)';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Bạn cần cam kết thông tin bất động sản là chính xác';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handlePrev = () => {
    setErrors({});
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleToggleFeature = (feature: string) => {
    setFormData(prev => {
      const exists = prev.features.includes(feature);
      return {
        ...prev,
        features: exists ? prev.features.filter(f => f !== feature) : [...prev.features, feature],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    // Construct new Property object
    addProperty({
      title: formData.title,
      price: Number(formData.price),
      location: formData.location,
      district: formData.district,
      city: formData.city,
      area: Number(formData.area),
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      propertyType: formData.propertyType,
      status: formData.status,
      featured: false,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
      ],
      description: formData.description,
      features: formData.features,
      agent: {
        name: formData.agentName,
        phone: formData.agentPhone,
        email: formData.agentEmail,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      },
    });

    navigate('/');
  };

  const steps = [
    { num: 1, label: 'Thông tin cơ bản', icon: Building2 },
    { num: 2, label: 'Vị trí & Tiện ích', icon: MapPin },
    { num: 3, label: 'Người liên hệ & Xác nhận', icon: User },
  ];

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
      {/* Step Indicator Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-0" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-600 transition-all duration-300 -z-0"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />

          {steps.map(step => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;

            return (
              <div key={step.num} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm transition-all shadow-md ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 scale-110'
                      : 'bg-white text-gray-400 border-2 border-slate-200'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" aria-hidden="true" /> : <Icon className="w-5 h-5" aria-hidden="true" />}
                </div>
                <span
                  className={`text-xs mt-2 font-medium hidden sm:block ${
                    isCurrent ? 'text-emerald-700 font-bold' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* BƯỚC 1: THÔNG TIN CƠ BẢN */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Bước 1: Thông tin cơ bản bất động sản</h2>
              <p className="text-sm text-gray-500 mt-1">
                Điền đầy đủ tiêu đề, loại hình, giá bán và diện tích chính xác để tăng cơ hội tìm thấy người mua.
              </p>
            </div>

            {/* Tiêu đề */}
            <div>
              <label htmlFor="property-title" className="block text-sm font-semibold text-gray-700 mb-1">
                Tiêu đề tin đăng <span className="text-rose-500">*</span>
              </label>
              <input
                id="property-title"
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ví dụ: Căn hộ cao cấp The Metropole Thủ Thiêm 2PN view sông Sài Gòn"
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                  errors.title
                    ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                    : 'border-slate-300 focus:ring-emerald-500'
                }`}
              />
              {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
            </div>

            {/* Loại hình & Trạng thái */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="property-type" className="block text-sm font-semibold text-gray-700 mb-1">
                  Loại hình bất động sản <span className="text-rose-500">*</span>
                </label>
                <select
                  id="property-type"
                  value={formData.propertyType}
                  onChange={e => setFormData({ ...formData, propertyType: e.target.value as PropertyType })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Căn hộ">Căn hộ chung cư</option>
                  <option value="Nhà phố">Nhà phố liền kề</option>
                  <option value="Biệt thự">Biệt thự cao cấp</option>
                  <option value="Shophouse">Shophouse thương mại</option>
                  <option value="Đất nền">Đất nền thổ cư</option>
                </select>
              </div>

              <div>
                <label htmlFor="property-status" className="block text-sm font-semibold text-gray-700 mb-1">
                  Nhu cầu giao dịch <span className="text-rose-500">*</span>
                </label>
                <select
                  id="property-status"
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value as PropertyStatus })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Đang bán">Cần bán</option>
                  <option value="Đang cho thuê">Cho thuê</option>
                  <option value="Sắp mở bán">Sắp mở bán</option>
                </select>
              </div>
            </div>

            {/* Giá & Diện tích */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="property-price" className="block text-sm font-semibold text-gray-700 mb-1">
                  Giá bán (VNĐ) <span className="text-rose-500">*</span>
                </label>
                <input
                  id="property-price"
                  type="number"
                  min="0"
                  step="1000000"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value === '' ? '' : Number(e.target.value) })}
                  placeholder="Ví dụ: 3500000000 (3.5 tỷ)"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    errors.price
                      ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                      : 'border-slate-300 focus:ring-emerald-500'
                  }`}
                />
                {errors.price && <p className="text-xs text-rose-500 mt-1">{errors.price}</p>}
                {formData.price !== '' && Number(formData.price) > 0 && (
                  <p className="text-xs text-emerald-600 font-medium mt-1">
                    Định dạng: {formatCurrency(Number(formData.price))}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="property-area" className="block text-sm font-semibold text-gray-700 mb-1">
                  Diện tích (m²) <span className="text-rose-500">*</span>
                </label>
                <input
                  id="property-area"
                  type="number"
                  min="0"
                  step="0.5"
                  value={formData.area}
                  onChange={e => setFormData({ ...formData, area: e.target.value === '' ? '' : Number(e.target.value) })}
                  placeholder="Ví dụ: 85.5"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    errors.area
                      ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                      : 'border-slate-300 focus:ring-emerald-500'
                  }`}
                />
                {errors.area && <p className="text-xs text-rose-500 mt-1">{errors.area}</p>}
              </div>
            </div>
          </div>
        )}

        {/* BƯỚC 2: VỊ TRÍ & TIỆN ÍCH */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Bước 2: Địa chỉ & Tiện ích chi tiết</h2>
              <p className="text-sm text-gray-500 mt-1">
                Cung cấp vị trí chính xác và các tiện ích nội ngoại khu nổi bật của bất động sản.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city-input" className="block text-sm font-semibold text-gray-700 mb-1">
                  Tỉnh / Thành phố <span className="text-rose-500">*</span>
                </label>
                <input
                  id="city-input"
                  type="text"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  placeholder="TP. Hồ Chí Minh"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="district-input" className="block text-sm font-semibold text-gray-700 mb-1">
                  Quận / Huyện <span className="text-rose-500">*</span>
                </label>
                <input
                  id="district-input"
                  type="text"
                  value={formData.district}
                  onChange={e => setFormData({ ...formData, district: e.target.value })}
                  placeholder="Ví dụ: TP. Thủ Đức, Quận 7..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    errors.district
                      ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                      : 'border-slate-300 focus:ring-emerald-500'
                  }`}
                />
                {errors.district && <p className="text-xs text-rose-500 mt-1">{errors.district}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="location-detail" className="block text-sm font-semibold text-gray-700 mb-1">
                Địa chỉ chi tiết (đường, khu đô thị) <span className="text-rose-500">*</span>
              </label>
              <input
                id="location-detail"
                type="text"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                placeholder="Ví dụ: Đường Nguyễn Văn Hưởng, Phường Thảo Điền"
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                  errors.location
                    ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                    : 'border-slate-300 focus:ring-emerald-500'
                }`}
              />
              {errors.location && <p className="text-xs text-rose-500 mt-1">{errors.location}</p>}
            </div>

            {/* Phòng ngủ & Phòng tắm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="bedrooms-count" className="block text-sm font-semibold text-gray-700 mb-1">
                  Số phòng ngủ
                </label>
                <input
                  id="bedrooms-count"
                  type="number"
                  min="0"
                  max="20"
                  value={formData.bedrooms}
                  onChange={e => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="bathrooms-count" className="block text-sm font-semibold text-gray-700 mb-1">
                  Số phòng tắm / vệ sinh
                </label>
                <input
                  id="bathrooms-count"
                  type="number"
                  min="0"
                  max="20"
                  value={formData.bathrooms}
                  onChange={e => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Tiện ích nổi bật */}
            <div>
              <span className="block text-sm font-semibold text-gray-700 mb-2">Tiện ích kèm theo</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {AVAILABLE_FEATURES.map(feat => {
                  const isChecked = formData.features.includes(feat);
                  return (
                    <button
                      key={feat}
                      type="button"
                      onClick={() => handleToggleFeature(feat)}
                      className={`text-left px-3 py-2 rounded-xl text-xs font-medium border transition-all flex items-center justify-between ${
                        isChecked
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-semibold'
                          : 'border-slate-200 text-gray-600 hover:border-slate-300'
                      }`}
                    >
                      <span>{feat}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mô tả chi tiết */}
            <div>
              <label htmlFor="description-textarea" className="block text-sm font-semibold text-gray-700 mb-1">
                Mô tả chi tiết <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="description-textarea"
                rows={3}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Mô tả hướng nhà, pháp lý, nội thất bàn giao..."
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                  errors.description
                    ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                    : 'border-slate-300 focus:ring-emerald-500'
                }`}
              />
              {errors.description && <p className="text-xs text-rose-500 mt-1">{errors.description}</p>}
            </div>
          </div>
        )}

        {/* BƯỚC 3: LIÊN HỆ & XÁC NHẬN */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Bước 3: Thông tin liên hệ & Xác nhận</h2>
              <p className="text-sm text-gray-500 mt-1">
                Điền thông tin môi giới/chủ nhà để khách mua có thể liên hệ trực tiếp.
              </p>
            </div>

            {/* Summary preview card */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-xs text-gray-700 space-y-1">
                <p className="font-bold text-emerald-900 text-sm">{formData.title}</p>
                <p>
                  <strong>Loại hình:</strong> {formData.propertyType} | <strong>Giá:</strong>{' '}
                  {formatCurrency(Number(formData.price))} | <strong>Diện tích:</strong> {formData.area} m²
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {formData.location}, {formData.district}, {formData.city}
                </p>
              </div>
            </div>

            {/* Họ tên */}
            <div>
              <label htmlFor="agent-name" className="block text-sm font-semibold text-gray-700 mb-1">
                Họ và tên người đăng tin <span className="text-rose-500">*</span>
              </label>
              <input
                id="agent-name"
                type="text"
                value={formData.agentName}
                onChange={e => setFormData({ ...formData, agentName: e.target.value })}
                placeholder="Ví dụ: Nguyễn Văn Hưng"
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                  errors.agentName
                    ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                    : 'border-slate-300 focus:ring-emerald-500'
                }`}
              />
              {errors.agentName && <p className="text-xs text-rose-500 mt-1">{errors.agentName}</p>}
            </div>

            {/* Số điện thoại & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="agent-phone" className="block text-sm font-semibold text-gray-700 mb-1">
                  Số điện thoại liên hệ <span className="text-rose-500">*</span>
                </label>
                <input
                  id="agent-phone"
                  type="tel"
                  value={formData.agentPhone}
                  onChange={e => setFormData({ ...formData, agentPhone: e.target.value })}
                  placeholder="0912345678"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    errors.agentPhone
                      ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                      : 'border-slate-300 focus:ring-emerald-500'
                  }`}
                />
                {errors.agentPhone && <p className="text-xs text-rose-500 mt-1">{errors.agentPhone}</p>}
              </div>

              <div>
                <label htmlFor="agent-email" className="block text-sm font-semibold text-gray-700 mb-1">
                  Email liên hệ <span className="text-rose-500">*</span>
                </label>
                <input
                  id="agent-email"
                  type="email"
                  value={formData.agentEmail}
                  onChange={e => setFormData({ ...formData, agentEmail: e.target.value })}
                  placeholder="hung.nguyen@realestate.vn"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    errors.agentEmail
                      ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                      : 'border-slate-300 focus:ring-emerald-500'
                  }`}
                />
                {errors.agentEmail && <p className="text-xs text-rose-500 mt-1">{errors.agentEmail}</p>}
              </div>
            </div>

            {/* Agree Terms Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={e => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="w-4 h-4 mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  Tôi cam kết toàn bộ thông tin bất động sản cung cấp là chính xác, không vi phạm quy hoạch pháp lý và đồng ý với điều khoản sử dụng của hệ thống.
                </span>
              </label>
              {errors.agreeTerms && <p className="text-xs text-rose-500 mt-1.5">{errors.agreeTerms}</p>}
            </div>
          </div>
        )}

        {/* Action Buttons Footer */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-200 mt-8">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-gray-700 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Quay lại</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 shadow-md shadow-emerald-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <span>Tiếp tục</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/40 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <Check className="w-4 h-4" aria-hidden="true" />
              <span>Xác nhận Đăng tin</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
