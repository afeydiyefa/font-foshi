import React from 'react';
import { Download, Info } from 'lucide-react';
import type { Font } from '../types';

interface FontCardProps {
  font: Font;
  onDownload: (font: Font) => void;
}

export function FontCard({ font, onDownload }: FontCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{font.family}</h3>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500 capitalize">{font.category}</p>
              {font.script === 'thaana' && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-600">
                  ދިވެހި
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => onDownload(font)}
            className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
            aria-label="Download font"
          >
            <Download size={20} />
          </button>
        </div>
        
        <div className="h-24 flex items-center justify-center bg-gray-50 rounded-lg mb-4">
          <p 
            style={{ fontFamily: font.family }} 
            className="text-2xl text-center px-4"
            dir={font.script === 'thaana' ? 'rtl' : 'ltr'}
          >
            {font.preview}
          </p>
        </div>

        {font.description && (
          <div className="mb-4 flex items-start gap-2">
            <Info size={16} className="text-gray-400 mt-1 flex-shrink-0" />
            <p className="text-sm text-gray-600">{font.description}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {font.variants.map((variant) => (
            <span
              key={variant}
              className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
            >
              {variant}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}