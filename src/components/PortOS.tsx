import React, { useState, useEffect, useRef } from 'react';
import { Desktop } from './Desktop';
import { TopBar } from './TopBar';
import { Dock } from './Dock';
import { WindowManager } from './WindowManager';
import { Notifications } from './Notifications';
import { SpotlightSearch } from './SpotlightSearch';
import { ContextMenu } from './ContextMenu';
import { NotificationPanel } from './NotificationPanel';
import { MobileWarning } from './MobileWarning';
import { RebootScreen } from './RebootScreen';
import { LockScreen } from './LockScreen';
import { useTheme } from './ThemeProvider';

export interface WindowState {
  id: string;
  app: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface NotificationState {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: number;
}

export const PortOS: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [notifications, setNotifications] = useState<NotificationState[]>([]);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [highestZIndex, setHighestZIndex] = useState(1000);
  const [rebootScreenVisible, setRebootScreenVisible] = useState(false);
  const [lockScreenVisible, setLockScreenVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme, setTheme } = useTheme();

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set dark theme as default
  useEffect(() => {
    if (theme !== 'dark') {
      setTheme('dark');
    }
  }, [theme, setTheme]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === '/') {
        e.preventDefault();
        setSpotlightOpen(true);
      }
      if (e.key === 'Escape') {
        setSpotlightOpen(false);
        setContextMenu(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close context menu on click
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const openWindow = (app: string, title: string) => {
    const existingWindow = windows.find(w => w.app === app);
    
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        setWindows(prev => prev.map(w => 
          w.id === existingWindow.id 
            ? { ...w, isMinimized: false, zIndex: highestZIndex + 1 }
            : w
        ));
        setHighestZIndex(prev => prev + 1);
      } else {
        focusWindow(existingWindow.id);
      }
      return;
    }

    const newWindow: WindowState = {
      id: `${app}-${Date.now()}`,
      app,
      title,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      position: { 
        x: Math.max(50, window.innerWidth / 2 - 400), 
        y: Math.max(50, window.innerHeight / 2 - 300) 
      },
      size: { width: 800, height: 600 },
      zIndex: highestZIndex + 1,
    };

    setWindows(prev => [...prev, newWindow]);
    setHighestZIndex(prev => prev + 1);
    
    addNotification('System', `${title} opened`, 'info');
  };

  const closeWindow = (windowId: string) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
  };

  const minimizeWindow = (windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMinimized: true } : w
    ));
  };

  const maximizeWindow = (windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const focusWindow = (windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId 
        ? { ...w, zIndex: highestZIndex + 1 }
        : w
    ));
    setHighestZIndex(prev => prev + 1);
  };

  const updateWindowPosition = (windowId: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, position } : w
    ));
  };

  const updateWindowSize = (windowId: string, size: { width: number; height: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, size } : w
    ));
  };

  const addNotification = (title: string, message: string, type: NotificationState['type'] = 'info') => {
    const notification: NotificationState = {
      id: `notification-${Date.now()}`,
      title,
      message,
      type,
      timestamp: Date.now(),
    };

    setNotifications(prev => [...prev, notification]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  const removeNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleAppleMenuAction = (action: 'shutdown' | 'restart' | 'lock') => {
    switch (action) {
      case 'restart':
        setRebootScreenVisible(true);
        break;
      case 'shutdown':
        window.close();
        break;
      case 'lock':
        addNotification('System', 'Screen locked', 'info');
        break;
    }
  };

  const handleRebootComplete = () => {
    setRebootScreenVisible(false);
    // Reset all windows and state
    setWindows([]);
    setNotifications([]);
    setSpotlightOpen(false);
    setContextMenu(null);
    setNotificationPanelOpen(false);
    addNotification('System', 'System restarted', 'success');
  };

  const HEROICONS = {
    portfolio: `<svg data-slot="icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z"></path></svg>`,
    browser: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" /></svg>`,
    github: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.464-1.11-1.464-.907-.62.069-.608.069-.608 1.003.07 1.532 1.031 1.532 1.031.892 1.528 2.341 1.086 2.91.831.091-.647.349-1.086.633-1.337-2.22-.252-4.555-1.11-4.555-4.945 0-1.091.39-1.984 1.029-2.682-.103-.252-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.6 9.6 0 012.503.337c1.91-1.294 2.748-1.025 2.748-1.025.546 1.376.202 2.395.1 2.647.64.698 1.028 1.591 1.028 2.682 0 3.842-2.337 4.69-4.564 4.937.359.309.678.915.678 1.846 0 1.333-.012 2.409-.012 2.737 0 .268.18.578.688.48A10.007 10.007 0 0022 12c0-5.52-4.48-10-10-10z"/></svg>`,
    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4v-6a6 6 0 016-6zM2 9h4v12H2zM4 4a2 2 0 100 4 2 2 0 000-4z"/></svg>`,
    calculator: `<svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"></path></svg>`,
    camera: `<svg data-slot="icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z"></path><path clip-rule="evenodd" fill-rule="evenodd" d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"></path></svg>`,
    notes: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h10M7 16h10"/><rect x="4" y="4" width="16" height="16" rx="2" ry="2" stroke-width="1.8"/></svg>`,
    settings: `<svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path></svg>`,
    aboutme: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
    gallery: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>`,
    terminal: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>`
  };

  const apps = [
    { name: 'Portfolio', icon: HEROICONS.portfolio, color: 'bg-md3-primary' },
    { name: 'Browser', icon: HEROICONS.browser, color: 'bg-md3-secondary' },
    { name: 'GitHub', icon: HEROICONS.github, color: 'bg-gray-800' },
    { name: 'LinkedIn', icon: HEROICONS.linkedin, color: 'bg-blue-600' },
    { name: 'Calculator', icon: HEROICONS.calculator, color: 'bg-md3-primary-container' },
    { name: 'Camera', icon: HEROICONS.camera, color: 'bg-md3-secondary-container' },
    { name: 'Notes', icon: HEROICONS.notes, color: 'bg-yellow-500' },
    { name: 'Settings', icon: HEROICONS.settings, color: 'bg-gray-600' },
    { name: 'About Me', icon: HEROICONS.aboutme, color: 'bg-md3-primary' },
    { name: 'Gallery', icon: HEROICONS.gallery, color: 'bg-purple-600' },
    { name: 'Terminal', icon: HEROICONS.terminal, color: 'bg-gray-900' },
  ];

  // Show mobile warning on small screens
  if (isMobile) {
    return <MobileWarning />;
  }

  return (
    <div className={`portos-container ${theme}`}>
      <div 
        className="fixed inset-0 bg-desktop transition-colors duration-500"
        onContextMenu={handleContextMenu}
      >
        <Desktop onIconClick={(name) => openWindow(name, name)} />
        
        <TopBar 
          currentTime={currentTime}
          onSpotlightClick={() => setSpotlightOpen(true)}
          onNotificationClick={() => setNotificationPanelOpen(!notificationPanelOpen)}
          onAppleMenuAction={handleAppleMenuAction}
        />
        
        <WindowManager
          windows={windows}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onFocus={focusWindow}
          onUpdatePosition={updateWindowPosition}
          onUpdateSize={updateWindowSize}
        />
        
        <Dock 
          apps={apps}
          onAppClick={openWindow}
          windows={windows}
        />
        
        <Notifications 
          notifications={notifications}
          onRemove={removeNotification}
        />
        
        {spotlightOpen && (
          <SpotlightSearch 
            apps={apps}
            onAppSelect={openWindow}
            onClose={() => setSpotlightOpen(false)}
          />
        )}
        
        {contextMenu && (
          <ContextMenu 
            position={contextMenu}
            onClose={() => setContextMenu(null)}
            onAction={(action) => {
              switch (action) {
                case 'lock':
                  setLockScreenVisible(true);
                  break;
                case 'restart':
                  setRebootScreenVisible(true);
                  break;
                case 'shutdown':
                  window.close();
                  break;
                case 'new-note':
                  openWindow('Notes', 'Notes');
                  break;
                case 'open-settings':
                  openWindow('Settings', 'Settings');
                  break;
                case 'change-wallpaper':
                  openWindow('Settings', 'Settings');
                  break;
                case 'empty-trash':
                  addNotification('System', 'Trash emptied', 'success');
                  break;
                default:
                  addNotification('System', `${action} executed`, 'info');
              }
            }}
          />
        )}
        
        <NotificationPanel 
          isOpen={notificationPanelOpen}
          onClose={() => setNotificationPanelOpen(false)}
        />
      </div>
      
      {/* Credit Footer */}
      <div className="credit-footer">
        Made by Sanket Bharadwaj
      </div>
      
      <RebootScreen 
        isVisible={rebootScreenVisible}
        onComplete={handleRebootComplete}
      />
      
      <LockScreen 
        isVisible={lockScreenVisible}
        onUnlock={() => setLockScreenVisible(false)}
      />
    </div>
  );
};