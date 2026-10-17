import React, { useState } from 'react';
import { Screen, Product } from '../types';
import { SHOP_HERO_PRODUCT, SHOP_PRODUCTS } from '../data/mockData';

interface ShopViewProps {
  onNavigate: (screen: Screen) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistedIds: Set<string>;
  cartCount: number;
  cartTotal: number;
  lastAddedName: string;
  onOpenCart: () => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  onNavigate,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistedIds,
  cartCount,
  cartTotal,
  lastAddedName,
  onOpenCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('chairs');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickShipOnly, setQuickShipOnly] = useState(false);
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const categories = [
    { id: 'chairs', label: 'Chairs & Sofas', icon: 'chair' },
    { id: 'dining', label: 'Dining & Tables', icon: 'table_restaurant' },
    { id: 'lighting', label: 'Lighting', icon: 'light' },
    { id: 'rugs', label: 'Rugs & Ceramics', icon: 'interests' },
    { id: 'storage', label: 'Storage', icon: 'shelves' },
  ];

  const handleAddWithFeedback = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedAnimationId(product.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1000);
  };

  const ardenTable = SHOP_PRODUCTS[0];
  const akariPendant = SHOP_PRODUCTS[1];
  const oatmealRug = SHOP_PRODUCTS[2];
  const amphoraVessel = SHOP_PRODUCTS[3];

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Search & Category Header Area */}
      <div className="px-margin-mobile pt-space-md flex flex-col gap-space-sm">
        {/* Search Bar with Camera */}
        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-4 text-on-surface-variant text-[20px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 4,000+ designer furnishings..."
            className="w-full h-12 pl-11 pr-12 rounded-full bg-surface-container text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/70 focus:outline-none focus:bg-surface-container-high transition-colors shadow-xs"
          />
          <button
            aria-label="Visual Search by Camera"
            onClick={() => onNavigate('ar')}
            title="Scan room or piece"
            className="absolute right-2 w-8 h-8 rounded-full flex items-center justify-center text-primary hover:bg-surface-container-highest transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar py-space-xs -mx-margin-mobile px-margin-mobile">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 h-9 rounded-full font-label-md text-label-md active:scale-95 transition-all shadow-xs ${
                  isActive
                    ? 'bg-on-surface text-surface'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Sort Row */}
      <div className="px-margin-mobile pt-space-xs pb-space-sm flex items-center justify-between gap-space-xs overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-space-xs shrink-0">
          <button className="flex items-center gap-1.5 px-3 h-8 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-surface-container-highest transition-colors">
            <span className="material-symbols-outlined text-[15px]">tune</span>
            <span>Filters (2)</span>
          </button>
          <button
            onClick={() => setQuickShipOnly(!quickShipOnly)}
            className={`flex items-center gap-1 px-3 h-8 rounded-full font-label-sm text-label-sm transition-all ${
              quickShipOnly
                ? 'bg-primary text-on-primary font-semibold'
                : 'bg-secondary-container text-on-secondary-container'
            }`}
          >
            <span
              className="material-symbols-outlined text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
            <span>Quick Ship</span>
          </button>
          <button className="flex items-center gap-1 px-3 h-8 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-high transition-colors">
            <span>Wood, Linen, Stone</span>
            <span className="material-symbols-outlined text-[14px]">expand_more</span>
          </button>
        </div>
        <button className="shrink-0 flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm hover:text-on-surface pl-2">
          <span className="material-symbols-outlined text-[16px]">swap_vert</span>
          <span>Price: Low to High</span>
        </button>
      </div>

      {/* Main Products Feed */}
      <div className="px-margin-mobile flex flex-col gap-space-lg pt-space-xs">
        {/* 1. Hero Product Card: Kanso Curved Bouclé Lounge Chair */}
        <div
          onClick={() => {
            onSelectProduct(SHOP_HERO_PRODUCT);
            onNavigate('product');
          }}
          className="flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(30,27,24,0.04)] border border-outline-variant/30 cursor-pointer group hover:shadow-lg transition-all"
        >
          <div className="relative w-full aspect-[4/3] bg-surface-container">
            <img
              src={SHOP_HERO_PRODUCT.image}
              alt={SHOP_HERO_PRODUCT.name}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            {/* AR Ready Pill */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectProduct(SHOP_HERO_PRODUCT);
                onNavigate('ar');
              }}
              className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-md text-on-surface shadow-sm hover:bg-surface active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-primary text-[15px]">view_in_ar</span>
              <span className="font-label-sm text-label-sm tracking-wider uppercase font-semibold">
                AR Ready
              </span>
            </button>

            {/* Wishlist Button */}
            <button
              aria-label="Save item"
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(SHOP_HERO_PRODUCT.id);
              }}
              className={`wishlist-btn absolute top-3 right-3 w-9 h-9 rounded-full bg-surface/85 backdrop-blur-md flex items-center justify-center shadow-sm transition-transform active:scale-90 ${
                wishlistedIds.has(SHOP_HERO_PRODUCT.id)
                  ? 'text-primary'
                  : 'text-on-surface hover:text-primary'
              }`}
            >
              <span
                className="material-symbols-outlined text-[19px]"
                style={{
                  fontVariationSettings: wishlistedIds.has(SHOP_HERO_PRODUCT.id)
                    ? "'FILL' 1"
                    : "'FILL' 0",
                }}
              >
                {wishlistedIds.has(SHOP_HERO_PRODUCT.id) ? 'favorite' : 'favorite_border'}
              </span>
            </button>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span className="px-2 py-0.5 rounded bg-on-surface/80 backdrop-blur-sm text-surface font-label-sm text-label-sm tracking-wide">
                Nordic Sand
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm">
                <span
                  className="material-symbols-outlined text-[13px] text-tertiary-container"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span>4.9 (42)</span>
              </span>
            </div>
          </div>

          <div className="p-space-md flex items-end justify-between gap-space-sm bg-surface-container-lowest">
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Atelier Studio
              </span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface truncate mt-0.5">
                Kanso Curved Bouclé Lounge Chair
              </h2>
              <span className="font-metric-price text-metric-price text-primary mt-1">
                $890
              </span>
            </div>
            <button
              onClick={(e) => handleAddWithFeedback(e, SHOP_HERO_PRODUCT)}
              className="shrink-0 h-10 px-4 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center gap-1.5 active:scale-95 transition-transform shadow-sm hover:bg-primary-container"
            >
              <span className="material-symbols-outlined text-[18px]">
                {addedAnimationId === SHOP_HERO_PRODUCT.id ? 'check' : 'add'}
              </span>
              <span>{addedAnimationId === SHOP_HERO_PRODUCT.id ? 'Added' : 'Add'}</span>
            </button>
          </div>
        </div>

        {/* 2. 2-Column Grid: Arden Table & Akari Pendant */}
        <div className="grid grid-cols-2 gap-space-sm">
          {/* Card 1: Arden Table */}
          <div
            onClick={() => onSelectProduct(ardenTable)}
            className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(30,27,24,0.04)] border border-outline-variant/30 cursor-pointer group hover:shadow-md transition-all"
          >
            <div className="relative w-full aspect-square bg-surface-container">
              <img
                src={ardenTable.image}
                alt={ardenTable.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                In Stock
              </div>
              <button
                aria-label="Save item"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(ardenTable.id);
                }}
                className={`wishlist-btn absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-surface/85 backdrop-blur-md flex items-center justify-center shadow-sm active:scale-90 transition-transform ${
                  wishlistedIds.has(ardenTable.id) ? 'text-primary' : 'text-on-surface'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{
                    fontVariationSettings: wishlistedIds.has(ardenTable.id)
                      ? "'FILL' 1"
                      : "'FILL' 0",
                  }}
                >
                  {wishlistedIds.has(ardenTable.id) ? 'favorite' : 'favorite_border'}
                </span>
              </button>
            </div>
            <div className="p-3 flex flex-col justify-between flex-1 bg-surface-container-lowest">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant block">
                  Honed Beige
                </span>
                <h3 className="font-headline-sm text-[15px] leading-snug text-on-surface line-clamp-2 mt-0.5">
                  Arden Travertine Fluted Table
                </h3>
              </div>
              <div className="flex items-center justify-between pt-2.5 mt-1">
                <span className="font-metric-price text-metric-price text-on-surface">
                  $1,150
                </span>
                <button
                  aria-label="Add to Bag"
                  onClick={(e) => handleAddWithFeedback(e, ardenTable)}
                  className="w-8 h-8 rounded-full bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary flex items-center justify-center transition-colors active:scale-90"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {addedAnimationId === ardenTable.id ? 'check' : 'add'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Akari Rice Pendant */}
          <div
            onClick={() => onSelectProduct(akariPendant)}
            className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(30,27,24,0.04)] border border-outline-variant/30 cursor-pointer group hover:shadow-md transition-all"
          >
            <div className="relative w-full aspect-square bg-surface-container">
              <img
                src={akariPendant.image}
                alt={akariPendant.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2.5 left-2.5 flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-surface/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm">
                <span
                  className="material-symbols-outlined text-[12px] text-tertiary-container"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span>4.8</span>
              </div>
              <button
                aria-label="Save item"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(akariPendant.id);
                }}
                className={`wishlist-btn absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-surface/85 backdrop-blur-md flex items-center justify-center shadow-sm active:scale-90 transition-transform ${
                  wishlistedIds.has(akariPendant.id) ? 'text-primary' : 'text-on-surface'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{
                    fontVariationSettings: wishlistedIds.has(akariPendant.id)
                      ? "'FILL' 1"
                      : "'FILL' 0",
                  }}
                >
                  {wishlistedIds.has(akariPendant.id) ? 'favorite' : 'favorite_border'}
                </span>
              </button>
            </div>
            <div className="p-3 flex flex-col justify-between flex-1 bg-surface-container-lowest">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant block">
                  Studio Edit
                </span>
                <h3 className="font-headline-sm text-[15px] leading-snug text-on-surface line-clamp-2 mt-0.5">
                  Akari Sculptural Rice Pendant
                </h3>
              </div>
              <div className="flex items-center justify-between pt-2.5 mt-1">
                <span className="font-metric-price text-metric-price text-on-surface">
                  $320
                </span>
                <button
                  aria-label="Add to Bag"
                  onClick={(e) => handleAddWithFeedback(e, akariPendant)}
                  className="w-8 h-8 rounded-full bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary flex items-center justify-center transition-colors active:scale-90"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {addedAnimationId === akariPendant.id ? 'check' : 'add'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Full-width Card: Oatmeal Tufted Wool Rug */}
        <div
          onClick={() => onSelectProduct(oatmealRug)}
          className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(30,27,24,0.04)] border border-outline-variant/30 cursor-pointer group hover:shadow-md transition-all"
        >
          <div className="relative w-full aspect-[16/10] bg-surface-container">
            <img
              src={oatmealRug.image}
              alt={oatmealRug.name}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold tracking-wide">
              Best Seller
            </div>
            <button
              aria-label="Save item"
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(oatmealRug.id);
              }}
              className={`wishlist-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-surface/85 backdrop-blur-md flex items-center justify-center shadow-sm active:scale-90 transition-transform ${
                wishlistedIds.has(oatmealRug.id) ? 'text-primary' : 'text-on-surface'
              }`}
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{
                  fontVariationSettings: wishlistedIds.has(oatmealRug.id)
                    ? "'FILL' 1"
                    : "'FILL' 0",
                }}
              >
                {wishlistedIds.has(oatmealRug.id) ? 'favorite' : 'favorite_border'}
              </span>
            </button>
          </div>
          <div className="p-space-md flex items-end justify-between gap-space-sm bg-surface-container-lowest">
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                8 × 10 ft Canvas
              </span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface truncate mt-0.5">
                Oatmeal Tufted Wool & Jute Area Rug
              </h2>
              <span className="font-metric-price text-metric-price text-primary mt-1">
                $780
              </span>
            </div>
            <button
              onClick={(e) => handleAddWithFeedback(e, oatmealRug)}
              className="shrink-0 h-10 px-4 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center gap-1.5 active:scale-95 transition-transform shadow-sm hover:bg-primary-container"
            >
              <span className="material-symbols-outlined text-[18px]">
                {addedAnimationId === oatmealRug.id ? 'check' : 'add'}
              </span>
              <span>{addedAnimationId === oatmealRug.id ? 'Added' : 'Add'}</span>
            </button>
          </div>
        </div>

        {/* 4. List Card: Amphora Vessel */}
        <div
          onClick={() => onSelectProduct(amphoraVessel)}
          className="flex items-center gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-[0_4px_20px_-2px_rgba(30,27,24,0.04)] border border-outline-variant/30 cursor-pointer group hover:shadow-md transition-all"
        >
          <div className="relative w-28 h-28 rounded-lg overflow-hidden shrink-0 bg-surface-container">
            <img
              src={amphoraVessel.image}
              alt={amphoraVessel.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-surface/90 text-on-surface font-label-sm text-[9px] font-semibold tracking-wider uppercase">
              Handmade
            </span>
          </div>
          <div className="flex flex-col flex-1 min-w-0 justify-between h-28 py-0.5">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Vessels & Art
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface truncate mt-0.5">
                Amphora Vessel
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-0.5">
                Matte Terracotta Clay
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-metric-price text-metric-price text-primary font-semibold">
                $145
              </span>
              <button
                onClick={(e) => handleAddWithFeedback(e, amphoraVessel)}
                className="h-8 px-3 rounded-full bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary font-label-sm text-label-sm flex items-center gap-1 active:scale-95 transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">
                  {addedAnimationId === amphoraVessel.id ? 'check' : 'add'}
                </span>
                <span>{addedAnimationId === amphoraVessel.id ? 'Added' : 'Add'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Brand Reassurance: Artisan Made & Carbon Neutral */}
        <div className="py-space-md flex flex-col items-center justify-center text-center gap-space-xs">
          <span className="material-symbols-outlined text-secondary text-[28px]">spa</span>
          <p className="font-headline-sm text-headline-sm text-on-surface">
            Artisan Made & Carbon Neutral
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
            All curated pieces include white-glove inside delivery and sustainable packaging.
          </p>
        </div>
      </div>

      {/* Floating Bottom Cart Pill */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 left-4 right-4 max-w-md mx-auto z-40 transition-all duration-300 transform translate-y-0">
          <div className="flex items-center justify-between px-4 py-3 rounded-full bg-inverse-surface text-inverse-on-surface shadow-2xl backdrop-blur-md border border-outline-variant/20">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0">
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-surface-container-lowest text-primary text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md truncate text-inverse-on-surface">
                  {lastAddedName || 'Curated Furnishing'}
                </span>
                <span className="font-label-sm text-label-sm text-inverse-on-surface/75">
                  ${cartTotal.toLocaleString()} • Ready to Ship
                </span>
              </div>
            </div>
            <button
              onClick={onOpenCart}
              className="shrink-0 flex items-center gap-1.5 px-4 h-9 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-transform active:scale-95 shadow-md"
            >
              <span>Checkout</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
