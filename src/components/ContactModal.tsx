import React, { useEffect, useRef, useState } from 'react';
import type { AgentInfo } from '../types/property';
import { validateEmail } from '../utils';
import { useProperties } from '../context/PropertyContext';
import { X, Send, Phone, Mail } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: AgentInfo;
  propertyTitle: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  agent,
  propertyTitle,
}) => {
  const { showToast } = useProperties();
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Trap focus and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Focus first input upon opening
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 50);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Vui lòng nhập họ và tên';
    if (!phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
    if (!email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    showToast(`Đã gửi yêu cầu tư vấn thành công! Chuyên viên ${agent.name} sẽ liên hệ lại bạn sớm nhất.`, 'success');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-scale-up"
      >
        {/* Close Button with aria-label */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng cửa sổ tư vấn"
          className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <img
            src={agent.avatar}
            alt={`Ảnh chân dung môi giới ${agent.name}`}
            className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
          />
          <div>
            <h2 id="modal-title" className="text-lg font-bold text-gray-900">
              Yêu cầu tư vấn Bất động sản
            </h2>
            <p className="text-xs text-gray-500">Chuyên viên phụ trách: <span className="font-semibold text-emerald-700">{agent.name}</span></p>
          </div>
        </div>

        <p className="text-xs text-gray-600 bg-slate-50 p-3 rounded-xl border border-slate-200 mb-5">
          Quan tâm: <strong className="text-gray-900">{propertyTitle}</strong>
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="customer-name" className="block text-xs font-semibold text-gray-700 mb-1">
              Họ và tên của bạn <span className="text-rose-500">*</span>
            </label>
            <input
              ref={firstInputRef}
              id="customer-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Nguyễn Văn A"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="customer-phone" className="block text-xs font-semibold text-gray-700 mb-1">
                Số điện thoại <span className="text-rose-500">*</span>
              </label>
              <input
                id="customer-phone"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="0912345678"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="customer-email" className="block text-xs font-semibold text-gray-700 mb-1">
                Email nhận tài liệu <span className="text-rose-500">*</span>
              </label>
              <input
                id="customer-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="customer-note" className="block text-xs font-semibold text-gray-700 mb-1">
              Lời nhắn hoặc thời gian hẹn xem nhà
            </label>
            <textarea
              id="customer-note"
              rows={2}
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Tôi muốn xem nhà trực tiếp vào cuối tuần này..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>Gửi yêu cầu chuyên viên tư vấn ngay</span>
            </button>
          </div>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
            {agent.phone}
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
            {agent.email}
          </span>
        </div>
      </div>
    </div>
  );
};
