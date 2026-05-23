import React from 'react';
import { FileText, Image, Trash2, ShieldAlert } from 'lucide-react';

export const FilePreview = ({ files = [], onRemove }) => {
  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isPDF = (file) => file.type === 'application/pdf' || file.name.endsWith('.pdf');

  return (
    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
      {files.map((file, idx) => (
        <div
          key={`${file.name}-${idx}`}
          className="flex items-center justify-between p-3.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors duration-150"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-teal-400">
              {isPDF(file) ? (
                <FileText className="w-5 h-5" />
              ) : (
                <Image className="w-5 h-5" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate max-w-[200px] md:max-w-[320px] text-white/90">
                {file.name}
              </p>
              <p className="text-xs text-white/40">{formatSize(file.size)}</p>
            </div>
          </div>

          <button
            onClick={() => onRemove(idx)}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/10 text-white/40 hover:text-red-400 flex items-center justify-center border border-white/5 hover:border-red-500/20 transition-all duration-150 cursor-pointer"
            title="Remove File"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilePreview;
