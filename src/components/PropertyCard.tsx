import React from 'react';
import { Link } from 'react-router-dom';
import type { Property } from '../types/property';
import { formatCurrency, truncateText } from '../utils';
import { MapPin, BedDouble, Bath, Maximize2, ArrowRight } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={property.image}
          alt={`Hình ảnh thực tế của bất động sản: ${property.title}`}
          loading="lazy"
          decoding="async"
          width="400"
          height="250"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-md">
            {property.propertyType}
          </span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-md ${
            property.status === 'Đang bán'
              ? 'bg-amber-500 text-white'
              : property.status === 'Đang cho thuê'
              ? 'bg-blue-600 text-white'
              : 'bg-purple-600 text-white'
          }`}>
            {property.status}
          </span>
        </div>

        {/* Price tag badge */}
        <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md text-emerald-400 font-bold px-3 py-1.5 rounded-xl text-base shadow-lg border border-slate-700/50">
          {formatCurrency(property.price)}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="font-bold text-gray-900 text-base group-hover:text-emerald-700 transition-colors line-clamp-2 min-h-[3rem]">
          <Link
            to={`/property/${property.id}`}
            className="focus:outline-none focus:underline"
            title={property.title}
          >
            {truncateText(property.title, 65)}
          </Link>
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2 mb-4">
          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs text-gray-600 mb-4 bg-slate-50/60 rounded-xl px-2">
          <div className="flex items-center gap-1.5 justify-center">
            <BedDouble className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
            <span>{property.bedrooms > 0 ? `${property.bedrooms} PN` : 'Mặt bằng'}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-center border-x border-slate-200">
            <Bath className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
            <span>{property.bathrooms > 0 ? `${property.bathrooms} WC` : 'Tự do'}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-center">
            <Maximize2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
            <span>{property.area} m²</span>
          </div>
        </div>

        {/* Agent and Action */}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={property.agent.avatar}
              alt={`Ảnh đại diện môi giới ${property.agent.name}`}
              className="w-7 h-7 rounded-full object-cover border border-emerald-200"
            />
            <span className="text-xs font-medium text-gray-700 truncate max-w-[100px]">
              {property.agent.name}
            </span>
          </div>

          <Link
            to={`/property/${property.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all"
            aria-label={`Xem chi tiết thông tin bất động sản ${property.title}`}
          >
            <span>Chi tiết</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};
