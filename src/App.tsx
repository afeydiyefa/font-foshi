import React, { useState } from 'react';
import { Download, Type } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { FontCard } from './components/FontCard';
import { UploadButton } from './components/UploadButton';
import { fonts as defaultFonts } from './data/fonts';
import type { Font, SearchFilters } from './types';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [fonts, setFonts] = useState(defaultFonts);
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    variant: '',
    script: ''
  });

  const filteredFonts = fonts.filter(font => {
    const matchesSearch = font.family.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filters.category || font.category === filters.category;
    const matchesVariant = !filters.variant || font.variants.includes(filters.variant);
    const matchesScript = !filters.script || font.script === filters.script;
    return matchesSearch && matchesCategory && matchesVariant && matchesScript;
  });

  const handleUpload = async (file: File) => {
    try {
      // In a real app, this would process the font file and extract metadata
      const newFont: Font = {
        id: `custom-${Date.now()}`,
        family: file.name.replace(/\.(otf|ttf)$/i, ''),
        category: 'custom',
        variants: ['regular'],
        preview: 'Custom Font Preview',
        description: 'Custom uploaded font'
      };
      
      setFonts(prev => [...prev, newFont]);
    } catch (error) {
      console.error('Error processing font:', error);
    }
  };

  const handleDownload = (font: Font) => {
    // In a real app, this would trigger the font download
    alert(`Downloading ${font.family}...`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Gradient Background */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-90" />
      
      {/* Header */}
      <header className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/10 backdrop-blur-lg rounded-xl">
                <Type className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Font Foshi</h1>
                <p className="text-sm text-white/80">ފޮންޓް ފޮށި</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <UploadButton onUpload={handleUpload} />
              <div className="flex items-center space-x-2 text-sm text-white/80 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-lg">
                <Download size={16} />
                <span>{fonts.length} fonts available</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <SearchBar
            filters={filters}
            onFilterChange={setFilters}
            onSearch={setSearchQuery}
          />
        </div>

        {/* Font Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFonts.map(font => (
            <FontCard
              key={font.id}
              font={font}
              onDownload={handleDownload}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredFonts.length === 0 && (
          <div className="text-center py-12">
            <Type className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No fonts found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            Created with ❤️ by Font Foshi Team
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;