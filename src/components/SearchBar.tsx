import React from 'react';
import { Search } from 'lucide-react';
import type { SearchFilters } from '../types';

interface SearchBarProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onSearch: (query: string) => void;
}

export function SearchBar({ filters, onFilterChange, onSearch }: SearchBarProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search fonts..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white/80 backdrop-blur-sm"
        />
      </div>
      
      <div className="flex flex-wrap gap-4">
        <select
          value={filters.script}
          onChange={(e) => onFilterChange({ ...filters, script: e.target.value })}
          className="px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white/80 backdrop-blur-sm"
        >
          <option value="">All Scripts</option>
          <option value="thaana">Thaana (ދިވެހި)</option>
          <option value="latin">Latin (ABC)</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          className="px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white/80 backdrop-blur-sm"
        >
          <option value="">All Categories</option>
          <optgroup label="Thaana">
            <option value="thaana-serif">Thaana Serif</option>
            <option value="thaana-sans">Thaana Sans</option>
            <option value="thaana-modern">Thaana Modern</option>
            <option value="thaana-display">Thaana Display</option>
          </optgroup>
          <optgroup label="Latin">
            <option value="serif">Serif</option>
            <option value="sans-serif">Sans Serif</option>
            <option value="monospace">Monospace</option>
          </optgroup>
        </select>

        <select
          value={filters.variant}
          onChange={(e) => onFilterChange({ ...filters, variant: e.target.value })}
          className="px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white/80 backdrop-blur-sm"
        >
          <option value="">All Weights</option>
          <option value="regular">Regular</option>
          <option value="bold">Bold</option>
          <option value="light">Light</option>
          <option value="italic">Italic</option>
        </select>
      </div>
    </div>
  );
}