import React, { useState } from 'react';
import { Screen, Product } from '../types';
import {
  AR_PASSTHROUGH_BG,
  SWATCH_OAT_TEXTURE,
  SUGGESTED_PAIRING_IMG,
  SHOP_HERO_PRODUCT,
} from '../data/mockData';

interface ARViewProps {
  onNavigate: (screen: Screen) => void;
  onAddToCart: (product: Product, tone?: string) => void;
  onOpenCart: () => void;
  onSaveToRoomPlan: () => void;
}

export const ARView: React.FC<ARViewProps> = ({
  onNavigate,
  onAddToCart,
  onOpenCart,
  onSaveToRoomPlan,
}) => {
  const [gridVisible, setGridVisible] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(142);
  const [selectedSwatch, setSelectedSwatch] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [scale, setScale] = useState(1);
  const [pairedAdded, setPairedAdded] = useState(false);

  const swatches = [
    { id: 0, name: 'Oat Bouclé', color: '#f4ede4', isLight: true },
    { id: 1, name: 'Terracotta Velvet', color: '#994525', isLight: false },
    { id: 2, name: 'Charcoal Woven', color: '#2a2624', isLight: false },
    { id: 3, name: 'Olive Chenille', color: '#556252', isLight: false },
  ];

  const getCompassDirection = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const idx = Math.round(deg / 45) % 8;
    return `${deg}° ${directions[idx]}`;
  };

  const handleCapture = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2400);
  };

  const handleRotate = () => {
    setRotationAngle((prev) => (prev + 30) % 360);
  };

  const handleResetOrientation = () => {
    setRotationAngle(0);
    setScale(1);
  };

  const handleAddPairing = () => {
    onAddToCart({
      id: 'nami-table',
      name: 'Nami Travertine Table',
      price: 490,
      category: 'tables',
      image: SUGGESTED_PAIRING_IMG,
    });
    setPairedAdded(true);
    setTimeout(() => setPairedAdded(false), 2000);
  };

  const handleOrderNow = () => {
    onAddToCart(SHOP_HERO_PRODUCT, swatches[selectedSwatch].name);
    onOpenCart();
  };

  return (
    <div className="flex flex-col w-full relative select-none pb-12">
      {/* AR Viewport Canvas Container */}
      <div className="relative w-full aspect-[9/16] max-h-[820px] rounded-b-[2.5rem] overflow-hidden bg-inverse-surface shadow-2xl flex flex-col justify-between border-b border-outline-variant/30">
        {/* Photorealistic Camera Passthrough with 3D furniture */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none transition-transform duration-300"
          style={{
            backgroundImage: `url('${AR_PASSTHROUGH_BG}')`,
            filter:
              selectedSwatch === 1
                ? 'sepia(0.25) saturate(1.2)'
                : selectedSwatch === 2
                ? 'brightness(0.9) contrast(1.1)'
                : selectedSwatch === 3
                ? 'hue-rotate(60deg) saturate(0.9)'
                : 'none',
          }}
        />

        {/* Soft AR Gradient Vignette & Mesh Depth Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-transparent to-inverse-surface/40 pointer-events-none" />

        {/* Camera shutter flash effect */}
        {isFlashing && (
          <div className="absolute inset-0 bg-white z-50 animate-out fade-out duration-200 pointer-events-none" />
        )}

        {/* Spatial Ground Plane Mesh Graphic (LiDAR / Tracking visualization) */}
        {gridVisible && (
          <svg
            className="absolute inset-x-0 bottom-24 h-80 w-full opacity-60 pointer-events-none"
            fill="none"
            viewBox="0 0 400 300"
          >
            <defs>
              <radialGradient cx="50%" cy="50%" id="meshGrad" r="50%">
                <stop offset="0%" stopColor="#ffb59b" stopOpacity="0.6" />
                <stop offset="60%" stopColor="#b85d3b" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#b85d3b" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Perspective Ground Grid Lines */}
            <ellipse cx="200" cy="210" fill="url(#meshGrad)" rx="150" ry="46" />
            <ellipse
              className="animate-pulse"
              cx="200"
              cy="210"
              rx="120"
              ry="36"
              stroke="#ffb59b"
              strokeDasharray="3 4"
              strokeWidth="1"
            />
            <ellipse cx="200" cy="210" rx="60" ry="18" stroke="#ffdbcf" strokeWidth="1.2" />
            {/* Perspective Ray Guides */}
            <line
              opacity="0.4"
              stroke="#ffb59b"
              strokeDasharray="2 3"
              strokeWidth="0.8"
              x1="200"
              x2="60"
              y1="210"
              y2="280"
            />
            <line
              opacity="0.4"
              stroke="#ffb59b"
              strokeDasharray="2 3"
              strokeWidth="0.8"
              x1="200"
              x2="340"
              y1="210"
              y2="280"
            />
            <line
              opacity="0.4"
              stroke="#ffb59b"
              strokeDasharray="2 3"
              strokeWidth="0.8"
              x1="200"
              x2="200"
              y1="210"
              y2="285"
            />
            {/* Surface Anchor Nodes */}
            <circle cx="140" cy="205" fill="#ffdbcf" r="2.5" />
            <circle cx="260" cy="205" fill="#ffdbcf" r="2.5" />
            <circle cx="200" cy="192" fill="#ffb59b" r="3" />
            <circle cx="200" cy="228" fill="#ffb59b" r="3" />
          </svg>
        )}

        {/* Interactive Spatial Bounding Box & Live Measurement Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="relative w-72 h-80 mt-12 flex flex-col items-center justify-center transition-transform"
            style={{ transform: `scale(${scale})` }}
          >
            {/* Vertical Height Leader Line */}
            <div className="absolute -left-3 top-8 bottom-16 flex items-center">
              <div className="h-full w-px bg-primary-fixed-dim/70 flex flex-col justify-between items-center">
                <span className="w-2 h-0.5 bg-primary-fixed-dim" />
                <span className="w-2 h-0.5 bg-primary-fixed-dim" />
              </div>
              <div className="ml-2 px-2 py-0.5 rounded-full bg-inverse-surface/80 backdrop-blur-md text-surface-bright font-label-sm text-label-sm shadow-md whitespace-nowrap">
                Back: 29.5" H · Seat: 16.5"
              </div>
            </div>

            {/* Footprint Dimension Tag */}
            <div className="absolute -bottom-2 px-3 py-1 rounded-full bg-inverse-surface/85 backdrop-blur-md shadow-lg flex items-center gap-1.5 pointer-events-auto">
              <span
                className="material-symbols-outlined text-secondary-container text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span className="font-label-sm text-label-sm text-surface-bright tracking-wide">
                34" W × 32" D
              </span>
              <span className="w-1 h-1 rounded-full bg-surface-variant/40" />
              <span className="font-label-sm text-label-sm text-secondary-fixed">
                2.4 ft to wall
              </span>
            </div>

            {/* 360° Tactile Rotation Ring */}
            <div
              onClick={handleRotate}
              title="Click or drag to rotate 3D chair"
              className="absolute -bottom-6 w-56 h-14 rounded-full flex items-center justify-center pointer-events-auto cursor-pointer hover:scale-105 active:scale-95 transition-all"
            >
              <svg className="w-full h-full" viewBox="0 0 200 50">
                <ellipse
                  cx="100"
                  cy="25"
                  fill="none"
                  rx="88"
                  ry="18"
                  stroke="rgba(255, 219, 207, 0.4)"
                  strokeDasharray="4 6"
                  strokeWidth="1.5"
                />
                {/* Active Angle Pointer */}
                <circle
                  cx={100 + 88 * Math.cos((rotationAngle * Math.PI) / 180)}
                  cy={25 + 18 * Math.sin((rotationAngle * Math.PI) / 180)}
                  fill="#ffb59b"
                  r="4.5"
                  stroke="#33302c"
                  strokeWidth="1.5"
                />
              </svg>
              <div className="absolute -bottom-3 px-2 py-0.5 rounded bg-surface-container-lowest/90 text-on-surface font-label-sm text-label-sm shadow-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px] text-primary">
                  rotate_right
                </span>
                <span>{getCompassDirection(rotationAngle)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top AR Mode HUD & Sensors Status */}
        <div className="relative z-20 pt-4 px-margin-mobile flex flex-col gap-2">
          <div className="flex items-center justify-between gap-space-xs">
            {/* Scale Lock Indicator */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-inverse-surface/75 backdrop-blur-md text-surface-bright shadow-md">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping" />
              <span className="font-label-sm text-label-sm tracking-wider uppercase">
                Scale 1:1 Locked
              </span>
            </div>

            {/* Quick Capture / Recalibrate Actions */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setGridVisible(!gridVisible)}
                className={`h-9 px-3 rounded-full bg-inverse-surface/75 backdrop-blur-md text-surface-bright text-label-md font-label-md flex items-center gap-1 hover:bg-inverse-surface transition-colors active:scale-95 shadow-md ${
                  !gridVisible ? 'opacity-70' : ''
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-primary-fixed-dim">
                  grid_4x4
                </span>
                <span>{gridVisible ? 'Grid On' : 'Grid Off'}</span>
              </button>
              <button
                aria-label="Reset orientation"
                onClick={handleResetOrientation}
                className="w-9 h-9 rounded-full bg-inverse-surface/75 backdrop-blur-md text-surface-bright flex items-center justify-center hover:bg-inverse-surface transition-colors active:scale-95 shadow-md"
              >
                <span className="material-symbols-outlined text-[18px]">screen_rotation_alt</span>
              </button>
            </div>
          </div>

          {/* Real-Time Ambient Lighting Toast */}
          <div className="self-center flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/85 backdrop-blur-md text-on-surface shadow-sm">
            <span className="material-symbols-outlined text-[15px] text-tertiary">wb_sunny</span>
            <span className="font-label-sm text-label-sm">Natural Light: 4,200K Golden Warmth</span>
            <span className="text-outline text-[10px]">·</span>
            <span className="font-label-sm text-label-sm text-primary">Shadow Synced</span>
          </div>
        </div>

        {/* Middle Floating Interaction Gesture Prompt */}
        <div className="relative z-10 self-center px-4 py-2 rounded-full bg-inverse-surface/80 backdrop-blur-lg shadow-xl flex items-center gap-2 mb-2 animate-bounce">
          <span className="material-symbols-outlined text-primary-fixed text-[18px]">pinch</span>
          <span className="font-label-md text-label-md text-surface-bright">
            Pinch to scale · Drag to reposition · Rotate base
          </span>
        </div>

        {/* Bottom AR Controls & Finish Selection Tray */}
        <div className="relative z-20 pb-4 px-margin-mobile flex flex-col gap-3">
          {/* Material Swatch Floating Dock */}
          <div className="p-2.5 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl shadow-lg flex items-center justify-between gap-3 border border-outline-variant/30">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-surface-container-high overflow-hidden shrink-0 border border-outline-variant/20">
                <img
                  className="w-full h-full object-cover"
                  src={SWATCH_OAT_TEXTURE}
                  alt="Oat Boucle Swatch"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-headline-sm text-on-surface truncate">
                    Kanso Lounge
                  </span>
                  <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">
                    In AR
                  </span>
                </div>
                <span className="font-metric-price text-body-sm text-primary font-semibold">
                  $890
                </span>
              </div>
            </div>

            {/* Material Variant Dots */}
            <div className="flex items-center gap-1.5 shrink-0">
              {swatches.map((swatch, idx) => {
                const isSelected = selectedSwatch === idx;
                return (
                  <button
                    key={swatch.id}
                    onClick={() => setSelectedSwatch(idx)}
                    title={swatch.name}
                    className={`relative w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-transform active:scale-95 ${
                      isSelected ? 'ring-2 ring-primary scale-105' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: swatch.color }}
                  >
                    {isSelected && (
                      <span
                        className={`material-symbols-outlined text-[14px] ${
                          swatch.isLight ? 'text-primary' : 'text-white'
                        }`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Room Snapshot Shutter & Actions Bar */}
          <div className="grid grid-cols-4 gap-2 items-center">
            {/* Swap Piece */}
            <button
              onClick={() => onNavigate('planner')}
              className="col-span-1 h-12 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-md text-label-md flex flex-col items-center justify-center gap-0.5 shadow-md active:bg-surface-container transition-colors border border-outline-variant/20"
            >
              <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
              <span className="text-[10px] leading-none">Swap Piece</span>
            </button>

            {/* Room Fit Diagnostic */}
            <div className="col-span-2 h-12 px-3 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md shadow-md flex items-center gap-2 border border-outline-variant/20">
              <div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                  Spatial Fit: Optimal
                </span>
                <span className="font-body-sm text-body-sm text-secondary truncate">
                  Walkway clearance OK
                </span>
              </div>
            </div>

            {/* AR Shutter Photo Button */}
            <button
              aria-label="Take high resolution room photo"
              onClick={handleCapture}
              className="col-span-1 h-12 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md text-on-surface flex flex-col items-center justify-center gap-0.5 shadow-md active:scale-95 transition-transform hover:bg-surface-container border border-outline-variant/20"
            >
              <span className="material-symbols-outlined text-[20px] text-primary">photo_camera</span>
              <span className="text-[10px] leading-none font-label-sm">Capture</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lower Section: Specifications, Spatial Insights & Checkout Actions */}
      <div className="w-full px-margin-mobile py-space-md flex flex-col gap-space-md max-w-2xl mx-auto">
        {/* Spatial Insights Bento Tile */}
        <div className="w-full p-space-md rounded-2xl bg-surface-container-low shadow-sm flex flex-col gap-space-sm border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">
                architecture
              </span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">
                Spatial Diagnostics
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
              True 100% Volume
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="p-2.5 rounded-xl bg-surface-container-lowest flex flex-col border border-outline-variant/20">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Footprint</span>
              <span className="font-label-lg text-label-lg text-on-surface mt-0.5">7.5 sq ft</span>
              <span className="font-body-sm text-[11px] text-secondary">Fits standard rug</span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-lowest flex flex-col border border-outline-variant/20">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Doorways</span>
              <span className="font-label-lg text-label-lg text-on-surface mt-0.5">Passes 30"+</span>
              <span className="font-body-sm text-[11px] text-secondary">Standard entry</span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-lowest flex flex-col border border-outline-variant/20">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Lighting</span>
              <span className="font-label-lg text-label-lg text-on-surface mt-0.5">High Sun</span>
              <span className="font-body-sm text-[11px] text-secondary">UV treated fiber</span>
            </div>
          </div>
        </div>

        {/* Editorial Staging Inspiration Module */}
        <div className="w-full p-space-md rounded-2xl bg-surface-container flex items-center justify-between gap-space-md border border-outline-variant/30">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-14 h-14 rounded-xl bg-surface-variant overflow-hidden shrink-0 shadow-sm">
              <img
                className="w-full h-full object-cover"
                src={SUGGESTED_PAIRING_IMG}
                alt="Suggested Travertine pairing"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
                Suggested Pairing
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface truncate">
                Nami Travertine Table
              </h3>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                + 18" clearance recommended
              </span>
            </div>
          </div>
          <button
            onClick={handleAddPairing}
            className="px-3.5 py-2 rounded-xl bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-bright active:scale-95 transition-all shadow-sm shrink-0 flex items-center gap-1 border border-outline-variant/20"
          >
            <span className="material-symbols-outlined text-[16px]">
              {pairedAdded ? 'check' : 'add'}
            </span>
            <span>{pairedAdded ? 'Added' : 'Add'}</span>
          </button>
        </div>

        {/* Persistent Bottom AR CTA Stack */}
        <div className="w-full flex items-center gap-3 pt-space-xs pb-space-lg">
          <button
            onClick={onSaveToRoomPlan}
            className="flex-1 h-14 rounded-xl bg-surface-container-high text-on-surface font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-surface-variant active:scale-98 transition-all border border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-[20px] text-primary">
              bookmark_add
            </span>
            <span>Save to Room Plan</span>
          </button>
          <button
            onClick={handleOrderNow}
            className="flex-[1.4] h-14 rounded-xl bg-primary-container text-on-tertiary-container font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-lg hover:opacity-95 active:scale-98 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span>Order Now · $890</span>
          </button>
        </div>
      </div>

      {/* Snapshot Capture Flash Toast Alert */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-inverse-surface/90 text-surface-bright backdrop-blur-md shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <span className="material-symbols-outlined text-secondary-fixed text-[18px]">
            verified
          </span>
          <span className="font-label-md text-label-md">
            High-res spatial view saved to camera roll!
          </span>
        </div>
      )}
    </div>
  );
};
