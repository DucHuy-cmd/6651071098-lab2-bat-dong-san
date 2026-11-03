import React, { useState, useEffect, useMemo } from 'react';
import { useProperties } from '../context/PropertyContext';
import { debounce } from '../utils';
import { Search, RefreshCcw } from 'lucide-react';
import type { PropertyType } from '../types/property';

export const PropertyFilter: React.FC = () => {
  const {
    properties,
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedDistrict,
    setSelectedDistrict,
    setPriceRange,
  } = useProperties();

  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Debounced search handler with 300ms delay
  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setSearchQuery(value), 300),
    [setSearchQuery]
  );

  useEffect(() => {
    debouncedSetSearch(localSearch);
  }, [localSearch, debouncedSetSearch]);

  // Extract unique districts
  const districts = useMemo(() => {
    const list = Array.from(new Set(properties.map(p => p.district))).sort();
    return list;
  }, [properties]);

  const propertyTypes: PropertyType[] = ['Căn hộ', 'Nhà phố', 'Biệt thự', 'Shophouse', 'Đất nền'];

  const handleReset = () => {
    setLocalSearch('');
    setSearchQuery('');
    setSelectedType('all');
    setSelectedDistrict('all');
    setPriceRange([0, 100000000000]);
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input with Debounce */}
        <div className="relative">
          <label htmlFor="search-input" className="block text-xs font-semibold text-gray-700 mb-1.5">
            Tìm kiếm từ khóa
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              id="search-input"
              type="text"
              value={localSearch}
              onChange={e => setLocalSearch(e.target.value)}
              placeholder="Tên dự án, địa chỉ..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
            />
          </div>
        </div>

        {/* Property Type Dropdown */}
        <div>
          <label htmlFor="type-select" className="block text-xs font-semibold text-gray-700 mb-1.5">
            Loại hình bất động sản
          </label>
          <select
            id="type-select"
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
          >
            <option value="all">Tất cả loại hình</option>
            {propertyTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* District Dropdown */}
        <div>
          <label htmlFor="district-select" className="block text-xs font-semibold text-gray-700 mb-1.5">
            Khu vực / Quận huyện
          </label>
          <select
            id="district-select"
            value={selectedDistrict}
            onChange={e => setSelectedDistrict(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
          >
            <option value="all">Tất cả khu vực</option>
            {districts.map(dist => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Actions / Reset */}
        <div className="flex items-end gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="w-full py-2 px-3 text-sm font-medium text-gray-600 bg-slate-100 hover:bg-slate-200 hover:text-gray-900 rounded-xl transition-colors flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <RefreshCcw className="w-4 h-4" aria-hidden="true" />
            <span>Đặt lại bộ lọc</span>
          </button>
        </div>
      </div>
    </div>
  );
};
