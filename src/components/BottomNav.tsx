import React from 'react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  savedCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  savedCount = 0,
}) => {
  // If in dedicated full-bleed AR mode, the AR bottom dock takes precedence
  if (currentScreen === 'ar') {
    return null;
  }

  const navItems: { id: Screen; label: string; icon: string; count?: number }[] = [
    { id: 'explore', label: 'Explore', icon: 'explore' },
    { id: 'planner', label: 'Planner', icon: 'view_in_ar' },
    { id: 'shop', label: 'Shop', icon: 'chair' },
    { id: 'saved', label: 'Saved', icon: 'bookmark_border', count: savedCount },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl border-t border-outline-variant/30 shadow-[0_-4px_20px_rgba(30,27,24,0.05)] transition-all">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-16 px-space-sm">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 flex flex-col items-center justify-center h-12 transition-all relative ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[22px] transition-transform active:scale-90"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {item.icon}
                </span>
                {item.count && item.count > 0 ? (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-primary text-on-primary text-[9px] font-bold flex items-center justify-center">
                    {item.count}
                  </span>
                ) : null}
              </div>
              <span className="font-label-sm text-label-sm tracking-wide mt-0.5">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-primary mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
