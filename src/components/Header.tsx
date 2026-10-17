import React from 'react';
import { Screen } from '../types';
import { LOGO_URL, USER_AVATAR } from '../data/mockData';

interface HeaderProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onOpenNotifications?: () => void;
  onOpenSearch?: () => void;
  onShare?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenNotifications,
  onOpenSearch,
  onShare,
}) => {
  const isDetailOrAr = currentScreen === 'product' || currentScreen === 'ar';

  const getTitle = () => {
    switch (currentScreen) {
      case 'explore':
        return 'Explore';
      case 'planner':
        return 'Planner';
      case 'shop':
        return 'Shop';
      case 'saved':
        return 'Saved';
      case 'product':
      case 'ar':
        return 'Product Details';
      default:
        return 'Atelier';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_12px_rgba(30,27,24,0.03)] border-b border-outline-variant/20 transition-all">
      <div className="max-w-2xl mx-auto h-16 px-margin-mobile flex items-center justify-between gap-space-sm">
        {/* Left Side */}
        <div className="flex items-center gap-space-sm min-w-0">
          {isDetailOrAr ? (
            <button
              aria-label="Go back"
              onClick={() => onNavigate('shop')}
              className="w-11 h-11 -ml-2 flex items-center justify-center text-on-surface hover:text-primary transition-colors rounded-full active:bg-surface-container"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          ) : (
            <img
              alt="Atelier Logo"
              className="h-8 w-auto object-contain shrink-0 cursor-pointer"
              src={LOGO_URL}
              onClick={() => onNavigate('explore')}
            />
          )}

          <div className="flex flex-col min-w-0">
            {isDetailOrAr ? (
              <h1 className="font-headline-sm text-headline-sm tracking-tight text-on-surface truncate">
                Product Details
              </h1>
            ) : (
              <>
                <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface truncate">
                  Atelier
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider truncate">
                  {getTitle()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-space-xs shrink-0">
          {isDetailOrAr ? (
            <button
              aria-label="Share"
              onClick={onShare}
              className="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors rounded-full active:bg-surface-container"
            >
              <span className="material-symbols-outlined text-[22px]">share</span>
            </button>
          ) : (
            <>
              <button
                aria-label="Search Inspiration"
                onClick={onOpenSearch}
                className="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors rounded-full active:bg-surface-container"
              >
                <span className="material-symbols-outlined text-[22px]">search</span>
              </button>
              <button
                aria-label="Notifications"
                onClick={onOpenNotifications}
                className="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors rounded-full active:bg-surface-container relative"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              </button>
            </>
          )}

          <div className="w-11 h-11 flex items-center justify-center">
            <img
              alt="Profile Elena"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-container-high hover:ring-primary transition-all cursor-pointer"
              src={USER_AVATAR}
              onClick={() => onNavigate('saved')}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
