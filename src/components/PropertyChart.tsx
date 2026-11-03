import React, { useMemo } from 'react';
import { useProperties } from '../context/PropertyContext';
import { formatCurrency } from '../utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Building, TrendingUp, DollarSign, Layers } from 'lucide-react';

const COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#047857', '#065f46'];

export const PropertyChart: React.FC = () => {
  const { properties } = useProperties();

  // Metrics calculation
  const metrics = useMemo(() => {
    const total = properties.length;
    if (total === 0) return { total: 0, avgPrice: 0, avgArea: 0, mostType: 'N/A' };

    const totalPrice = properties.reduce((acc, p) => acc + p.price, 0);
    const totalArea = properties.reduce((acc, p) => acc + p.area, 0);

    const typeCount: Record<string, number> = {};
    properties.forEach(p => {
      typeCount[p.propertyType] = (typeCount[p.propertyType] || 0) + 1;
    });

    let mostType = 'Căn hộ';
    let maxCount = 0;
    Object.entries(typeCount).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostType = type;
      }
    });

    return {
      total,
      avgPrice: totalPrice / total,
      avgArea: Math.round(totalArea / total),
      mostType,
    };
  }, [properties]);

  // Average price by district
  const districtData = useMemo(() => {
    const map: Record<string, { total: number; count: number }> = {};
    properties.forEach(p => {
      if (!map[p.district]) {
        map[p.district] = { total: 0, count: 0 };
      }
      map[p.district].total += p.price;
      map[p.district].count += 1;
    });

    return Object.entries(map)
      .map(([district, data]) => ({
        district,
        avgPriceBillions: +(data.total / data.count / 1000000000).toFixed(1), // Đơn vị Tỷ VNĐ
        count: data.count,
      }))
      .sort((a, b) => b.avgPriceBillions - a.avgPriceBillions)
      .slice(0, 7); // Top 7 khu vực
  }, [properties]);

  // Property type distribution
  const typeDistribution = useMemo(() => {
    const map: Record<string, number> = {};
    properties.forEach(p => {
      map[p.propertyType] = (map[p.propertyType] || 0) + 1;
    });

    return Object.entries(map).map(([name, value]) => ({
      name,
      value,
    }));
  }, [properties]);

  return (
    <div className="space-y-8">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Building className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tổng số BĐS</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">{metrics.total} căn</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Giá trung bình</p>
            <p className="text-lg font-bold text-emerald-700 mt-0.5">{formatCurrency(metrics.avgPrice)}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Diện tích TB</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">{metrics.avgArea} m²</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phân khúc nổi bật</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">{metrics.mostType}</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart: Giá TB theo quận */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="mb-4">
            <h3 className="font-bold text-gray-900 text-lg">Mức giá trung bình theo khu vực</h3>
            <p className="text-xs text-gray-500 mt-1">Đơn vị tính: Tỷ VNĐ / căn hộ hoặc nhà đất</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtData} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="district"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  formatter={(val: unknown) => {
                    const num = typeof val === 'number' ? val : 0;
                    return [`${num} Tỷ VNĐ`, 'Giá TB'];
                  }}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '0.75rem',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Bar dataKey="avgPriceBillions" fill="#059669" radius={[8, 8, 0, 0]} name="Giá trung bình (Tỷ VNĐ)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Cơ cấu loại hình */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="mb-4">
            <h3 className="font-bold text-gray-900 text-lg">Cơ cấu phân bổ loại hình BĐS</h3>
            <p className="text-xs text-gray-500 mt-1">Tỷ lệ các danh mục trong toàn bộ hệ thống</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }: { name?: string; percent?: number }) =>
                    `${name ?? ''} ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                >
                  {typeDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: unknown) => {
                    const num = typeof val === 'number' ? val : 0;
                    return [`${num} bất động sản`, 'Số lượng'];
                  }}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '0.75rem',
                    border: '1px solid #e2e8f0',
                  }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
