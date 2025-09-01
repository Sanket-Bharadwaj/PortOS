import React from 'react';
import { Power, RotateCcw, Lock } from 'lucide-react';

interface AppleMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: 'shutdown' | 'restart' | 'lock') => void;
}

export const AppleMenu: React.FC<AppleMenuProps> = ({ isOpen, onClose, onAction }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" onClick={onClose}>
      <div 
        className="absolute top-8 left-4 liquid-glass rounded-xl shadow-xl border border-white/20 min-w-[200px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="py-2">
          <button
            onClick={() => onAction('lock')}
            className="w-full px-4 py-2 text-left hover:bg-white/10 flex items-center gap-3 text-md3-on-surface transition-colors"
          >
            <Lock className="w-4 h-4" />
            <span>Lock Screen</span>
          </button>
          
          <div className="my-1 border-t border-white/10"></div>
          
          <button
            onClick={() => onAction('restart')}
            className="w-full px-4 py-2 text-left hover:bg-white/10 flex items-center gap-3 text-md3-on-surface transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart...</span>
          </button>
          
          <button
            onClick={() => onAction('shutdown')}
            className="w-full px-4 py-2 text-left hover:bg-white/10 flex items-center gap-3 text-md3-on-surface transition-colors"
          >
            <Power className="w-4 h-4" />
            <span>Shut Down...</span>
          </button>
        </div>
      </div>
    </div>
  );
};