import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { Property, PropertyType } from '../types/property';
import initialPropertiesData from '../data/properties.json';

interface ToastState {
  message: string;
  type: 'success' | 'info' | 'error';
  visible: boolean;
}

interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => void;
  toast: ToastState;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  hideToast: () => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(initialPropertiesData as Property[]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000000000]); // 0 to 100 tỷ
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'success',
    visible: false,
  });

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4000);
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  const addProperty = useCallback((newPropData: Omit<Property, 'id' | 'createdAt'>) => {
    const newProperty: Property = {
      ...newPropData,
      id: `bds-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProperties(prev => [newProperty, ...prev]);
    showToast('Đăng tin bất động sản thành công! Tin đã được duyệt và hiển thị.', 'success');
  }, [showToast]);

  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      const matchSearch =
        searchQuery === '' ||
        prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.district.toLowerCase().includes(searchQuery.toLowerCase());

      const matchType = selectedType === 'all' || prop.propertyType === (selectedType as PropertyType);

      const matchDistrict = selectedDistrict === 'all' || prop.district === selectedDistrict;

      const matchPrice = prop.price >= priceRange[0] && prop.price <= priceRange[1];

      return matchSearch && matchType && matchDistrict && matchPrice;
    });
  }, [properties, searchQuery, selectedType, selectedDistrict, priceRange]);

  const handleSetSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleSetSelectedType = useCallback((type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
  }, []);

  const handleSetSelectedDistrict = useCallback((district: string) => {
    setSelectedDistrict(district);
    setCurrentPage(1);
  }, []);

  const handleSetPriceRange = useCallback((range: [number, number]) => {
    setPriceRange(range);
    setCurrentPage(1);
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        filteredProperties,
        searchQuery,
        setSearchQuery: handleSetSearchQuery,
        selectedType,
        setSelectedType: handleSetSelectedType,
        selectedDistrict,
        setSelectedDistrict: handleSetSelectedDistrict,
        priceRange,
        setPriceRange: handleSetPriceRange,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        addProperty,
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useProperties(): PropertyContextType {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
}
