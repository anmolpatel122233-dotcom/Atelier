import React, { useState } from 'react';
import { Screen, Product } from '../types';
import {
  PRODUCT_SLIDES,
  UGC_STORIES,
  PAIRS_BEAUTIFULLY,
  SHOP_HERO_PRODUCT,
} from '../data/mockData';

interface ProductDetailViewProps {
  onNavigate: (screen: Screen) => void;
  onAddToCart: (product: Product, tone?: string) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  onNavigate,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showHotspot, setShowHotspot] = useState(false);
  const [selectedFabric, setSelectedFabric] = useState('Oat Bouclé');
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    dimensions: true,
    materials: false,
    care: false,
  });
  const [addedToast, setAddedToast] = useState(false);

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleOrder = () => {
    onAddToCart(SHOP_HERO_PRODUCT, selectedFabric);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
    }, 2200);
  };

  const swatches = [
    { name: 'Oat Bouclé', color: '#f4ede4', textColor: 'text-on-surface' },
    { name: 'Warm Charcoal Wool', label: 'Charcoal', color: '#2e3032', textColor: 'text-on-surface' },
    { name: 'Terracotta Velvet', label: 'Terracotta', color: '#994525', textColor: 'text-on-surface' },
  ];

  return (
    <div className="flex flex-col w-full pb-32">
      {/* Interactive Spatial Showcase & Gallery Container */}
      <section className="relative w-full bg-surface-container-low overflow-hidden">
        {/* Gallery Reel Carousel */}
        <div className="relative w-full aspect-[4/5] max-h-[500px] overflow-hidden">
          <img
            src={PRODUCT_SLIDES[activeSlide]}
            alt="Kanso Curved Bouclé Lounge Chair"
            className="w-full h-full object-cover transition-all duration-500 ease-out"
          />

          {/* Hotspot Node on Slide 1 */}
          {activeSlide === 0 && (
            <div className="absolute top-[38%] right-[28%] z-20">
              <button
                aria-label="Curved back detail"
                onClick={() => setShowHotspot(!showHotspot)}
                className="w-8 h-8 rounded-full bg-surface/90 backdrop-blur-md shadow-md flex items-center justify-center transition-transform active:scale-90"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              </button>

              {showHotspot && (
                <div className="absolute top-10 right-0 bg-surface-container-lowest/95 backdrop-blur-md px-space-md py-space-sm rounded-xl shadow-xl w-[210px] z-30 border border-outline-variant/30 animate-in fade-in">
                  <div className="flex justify-between items-start">
                    <p className="font-label-md text-label-md text-on-surface">
                      Sculptural Ergonomics
                    </p>
                    <button
                      onClick={() => setShowHotspot(false)}
                      className="text-on-surface-variant text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Continuous lumbar support curved in FSC-certified molded beechwood.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Gallery Navigation Floating Controls */}
          <div className="absolute bottom-4 left-0 right-0 px-margin-mobile flex items-center justify-between pointer-events-none">
            {/* Dots Indicator */}
            <div className="flex items-center gap-1.5 bg-surface/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm pointer-events-auto">
              {PRODUCT_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Slide ${idx + 1}`}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === idx
                      ? 'w-4 bg-primary'
                      : 'w-2 bg-outline-variant hover:bg-outline'
                  }`}
                />
              ))}
            </div>

            {/* Spatial Quick Action Button */}
            <button
              onClick={() => onNavigate('ar')}
              className="pointer-events-auto flex items-center gap-2 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">
                view_in_ar
              </span>
              <span className="font-label-lg text-label-lg">View in AR</span>
            </button>
          </div>

          {/* Wishlist Button Overlay */}
          <button
            aria-label="Add to wishlist"
            onClick={() => onToggleWishlist(SHOP_HERO_PRODUCT.id)}
            className={`absolute top-4 right-4 w-11 h-11 rounded-full bg-surface/85 backdrop-blur-md shadow-sm flex items-center justify-center transition-transform active:scale-90 ${
              isWishlisted ? 'text-primary' : 'text-on-surface hover:text-primary'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{
                fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              {isWishlisted ? 'favorite' : 'favorite_border'}
            </span>
          </button>
        </div>
      </section>

      {/* Primary Product Information Block */}
      <div className="px-margin-mobile pt-space-lg flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
            Studio Møller • Copenhagen
          </span>
          <div className="flex items-center gap-1 text-tertiary">
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-label-md text-label-md font-semibold text-on-surface">
              4.9
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              (42 reviews)
            </span>
          </div>
        </div>

        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
          Kanso Curved Bouclé Lounge Chair
        </h2>

        {/* Pricing Row with Financing */}
        <div className="flex flex-col gap-1 mt-1">
          <div className="flex items-baseline gap-space-sm">
            <span className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-on-surface">
              $890
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Free White-Glove In-Home Placement
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-surface-container w-fit border border-outline-variant/30">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              or 4 interest-free payments of
            </span>
            <span className="font-label-md text-label-md font-bold text-on-surface">
              $222.50
            </span>
            <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-primary">
              Klarna
            </span>
          </div>
        </div>
      </div>

      {/* Finish & Swatch Selection Module */}
      <div className="px-margin-mobile mt-space-lg flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface">
            Fabric & Material Tone
          </span>
          <span className="font-body-sm text-body-sm font-semibold text-primary">
            {selectedFabric}
          </span>
        </div>

        {/* Swatch Radio Items */}
        <div className="flex items-center gap-space-md">
          {swatches.map((swatch) => {
            const isSelected = selectedFabric === swatch.name;
            return (
              <button
                key={swatch.name}
                onClick={() => setSelectedFabric(swatch.name)}
                className={`relative flex items-center gap-2 p-1.5 pr-3 rounded-full transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-surface-container-high ring-2 ring-primary'
                    : 'bg-surface-container hover:bg-surface-container-high'
                }`}
              >
                <div
                  className="w-7 h-7 rounded-full shadow-inner flex items-center justify-center border border-black/10"
                  style={{ backgroundColor: swatch.color }}
                >
                  {isSelected && (
                    <span
                      className={`material-symbols-outlined text-[14px] ${
                        swatch.name === 'Warm Charcoal Wool' ? 'text-white' : 'text-on-surface'
                      }`}
                    >
                      check
                    </span>
                  )}
                </div>
                <span
                  className={`font-label-md text-label-md pr-1 ${
                    isSelected ? 'text-on-surface font-semibold' : 'text-on-surface-variant'
                  }`}
                >
                  {swatch.label || swatch.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Spatial Fit & Dimension Summary Badge Grid */}
      <div className="px-margin-mobile mt-space-lg">
        <div className="bg-surface-container rounded-2xl p-space-md grid grid-cols-3 gap-space-xs text-center border border-outline-variant/30">
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-secondary text-[20px] mb-1">
              aspect_ratio
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Footprint</span>
            <span className="font-label-md text-label-md font-semibold text-on-surface">
              34" x 32"
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-secondary text-[20px] mb-1">
              airline_seat_recline_normal
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Seat Depth</span>
            <span className="font-label-md text-label-md font-semibold text-on-surface">
              23.5 in
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-secondary text-[20px] mb-1">
              fitness_center
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Weight</span>
            <span className="font-label-md text-label-md font-semibold text-on-surface">
              46 lbs
            </span>
          </div>
        </div>
      </div>

      {/* Technical Spatial Specs Accordion Section */}
      <div className="px-margin-mobile mt-space-lg flex flex-col gap-2">
        {/* Accordion 1: Spatial Measurements */}
        <div className="bg-surface-container-low rounded-xl overflow-hidden transition-all border border-outline-variant/30">
          <button
            onClick={() => toggleAccordion('dimensions')}
            className="w-full px-space-md py-4 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-primary">
                square_foot
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface">
                Dimensions & Spatial Clearance
              </span>
            </div>
            <span
              className={`material-symbols-outlined text-[20px] text-on-surface-variant transition-transform duration-200 ${
                openAccordions.dimensions ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
          {openAccordions.dimensions && (
            <div className="px-space-md pb-space-md pt-0">
              <div className="bg-surface-container rounded-lg p-space-sm flex flex-col gap-2">
                <div className="flex justify-between py-1 font-body-sm text-body-sm border-b border-outline-variant/20">
                  <span className="text-on-surface-variant">Overall Dimensions</span>
                  <span className="font-semibold text-on-surface">34"W × 32"D × 30"H</span>
                </div>
                <div className="flex justify-between py-1 font-body-sm text-body-sm border-b border-outline-variant/20">
                  <span className="text-on-surface-variant">Seat Height from Floor</span>
                  <span className="font-semibold text-on-surface">17.25" (44 cm)</span>
                </div>
                <div className="flex justify-between py-1 font-body-sm text-body-sm border-b border-outline-variant/20">
                  <span className="text-on-surface-variant">Armrest Clearance</span>
                  <span className="font-semibold text-on-surface">22.5"</span>
                </div>
                <div className="flex justify-between py-1 font-body-sm text-body-sm">
                  <span className="text-on-surface-variant">Box Delivery Threshold</span>
                  <span className="font-semibold text-on-surface">Fits doorways 30"+</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 2: Materials & Craft */}
        <div className="bg-surface-container-low rounded-xl overflow-hidden transition-all border border-outline-variant/30">
          <button
            onClick={() => toggleAccordion('materials')}
            className="w-full px-space-md py-4 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-primary">eco</span>
              <span className="font-headline-sm text-headline-sm text-on-surface">
                Sustainable Materials
              </span>
            </div>
            <span
              className={`material-symbols-outlined text-[20px] text-on-surface-variant transition-transform duration-200 ${
                openAccordions.materials ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
          {openAccordions.materials && (
            <div className="px-space-md pb-space-md pt-0 font-body-md text-body-md text-on-surface-variant">
              <p className="mb-2">
                Crafted with a responsibly harvested, kiln-dried internal FSC-certified beech frame. Cushioning incorporates recycled feather-down blend and high-resilience memory foam for tactile contouring without permanent sagging.
              </p>
              <div className="flex items-center gap-2 mt-3 text-secondary font-label-md text-label-md">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>OEKO-TEX® Standard 100 Non-toxic certified</span>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 3: Care Guide */}
        <div className="bg-surface-container-low rounded-xl overflow-hidden transition-all border border-outline-variant/30">
          <button
            onClick={() => toggleAccordion('care')}
            className="w-full px-space-md py-4 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-primary">
                dry_cleaning
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface">
                Care & Longevity
              </span>
            </div>
            <span
              className={`material-symbols-outlined text-[20px] text-on-surface-variant transition-transform duration-200 ${
                openAccordions.care ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
          {openAccordions.care && (
            <div className="px-space-md pb-space-md pt-0 font-body-md text-body-md text-on-surface-variant">
              <p>
                Vacuum regularly using a soft horsehair brush attachment to preserve boucle loops. Blot spills immediately with an undyed damp cloth. Professional dry extraction recommended annually.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 'Styled in Real Homes' UGC Carousel */}
      <section className="mt-space-xl flex flex-col gap-space-md">
        <div className="px-margin-mobile flex items-end justify-between">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
              Community Spaces
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface">
              Styled in Real Homes
            </h3>
          </div>
          <button className="font-label-md text-label-md font-semibold text-primary flex items-center gap-0.5 hover:underline">
            <span>View all 128</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="flex gap-space-md overflow-x-auto px-margin-mobile pb-2 no-scrollbar">
          {UGC_STORIES.map((ugc) => (
            <div
              key={ugc.id}
              className="shrink-0 w-64 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col border border-outline-variant/30"
            >
              <div className="relative aspect-[4/5] w-full">
                <img
                  src={ugc.image}
                  alt={ugc.author}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-inverse-surface/80 backdrop-blur-md px-2.5 py-1 rounded-full text-inverse-on-surface font-label-sm text-label-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] text-tertiary-fixed">
                    location_on
                  </span>
                  <span>{ugc.location}</span>
                </div>
              </div>
              <div className="p-space-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center font-label-sm text-label-sm font-bold text-on-surface">
                    {ugc.initials}
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface truncate">
                    {ugc.author}
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant italic">
                  "{ugc.quote}"
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Curated Complementary Items ('Pairs Beautifully With') */}
      <section className="mt-space-xl px-margin-mobile flex flex-col gap-space-md">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
              Curation
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface">
              Pairs Beautifully With
            </h3>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Handpicked ensemble
          </span>
        </div>

        <div className="grid grid-cols-2 gap-space-md">
          {PAIRS_BEAUTIFULLY.map((pair) => (
            <div
              key={pair.id}
              className="bg-surface-container-low rounded-2xl p-space-sm flex flex-col justify-between group shadow-sm border border-outline-variant/30"
            >
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-surface-container mb-space-sm relative">
                <img
                  src={pair.image}
                  alt={pair.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <button
                  aria-label={`Add ${pair.name} to cart`}
                  onClick={() =>
                    onAddToCart({
                      id: pair.id,
                      name: pair.name,
                      price: pair.price,
                      category: 'tables',
                      image: pair.image,
                    })
                  }
                  className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-surface/90 shadow-sm flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>
              <div className="flex flex-col">
                <h4 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1">
                  {pair.name}
                </h4>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {pair.subtitle}
                </span>
                <span className="font-metric-price text-metric-price font-bold text-on-surface mt-1">
                  ${pair.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reassurance / Trust Micro-Banner */}
      <div className="px-margin-mobile mt-space-xl mb-4">
        <div className="bg-surface-container-highest/60 rounded-2xl p-space-md flex items-center justify-between gap-space-sm border border-outline-variant/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md font-semibold text-on-surface">
                30-Day In-Home Trial
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Complimentary returns in original packaging
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline-variant text-[20px]">
            chevron_right
          </span>
        </div>
      </div>

      {/* Persistent Floating Dock / Bottom Purchase Bar */}
      <aside className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-outline-variant/20 shadow-[0_-8px_30px_rgba(30,27,24,0.06)] pb-safe">
        <div className="max-w-2xl mx-auto px-margin-mobile py-3 flex items-center gap-space-sm">
          {/* Secondary: Try in Room Planner */}
          <button
            onClick={() => onNavigate('planner')}
            className="flex-1 py-3.5 px-3 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg flex items-center justify-center gap-1.5 transition-all active:scale-95 border border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">
              architecture
            </span>
            <span className="truncate">Room Planner</span>
          </button>

          {/* Primary: Add to Cart with Dynamic State */}
          <button
            onClick={handleOrder}
            className="flex-[1.5] py-3.5 px-4 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center justify-between shadow-md active:scale-98 transition-all hover:bg-primary"
          >
            <span className="font-semibold text-on-primary">
              {addedToast ? 'Added to Bag ✓' : 'Add to Order'}
            </span>
            <span className="font-headline-sm text-headline-sm font-bold text-on-primary">
              $890
            </span>
          </button>
        </div>
      </aside>
    </div>
  );
};
