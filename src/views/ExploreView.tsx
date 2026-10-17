import React, { useState } from 'react';
import { Screen, Product } from '../types';
import {
  EXPLORE_KYOTO_HERO,
  ROOM_ARCHETYPES,
  TRENDING_PIECES,
  LIGHTING_SPOTLIGHT,
} from '../data/mockData';

interface ExploreViewProps {
  onNavigate: (screen: Screen) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistedIds: Set<string>;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onNavigate,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistedIds,
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [trendingTab, setTrendingTab] = useState<'curated' | 'new'>('curated');
  const [storyOpen, setStoryOpen] = useState(false);

  const filterChips = [
    { id: 'all', label: 'All' },
    { id: 'japandi', label: 'Japandi' },
    { id: 'warm-minimalist', label: 'Warm Minimalist' },
    { id: 'mid-century', label: 'Mid-Century Modern' },
    { id: 'organic-modern', label: 'Organic Modern' },
    { id: 'mediterranean', label: 'Mediterranean' },
  ];

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Editorial Greeting Section */}
      <section className="px-margin-mobile pt-2 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
              Curated Living
            </span>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight mt-0.5">
              Good morning, Elena
            </h2>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant shadow-sm">
            <span className="material-symbols-outlined text-[20px]">filter_vintage</span>
          </div>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1.5 leading-relaxed">
          Curated spaces celebrating tactile calm, earthy textures, and sculpted forms for your home sanctuary.
        </p>
      </section>

      {/* Style Filter Chips Carousel */}
      <section className="w-full overflow-x-auto no-scrollbar py-2 mb-3">
        <div className="flex items-center gap-2 px-margin-mobile whitespace-nowrap">
          {filterChips.map((chip) => {
            const isActive = activeFilter === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setActiveFilter(chip.id)}
                className={`style-chip px-4 py-2 rounded-full font-label-md text-label-md transition-all shadow-xs flex items-center gap-1.5 active:scale-95 ${
                  isActive
                    ? 'bg-on-surface text-surface'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed"></span>
                )}
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Editorial Room Showcase with Interactive Hotspots */}
      <section className="px-margin-mobile mb-7">
        <div className="relative w-full rounded-3xl overflow-hidden shadow-lg bg-surface-container-high border border-outline-variant/30">
          <div className="relative w-full h-[380px] overflow-hidden">
            <img
              src={EXPLORE_KYOTO_HERO.image}
              alt="Kyoto Townhouse Editorial Room"
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
            {/* Soft Vignette Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/20 to-transparent pointer-events-none" />

            {/* Hotspots */}
            {EXPLORE_KYOTO_HERO.hotspots.map((hs) => {
              const isSelected = activeHotspot === hs.id;
              return (
                <div
                  key={hs.id}
                  className="absolute z-20"
                  style={{ top: hs.top, left: hs.left }}
                >
                  <button
                    aria-label={`View ${hs.title}`}
                    onClick={() => setActiveHotspot(isSelected ? null : hs.id)}
                    className="relative w-7 h-7 rounded-full bg-surface/90 text-on-surface flex items-center justify-center shadow-md backdrop-blur-md transition-transform duration-300 hover:scale-110 active:scale-95"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  </button>

                  {/* Popover Badge */}
                  {isSelected && (
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 w-48 bg-surface/95 backdrop-blur-md rounded-2xl p-3 shadow-xl z-30 border border-outline-variant/30 animate-in fade-in duration-200">
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <p className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
                            {hs.category}
                          </p>
                          <h4 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                            {hs.title}
                          </h4>
                        </div>
                        <button
                          onClick={() => setActiveHotspot(null)}
                          className="text-on-surface-variant hover:text-on-surface p-0.5"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-metric-price text-metric-price text-on-surface font-semibold">
                          ${hs.price}
                        </span>
                        <button
                          onClick={() => {
                            onAddToCart({
                              id: hs.id,
                              name: hs.title,
                              price: hs.price,
                              category: 'seating',
                              image: EXPLORE_KYOTO_HERO.image,
                            });
                            setActiveHotspot(null);
                          }}
                          className="px-2.5 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center gap-1 hover:bg-primary-container transition-colors active:scale-95"
                        >
                          <span>Add</span>
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Room Information Footer Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end pointer-events-auto">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-surface/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                  {EXPLORE_KYOTO_HERO.lookbookNo}
                </span>
                <span className="flex items-center gap-1 text-surface text-label-sm font-label-sm bg-on-surface/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[14px]">touch_app</span>
                  2 shoppable pins
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-surface font-medium leading-snug">
                {EXPLORE_KYOTO_HERO.title}
              </h3>
              <p className="font-body-sm text-body-sm text-surface/80 mt-1 line-clamp-1">
                {EXPLORE_KYOTO_HERO.subtitle}
              </p>
            </div>
          </div>

          {/* Action Strip Under Showcase */}
          <div className="bg-surface-container-highest px-5 py-3 flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">
              Complete lookbook package
            </span>
            <button
              onClick={() => onNavigate('planner')}
              className="font-label-md text-label-md text-primary font-semibold flex items-center gap-1 hover:underline active:scale-95 transition-transform"
            >
              <span>Explore Entire Room</span>
              <span className="material-symbols-outlined text-[16px]">north_east</span>
            </button>
          </div>
        </div>
      </section>

      {/* Shop by Room Horizontal Scroller */}
      <section className="mb-7">
        <div className="px-margin-mobile flex items-center justify-between mb-3">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">Curated by Room</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Architectural spatial archetypes
            </p>
          </div>
          <button
            onClick={() => onNavigate('planner')}
            className="text-primary font-label-md text-label-md hover:underline font-semibold flex items-center gap-0.5"
          >
            <span>View all</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar px-margin-mobile pb-2">
          {ROOM_ARCHETYPES.map((room) => (
            <div
              key={room.id}
              onClick={() => onNavigate('planner')}
              className="shrink-0 w-36 rounded-2xl overflow-hidden bg-surface-container shadow-sm flex flex-col group cursor-pointer transition-transform duration-300 hover:-translate-y-1 active:scale-95"
            >
              <div className="w-full h-44 overflow-hidden relative">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-surface/80 backdrop-blur-sm flex items-center justify-center text-on-surface text-[15px]">
                  <span className="material-symbols-outlined text-[16px]">{room.icon}</span>
                </span>
              </div>
              <div className="p-2.5 flex flex-col">
                <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                  {room.name}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {room.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Pieces This Week (2-Column Grid) */}
      <section className="px-margin-mobile mb-8">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">Trending Pieces</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Collector picks & architectural staples
            </p>
          </div>
          <div className="flex items-center gap-1 bg-surface-container-high rounded-full p-1">
            <button
              onClick={() => setTrendingTab('curated')}
              className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-colors ${
                trendingTab === 'curated'
                  ? 'bg-surface text-on-surface font-semibold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Curated
            </button>
            <button
              onClick={() => setTrendingTab('new')}
              className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-colors ${
                trendingTab === 'new'
                  ? 'bg-surface text-on-surface font-semibold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              New In
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {TRENDING_PIECES.map((piece) => {
            const isWishlisted = wishlistedIds.has(piece.id);
            return (
              <div
                key={piece.id}
                className="bg-surface-container rounded-2xl p-3 flex flex-col justify-between shadow-xs relative group border border-outline-variant/20 hover:border-outline-variant/60 transition-all"
              >
                {/* Wishlist Button */}
                <button
                  aria-label="Save to wishlist"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(piece.id);
                  }}
                  className={`wishlist-btn absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-surface/85 backdrop-blur-md flex items-center justify-center transition-all shadow-xs active:scale-125 ${
                    isWishlisted ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{
                      fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0",
                    }}
                  >
                    {isWishlisted ? 'favorite' : 'favorite_border'}
                  </span>
                </button>

                {/* Product Image */}
                <div
                  onClick={() => onSelectProduct(piece)}
                  className="w-full h-36 rounded-xl overflow-hidden bg-surface-container-lowest mb-3 flex items-center justify-center relative cursor-pointer"
                >
                  <img
                    src={piece.image}
                    alt={piece.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {piece.tone && (
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-surface/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm">
                      {piece.tone}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col flex-1 cursor-pointer" onClick={() => onSelectProduct(piece)}>
                  <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider">
                    {piece.subtitle}
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface leading-tight mt-0.5 truncate">
                    {piece.name}
                  </h4>
                  <span className="font-metric-price text-metric-price text-on-surface font-semibold mt-1.5">
                    ${piece.price}
                  </span>
                </div>

                {/* AR Button */}
                <button
                  onClick={() => onNavigate('planner')}
                  className="mt-3 w-full py-2 px-2.5 rounded-xl bg-surface-container-highest hover:bg-secondary-container hover:text-on-secondary-container text-on-surface font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-colors active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
                  <span>View in Room</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Magazine Editorial Spotlight: Lighting as Sculpture */}
      <section className="px-margin-mobile mb-4">
        <div className="bg-surface-container-high rounded-3xl p-5 shadow-sm relative overflow-hidden border border-outline-variant/30">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-tertiary-fixed/30 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
              Curator's Spotlight
            </span>
          </div>
          <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface leading-tight">
            Lighting as Sculpture
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
            Cast luminous warmth through forms that command space as fine art even when unlit. Our edit of washi paper globes, brushed bronze pendants, and alabaster table domes.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-4">
            {LIGHTING_SPOTLIGHT.map((light) => (
              <div
                key={light.id}
                className="bg-surface rounded-2xl p-2.5 flex flex-col shadow-xs cursor-pointer hover:shadow-md transition-shadow"
                onClick={() =>
                  onAddToCart({
                    id: light.id,
                    name: light.name,
                    price: light.price,
                    category: 'lighting',
                    image: light.image,
                  })
                }
              >
                <div className="w-full h-28 rounded-xl overflow-hidden bg-surface-container-low mb-2">
                  <img
                    src={light.image}
                    alt={light.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h5 className="font-headline-sm text-headline-sm text-on-surface text-[15px] leading-tight truncate">
                  {light.name}
                </h5>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {light.material}
                </span>
                <span className="font-metric-price text-metric-price text-primary font-semibold mt-1">
                  ${light.price}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between border-t border-outline-variant/30">
            <div className="flex items-center -space-x-2">
              <div className="w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-label-sm text-[10px]">
                AD
              </div>
              <div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-[10px]">
                KH
              </div>
              <span className="pl-3 font-body-sm text-body-sm text-on-surface-variant">
                Recommended by 12 Designers
              </span>
            </div>
            <button
              onClick={() => setStoryOpen(!storyOpen)}
              className="px-4 py-2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
            >
              <span>{storyOpen ? 'Close Story' : 'Read Story'}</span>
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
            </button>
          </div>

          {storyOpen && (
            <div className="mt-4 p-4 rounded-2xl bg-surface-container font-body-md text-body-md text-on-surface border border-outline-variant/30 animate-in fade-in">
              <h4 className="font-headline-sm text-headline-sm mb-1">
                The Architecture of Gentle Glow
              </h4>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                Natural morning sunlight moves dynamically through Japandi homes. By incorporating handmade washi lanterns and textured bisque ceramics, lighting becomes an extension of the room's plaster texture, creating gentle gradations and deep restorative serenity.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
