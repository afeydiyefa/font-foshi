import React, { useRef, useState } from 'react';
import { Upload, Check, AlertCircle } from 'lucide-react';

interface UploadButtonProps {
  onUpload: (file: File) => void;
}

export function UploadButton({ onUpload }: UploadButtonProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && isValidFontFile(file)) {
      handleFileUpload(file);
    } else {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    if (isValidFontFile(file)) {
      onUpload(file);
      setUploadStatus('success');
      setTimeout(() => setUploadStatus('idle'), 3000);
    } else {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 3000);
    }
  };

  const isValidFontFile = (file: File) => {
    const validTypes = ['font/ttf', 'font/otf', 'application/x-font-ttf', 'application/x-font-otf'];
    return validTypes.includes(file.type) || file.name.match(/\.(ttf|otf)$/i);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".ttf,.otf"
        onChange={handleChange}
      />
      
      <button
        onClick={() => inputRef.current?.click()}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
          ${dragActive 
            ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500 border-dashed' 
            : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-500 hover:text-indigo-600'
          }
        `}
      >
        {uploadStatus === 'idle' && (
          <>
            <Upload size={20} />
            <span>Upload Font</span>
          </>
        )}
        {uploadStatus === 'success' && (
          <>
            <Check size={20} className="text-green-500" />
            <span className="text-green-500">Uploaded!</span>
          </>
        )}
        {uploadStatus === 'error' && (
          <>
            <AlertCircle size={20} className="text-red-500" />
            <span className="text-red-500">Invalid file</span>
          </>
        )}
      </button>
    </div>
  );
}