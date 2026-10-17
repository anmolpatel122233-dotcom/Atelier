import React, { useState } from 'react';
import { Screen, RoomItem, Product } from '../types';
import { INITIAL_ROOM_ITEMS, CATALOG_ADD_ITEMS } from '../data/mockData';

interface PlannerViewProps {
  onNavigate: (screen: Screen) => void;
  onAddToCart: (product: Product) => void;
  onOpenCart: () => void;
}

export const PlannerView: React.FC<PlannerViewProps> = ({
  onNavigate,
  onAddToCart,
  onOpenCart,
}) => {
  const [activeRoom, setActiveRoom] = useState<'living' | 'studio'>('living');
  const [is3D, setIs3D] = useState(false);
  const [showRuler, setShowRuler] = useState(true);
  const [placedItems, setPlacedItems] = useState<RoomItem[]>(INITIAL_ROOM_ITEMS);
  const [history, setHistory] = useState<RoomItem[][]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showArModal, setShowArModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [orderedLook, setOrderedLook] = useState(false);
  const [newSpaceModal, setNewSpaceModal] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  const totalPrice = placedItems.reduce((acc, item) => acc + item.price, 0);

  const handlePlaceItem = (catalogItem: typeof CATALOG_ADD_ITEMS[0]) => {
    setHistory((prev) => [...prev, placedItems]);
    const newItem: RoomItem = {
      id: `placed-${Date.now()}`,
      name: catalogItem.name,
      shortName: catalogItem.name.split(' ')[0] + ' ' + (catalogItem.name.split(' ')[1] || ''),
      price: catalogItem.price,
      dimensions: catalogItem.dimensions,
      x: 30 + Math.floor(Math.random() * 80),
      y: 60 + Math.floor(Math.random() * 80),
      w: 60,
      h: 50,
      color: '#e9e1dc',
      type: catalogItem.category === 'seating' ? 'chair' : catalogItem.category === 'tables' ? 'table' : 'decor',
    };

    setPlacedItems((prev) => [...prev, newItem]);
    setSelectedItemId(newItem.id);
    showToast(`Placed ${catalogItem.name} in floorplan`);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previousState = history[history.length - 1];
    setHistory((prev) => prev.slice(0, prev.length - 1));
    setPlacedItems(previousState);
    setSelectedItemId(null);
    showToast('Reverted recent modification');
  };

  const handleRemovePlacedItem = (id: string) => {
    setHistory((prev) => [...prev, placedItems]);
    setPlacedItems((prev) => prev.filter((i) => i.id !== id));
    setSelectedItemId(null);
    showToast('Removed piece from space');
  };

  const handleOrderEntireLook = () => {
    placedItems.forEach((item) => {
      onAddToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        category: 'seating',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLbVZmmkqTgMEAW-SuZQMkVezNlUCQSG8jzghlI6F3bTJ9zq4SyDy_6RiqNaZjPc_RKAHGxAI6rLteYsxIjnSj1MbDhQbB7wLzWb6kwzvTlI7XHn9xVCjVlnwbDqDmyCECfXyVCdd_6Fp5Z_y_r543kP4cet2eF0xurwm4dnUA6PoI4h9nfhRO5WdHyvqmvE4-xVjNc3zYZ4cuFs9-9Nw3eHXBk1mCtlSIrZrcGTayjkYLIJTm6YSl6Q',
      });
    });
    setOrderedLook(true);
    showToast(`Saved complete room look ($${totalPrice.toLocaleString()}) to bag!`);
    setTimeout(() => {
      setOrderedLook(false);
      onOpenCart();
    }, 1200);
  };

  const filteredCatalog = CATALOG_ADD_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const selectedItem = placedItems.find((i) => i.id === selectedItemId);

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Room Selector & Atmosphere Bar */}
      <section className="px-margin-mobile pt-3 pb-2 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
            Active Project Space
          </span>
          <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary bg-secondary-container/60 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            Scale: 1:25 Real Metric
          </span>
        </div>

        {/* Room Carousel Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-margin-mobile px-margin-mobile no-scrollbar">
          <button
            onClick={() => setActiveRoom('living')}
            className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full transition-all shadow-xs ${
              activeRoom === 'living'
                ? 'bg-on-surface text-surface'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">living</span>
            <div className="text-left flex flex-col">
              <span
                className={`font-label-md text-label-md font-semibold leading-tight ${
                  activeRoom === 'living' ? 'text-surface' : 'text-on-surface'
                }`}
              >
                Primary Living Room
              </span>
              <span
                className={`font-label-sm text-[10px] ${
                  activeRoom === 'living' ? 'opacity-75' : 'text-on-surface-variant'
                }`}
              >
                18' × 14' • 252 sq ft
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveRoom('studio')}
            className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full transition-all ${
              activeRoom === 'studio'
                ? 'bg-on-surface text-surface'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
              wb_sunny
            </span>
            <div className="text-left flex flex-col">
              <span
                className={`font-label-md text-label-md leading-tight ${
                  activeRoom === 'studio' ? 'text-surface' : 'text-on-surface'
                }`}
              >
                Sunlit Home Studio
              </span>
              <span
                className={`font-label-sm text-[10px] ${
                  activeRoom === 'studio' ? 'opacity-75' : 'text-on-surface-variant'
                }`}
              >
                14' × 11' • 154 sq ft
              </span>
            </div>
          </button>

          <button
            onClick={() => setNewSpaceModal(true)}
            className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full bg-surface-container-high text-primary hover:bg-primary-fixed transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span className="font-label-md text-label-md font-semibold text-primary">New Space</span>
          </button>
        </div>
      </section>

      {/* Interactive Spatial Canvas / Visualizer HUD */}
      <section className="px-margin-mobile my-2">
        <div className="relative w-full rounded-2xl bg-surface-container-lowest shadow-md overflow-hidden border border-outline-variant/30">
          {/* HUD Top Overlay Tools */}
          <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
            {/* Viewport Mode Toggles */}
            <div className="inline-flex p-1 rounded-full bg-surface-container-low/95 backdrop-blur-md shadow-sm pointer-events-auto border border-outline-variant/30">
              <button
                onClick={() => setIs3D(false)}
                className={`px-3 py-1 rounded-full font-label-sm text-label-sm transition-all flex items-center gap-1 ${
                  !is3D
                    ? 'bg-on-surface text-surface shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">architecture</span>
                <span>Plan 2D</span>
              </button>
              <button
                onClick={() => setIs3D(true)}
                className={`px-3 py-1 rounded-full font-label-sm text-label-sm transition-all flex items-center gap-1 ${
                  is3D
                    ? 'bg-on-surface text-surface shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">view_in_ar</span>
                <span>3D Angle</span>
              </button>
            </div>

            {/* History & Utilities */}
            <div className="flex items-center gap-1.5 pointer-events-auto">
              <button
                aria-label="Undo"
                onClick={handleUndo}
                disabled={history.length === 0}
                className={`w-8 h-8 rounded-full bg-surface-container-low/95 backdrop-blur-md text-on-surface flex items-center justify-center shadow-sm active:scale-95 transition-transform border border-outline-variant/30 ${
                  history.length === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">undo</span>
              </button>
              <button
                aria-label="Toggle Dimensions"
                onClick={() => setShowRuler(!showRuler)}
                className={`px-2.5 h-8 rounded-full bg-surface-container-low/95 backdrop-blur-md font-label-sm text-label-sm flex items-center gap-1 shadow-sm active:scale-95 transition-transform border border-outline-variant/30 ${
                  showRuler ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">straighten</span>
                <span className="text-[11px] font-semibold">Ruler</span>
              </button>
            </div>
          </div>

          {/* Bottom HUD: Live Natural Light & AR Shortcut */}
          <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 pointer-events-none">
            <div className="px-2.5 py-1 rounded-full bg-surface-container-low/90 backdrop-blur-md flex items-center gap-1.5 shadow-sm border border-outline-variant/30">
              <span
                className="material-symbols-outlined text-tertiary text-[16px] animate-spin"
                style={{ animationDuration: '24s' }}
              >
                light_mode
              </span>
              <span className="font-label-sm text-[11px] text-on-surface">
                SW Exposure • 3:45 PM Warm Wash
              </span>
            </div>
          </div>

          <div className="absolute bottom-3 right-3 z-20 pointer-events-auto">
            <button
              onClick={() => onNavigate('ar')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-primary text-on-primary shadow-lg shadow-primary/25 active:scale-95 transition-transform hover:bg-primary-container"
            >
              <span className="material-symbols-outlined text-[18px]">camera</span>
              <span className="font-label-md text-label-md font-semibold text-on-primary">
                AR View
              </span>
            </button>
          </div>

          {/* Spatial Canvas Stage */}
          <div className="relative w-full h-[330px] bg-surface-container-low select-none transition-transform duration-500 ease-out overflow-hidden flex items-center justify-center">
            {/* SVG Grid */}
            <svg
              className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="gridSub" width="16" height="16" patternUnits="userSpaceOnUse">
                  <path
                    d="M 16 0 L 0 0 0 16"
                    fill="none"
                    stroke="#DBC1B9"
                    strokeWidth="0.5"
                    strokeDasharray="1 2"
                  />
                </pattern>
                <pattern id="gridMain" width="64" height="64" patternUnits="userSpaceOnUse">
                  <rect width="64" height="64" fill="url(#gridSub)" />
                  <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#88726B" strokeWidth="0.75" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#gridMain)" />
            </svg>

            {/* Room Envelope Container */}
            <div
              className="relative w-[300px] h-[230px] rounded-xl bg-surface-container shadow-inner p-3 flex flex-col justify-between transition-all duration-500 border border-outline-variant/40"
              style={{
                transform: is3D
                  ? 'perspective(900px) rotateX(42deg) rotateZ(-18deg) scale(0.92)'
                  : 'perspective(0px) rotateX(0deg) rotateZ(0deg) scale(1)',
              }}
            >
              {/* Dimension lines */}
              {showRuler && (
                <>
                  <div className="absolute -top-5 left-0 right-0 flex items-center justify-between text-on-surface-variant font-label-sm text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-outline" />
                    <span className="px-1.5 py-0.5 bg-surface-container-highest rounded font-mono shadow-xs">
                      {activeRoom === 'living' ? "18' - 0\" (548 cm)" : "14' - 0\" (426 cm)"}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-outline" />
                  </div>
                  <div className="absolute -left-6 top-0 bottom-0 flex flex-col items-center justify-between text-on-surface-variant font-label-sm text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-outline" />
                    <span className="px-1 py-0.5 bg-surface-container-highest rounded font-mono -rotate-90 shadow-xs">
                      {activeRoom === 'living' ? "14' - 0\"" : "11' - 0\""}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-outline" />
                  </div>
                </>
              )}

              {/* Glazing Window Bay */}
              <div className="absolute top-0 right-8 w-28 h-1.5 bg-primary-fixed rounded-b flex items-center justify-center">
                <span className="text-[9px] uppercase font-label-sm text-on-primary-fixed tracking-wider transform -translate-y-3.5">
                  Window Bay (SW)
                </span>
              </div>

              {/* Interactive Placed Items */}
              <div className="relative w-full h-full">
                {placedItems.map((item) => {
                  const isSelected = selectedItemId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItemId(isSelected ? null : item.id);
                      }}
                      className={`absolute cursor-pointer transition-transform duration-200 select-none ${
                        item.type === 'rug'
                          ? 'rounded-lg bg-surface-container-high shadow-xs p-2 flex items-end justify-start'
                          : item.type === 'sofa'
                          ? 'rounded-xl bg-surface-container-lowest shadow-md flex items-center justify-between px-2.5'
                          : item.type === 'table'
                          ? 'rounded-full bg-tertiary-fixed shadow-sm flex items-center justify-center'
                          : item.type === 'lamp'
                          ? 'rounded-full bg-primary-container text-white shadow-md flex items-center justify-center'
                          : 'rounded-lg bg-surface-container-highest shadow-md flex flex-col items-center justify-center p-1'
                      } ${isSelected ? 'ring-2 ring-primary scale-105 z-30' : 'hover:scale-102'}`}
                      style={{
                        top: `${item.y}px`,
                        left: `${item.x}px`,
                        width: `${item.w}px`,
                        height: `${item.h}px`,
                      }}
                    >
                      {item.type === 'rug' && (
                        <span className="font-label-sm text-[9px] text-on-surface-variant opacity-70">
                          {item.shortName}
                        </span>
                      )}

                      {item.type === 'sofa' && (
                        <>
                          <div className="flex flex-col">
                            <span className="font-label-md text-[11px] font-semibold text-on-surface leading-tight">
                              {item.shortName}
                            </span>
                            <span className="font-label-sm text-[9px] text-primary">
                              {item.dimensions}
                            </span>
                          </div>
                          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                            open_with
                          </span>
                        </>
                      )}

                      {item.type === 'table' && (
                        <span className="font-label-sm text-[10px] font-medium text-on-tertiary-fixed text-center px-1">
                          {item.shortName}
                        </span>
                      )}

                      {item.type === 'lamp' && (
                        <>
                          <span className="material-symbols-outlined text-[16px] text-surface">
                            lightbulb
                          </span>
                          <div className="absolute -top-3 -left-3 w-16 h-16 rounded-full bg-tertiary-fixed-dim/20 pointer-events-none animate-pulse" />
                        </>
                      )}

                      {item.type !== 'rug' &&
                        item.type !== 'sofa' &&
                        item.type !== 'table' &&
                        item.type !== 'lamp' && (
                          <>
                            <span className="material-symbols-outlined text-[16px] text-primary">
                              chair
                            </span>
                            <span className="font-label-sm text-[8px] text-on-surface truncate text-center">
                              {item.shortName}
                            </span>
                          </>
                        )}
                    </div>
                  );
                })}

                {/* Selected Item Floating Inspector Badge */}
                {selectedItem && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-surface-container-lowest/95 backdrop-blur-md shadow-xl px-3 py-2 rounded-2xl flex items-center gap-2.5 z-40 border border-outline-variant/30 animate-in fade-in duration-150">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                        {selectedItem.name}
                      </span>
                      <span className="font-body-sm text-[11px] text-primary">
                        ${selectedItem.price} • {selectedItem.dimensions}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemovePlacedItem(selectedItem.id)}
                      title="Remove piece"
                      className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-error transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">delete</span>
                    </button>
                    <button
                      onClick={() => setSelectedItemId(null)}
                      className="text-on-surface-variant hover:text-on-surface text-xs ml-1"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-Time Space Budget & Shoppable Look Pill */}
      <section className="px-margin-mobile my-1.5">
        <div className="p-3.5 rounded-xl bg-surface-container flex items-center justify-between shadow-sm border border-outline-variant/30">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px] text-on-secondary-container">
                shopping_bag
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-label-md text-label-md font-semibold text-on-surface truncate">
                  {placedItems.length} Items in layout
                </span>
                <span className="w-1 h-1 rounded-full bg-outline-variant" />
                <span className="font-label-sm text-label-sm text-secondary font-medium">
                  Ready
                </span>
              </div>
              <span className="font-headline-sm text-headline-sm text-primary leading-tight">
                ${totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
          <button
            onClick={handleOrderEntireLook}
            className="px-3.5 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold shrink-0 shadow-sm active:scale-95 transition-all flex items-center gap-1.5 hover:bg-primary-container"
          >
            <span className="material-symbols-outlined text-[17px]">
              {orderedLook ? 'check' : 'add_shopping_cart'}
            </span>
            <span>{orderedLook ? 'Added!' : 'Order Look'}</span>
          </button>
        </div>
      </section>

      {/* Bottom Sheet Drawer: Add Furniture Catalog */}
      <section className="px-margin-mobile mt-3 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className="w-10 h-1 bg-outline-variant/60 rounded-full mx-auto mb-1" />
          <div className="flex items-center justify-between">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Add Furniture to Room
            </h3>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Tap to inspect or place
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-margin-mobile px-margin-mobile no-scrollbar">
          {[
            { id: 'all', label: 'All (14)' },
            { id: 'seating', label: 'Seating' },
            { id: 'tables', label: 'Tables' },
            { id: 'lighting', label: 'Lighting' },
            { id: 'textiles', label: 'Textiles' },
            { id: 'objects', label: 'Art & Objects' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm shrink-0 transition-colors ${
                activeCategory === tab.id
                  ? 'bg-on-surface text-surface'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Draggable Mini Furniture Cards Grid */}
        <div className="grid grid-cols-1 gap-3">
          {filteredCatalog.map((catalogItem) => (
            <div
              key={catalogItem.id}
              className="p-3 rounded-xl bg-surface-container-low shadow-sm flex items-center justify-between gap-3 hover:bg-surface-container transition-colors border border-outline-variant/20"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={catalogItem.image}
                  alt={catalogItem.name}
                  className="w-16 h-16 rounded-lg object-cover shrink-0 bg-surface-variant"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-sm text-[15px] text-on-surface truncate">
                    {catalogItem.name}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {catalogItem.subtitle}
                  </span>
                  <span className="font-label-sm text-[11px] text-secondary font-medium mt-0.5">
                    {catalogItem.dimensions}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className="font-metric-price text-metric-price text-on-surface">
                  ${catalogItem.price}
                </span>
                <button
                  onClick={() => handlePlaceItem(catalogItem)}
                  className="place-piece-btn px-3 py-1 rounded-full bg-surface-container-highest text-primary hover:bg-primary hover:text-on-primary font-label-sm text-label-sm font-semibold transition-all flex items-center gap-1 active:scale-95 border border-outline-variant/20"
                >
                  <span className="material-symbols-outlined text-[15px]">add</span>
                  <span>Place</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AR Modal Simulator Sheet */}
      {showArModal && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-surface-container-lowest p-5 shadow-2xl flex flex-col gap-4 border border-outline-variant/30 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">
                  view_in_ar
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface">
                  Atelier AR Spatial Pass
                </span>
              </div>
              <button
                onClick={() => setShowArModal(false)}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="relative w-full h-44 rounded-xl overflow-hidden bg-surface-container flex flex-col items-center justify-center p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-2 animate-bounce">
                <span className="material-symbols-outlined text-[26px]">
                  screen_search_desktop
                </span>
              </div>
              <span className="font-label-md text-label-md font-semibold text-on-surface">
                Scanning Living Room Floor...
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Calibrating ambient light reflection and ceiling heights.
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowArModal(false);
                  onNavigate('ar');
                }}
                className="w-full py-2.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-semibold active:scale-98 transition-transform shadow-md"
              >
                Begin Camera Projection
              </button>
              <button
                onClick={() => setShowArModal(false)}
                className="w-full py-2 rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
              >
                Return to 2D Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Space Modal */}
      {newSpaceModal && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-surface p-5 shadow-2xl flex flex-col gap-3 border border-outline-variant/30 animate-in fade-in">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Create New Space</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Specify your room dimensions or scan your room using camera LiDAR.
            </p>
            <div className="flex flex-col gap-2 mt-2">
              <button
                onClick={() => {
                  setNewSpaceModal(false);
                  onNavigate('ar');
                }}
                className="w-full py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                <span>Scan Room with Camera</span>
              </button>
              <button
                onClick={() => setNewSpaceModal(false)}
                className="w-full py-2 rounded-full bg-surface-container text-on-surface font-label-md text-label-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-inverse-surface/90 text-inverse-on-surface font-label-sm text-label-sm shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
          {toastMessage}
        </div>
      )}
    </div>
  );
};
