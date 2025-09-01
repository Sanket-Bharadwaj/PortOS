import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

interface App {
  name: string;
  icon: string;
  color: string;
}

interface SpotlightSearchProps {
  apps: App[];
  onAppSelect: (appName: string, title: string) => void;
  onClose: () => void;
}

export const SpotlightSearch: React.FC<SpotlightSearchProps> = ({
  apps,
  onAppSelect,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredApps.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredApps[selectedIndex]) {
          handleAppSelect(filteredApps[selectedIndex]);
        }
        break;
    }
  };

  const handleAppSelect = (app: App) => {
    switch (app.name) {
      case 'GitHub':
        window.open('https://github.com/Sanket-Bharadwaj', '_blank');
        break;
      case 'LinkedIn':
        window.open('https://www.linkedin.com/in/sanket-bharadwaj', '_blank');
        break;
      default:
        onAppSelect(app.name, app.name);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-start justify-center pt-32">
      <div className="liquid-glass rounded-3xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden chromatic-aberration">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <Search className="w-6 h-6 text-white/80" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search apps and files..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-xl font-light"
            />
          </div>
        </div>

        {filteredApps.length > 0 ? (
          <div className="max-h-96 overflow-y-auto">
            {filteredApps.map((app, index) => (
              <button
                key={app.name}
                onClick={() => handleAppSelect(app)}
                className={`w-full p-4 flex items-center gap-4 hover:bg-white/10 transition-colors text-left ${
                  index === selectedIndex ? 'bg-white/10' : ''
                }`}
              >
                <div 
                  className="w-10 h-10 text-white"
                  dangerouslySetInnerHTML={{ __html: app.icon }}
                />
                <span className="text-white font-medium text-lg">{app.name}</span>
              </button>
            ))}
          </div>
        ) : query && (
          <div className="p-8 text-center text-white/60">
            No results found for "{query}"
          </div>
        )}
        
        {/* Footer */}
        <div className="flex items-center justify-center p-4 border-t border-white/10">
          <div className="flex items-center gap-6 text-xs text-white/60">
            <span>↑↓ Navigate</span>
            <span>↵ Open</span>
            <span>⎋ Close</span>
          </div>
        </div>
      </div>
    </div>
  );
};