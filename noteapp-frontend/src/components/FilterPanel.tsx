import React from 'react';
import { Filter as FilterIcon, ChevronDown } from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterPanelProps {
  isDark: boolean;
  options: FilterOptions;
  onFilterChange: (newOptions: FilterOptions) => void;
  universities: string[];
  departments: string[];
  years: string[];
  semesters: string[];
}

function FilterPanel({
  isDark,
  options,
  onFilterChange,
  universities,
  departments,
  years,
  semesters
}: FilterPanelProps) {
  const handleChange = (key: keyof FilterOptions, value: string) => {
    onFilterChange({ ...options, [key]: value });
  };

  return (
    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="flex items-center gap-2 mb-4">
        <FilterIcon size={20} className="text-blue-600" />
        <h3 className="font-semibold">Filtrele</h3>
      </div>

      <div className="space-y-4">
        {/* University Filter */}
        <div>
          <label className="block text-sm font-medium mb-1">Üniversite</label>
          <div className="relative">
            <select
              value={options.university || ''}
              onChange={(e) => handleChange('university', e.target.value)}
              className={`w-full pl-3 pr-10 py-2 rounded-lg appearance-none cursor-pointer
                ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border 
                ${isDark ? 'border-gray-600' : 'border-gray-200'}
                focus:ring-2 focus:ring-blue-500 outline-none`}
            >
              <option value="">Tümü</option>
              {universities.map((uni) => (
                <option key={uni} value={uni}>{uni}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Department Filter */}
        <div>
          <label className="block text-sm font-medium mb-1">Bölüm</label>
          <div className="relative">
            <select
              value={options.department || ''}
              onChange={(e) => handleChange('department', e.target.value)}
              className={`w-full pl-3 pr-10 py-2 rounded-lg appearance-none cursor-pointer
                ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border 
                ${isDark ? 'border-gray-600' : 'border-gray-200'}
                focus:ring-2 focus:ring-blue-500 outline-none`}
            >
              <option value="">Tümü</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Year Filter */}
        <div>
          <label className="block text-sm font-medium mb-1">Yıl</label>
          <div className="relative">
            <select
              value={options.year || ''}
              onChange={(e) => handleChange('year', e.target.value)}
              className={`w-full pl-3 pr-10 py-2 rounded-lg appearance-none cursor-pointer
                ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border 
                ${isDark ? 'border-gray-600' : 'border-gray-200'}
                focus:ring-2 focus:ring-blue-500 outline-none`}
            >
              <option value="">Tümü</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Semester Filter */}
        <div>
          <label className="block text-sm font-medium mb-1">Dönem</label>
          <div className="relative">
            <select
              value={options.semester || ''}
              onChange={(e) => handleChange('semester', e.target.value)}
              className={`w-full pl-3 pr-10 py-2 rounded-lg appearance-none cursor-pointer
                ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border 
                ${isDark ? 'border-gray-600' : 'border-gray-200'}
                focus:ring-2 focus:ring-blue-500 outline-none`}
            >
              <option value="">Tümü</option>
              {semesters.map((semester) => (
                <option key={semester} value={semester}>{semester}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-sm font-medium mb-1">Sıralama</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <select
                value={options.sortBy || 'date'}
                onChange={(e) => handleChange('sortBy', e.target.value)}
                className={`w-full pl-3 pr-10 py-2 rounded-lg appearance-none cursor-pointer
                  ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border 
                  ${isDark ? 'border-gray-600' : 'border-gray-200'}
                  focus:ring-2 focus:ring-blue-500 outline-none`}
              >
                <option value="date">Tarih</option>
                <option value="likes">Beğeni</option>
                <option value="downloads">İndirme</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" size={16} />
            </div>
            <div className="relative flex-1">
              <select
                value={options.sortOrder || 'desc'}
                onChange={(e) => handleChange('sortOrder', e.target.value)}
                className={`w-full pl-3 pr-10 py-2 rounded-lg appearance-none cursor-pointer
                  ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border 
                  ${isDark ? 'border-gray-600' : 'border-gray-200'}
                  focus:ring-2 focus:ring-blue-500 outline-none`}
              >
                <option value="desc">Azalan</option>
                <option value="asc">Artan</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;