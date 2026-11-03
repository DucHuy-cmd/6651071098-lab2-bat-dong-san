import React from 'react';
import { useProperties } from '../context/PropertyContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useProperties();

  if (!toast.visible) return null;

  const bgStyles = {
    success: 'bg-emerald-600 text-white',
    error: 'bg-rose-600 text-white',
    info: 'bg-sky-600 text-white',
  }[toast.type];

  const Icon = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
  }[toast.type];

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl max-w-md animate-bounce-in transition-all"
    >
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${bgStyles}`}>
        <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
        <span className="text-sm font-medium">{toast.message}</span>
        <button
          type="button"
          onClick={hideToast}
          aria-label="Đóng thông báo"
          className="p-1 rounded-lg hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
