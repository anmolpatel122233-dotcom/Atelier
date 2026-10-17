import React from 'react';
import { Screen, Product } from '../types';
import {
  SHOP_HERO_PRODUCT,
  SHOP_PRODUCTS,
  TRENDING_PIECES,
} from '../data/mockData';

interface SavedViewProps {
  onNavigate: (screen: Screen) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  wishlistedIds: Set<string>;
  onToggleWishlist: (productId: string) => void;
}

export const SavedView: React.FC<SavedViewProps> = ({
  onNavigate,
  onSelectProduct,
  onAddToCart,
  wishlistedIds,
  onToggleWishlist,
}) => {
  const allProducts = [SHOP_HERO_PRODUCT, ...SHOP_PRODUCTS, ...TRENDING_PIECES];
  const savedProducts = allProducts.filter((p) => wishlistedIds.has(p.id));

  return (
    <div className="flex flex-col w-full pb-28 px-margin-mobile pt-3 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
            Personal Collection
          </span>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
            Saved & Favorites
          </h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
          {savedProducts.length} Items
        </span>
      </div>

      {/* Saved Room Concept */}
      <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/30 mb-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">
              architecture
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Primary Living Room Plan
            </h3>
          </div>
          <span className="font-body-sm text-[11px] text-secondary">Updated 2h ago</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          18' × 14' • 4 active pieces staged with warm afternoon southwest sunlight exposure.
        </p>
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => onNavigate('planner')}
            className="flex-1 py-2 px-3 rounded-full bg-on-surface text-surface font-label-sm text-label-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[15px]">view_in_ar</span>
            <span>Open in 2D/3D Planner</span>
          </button>
          <button
            onClick={() => onNavigate('ar')}
            className="py-2 px-4 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[15px]">camera</span>
            <span>Launch AR</span>
          </button>
        </div>
      </div>

      {/* Saved Items List */}
      <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">
        Wishlisted Furnishings
      </h3>

      {savedProducts.length === 0 ? (
        <div className="py-12 flex flex-col items-center text-center gap-3 bg-surface-container-low rounded-2xl border border-outline-variant/20">
          <span className="material-symbols-outlined text-outline text-[36px]">
            favorite_border
          </span>
          <p className="font-headline-sm text-headline-sm text-on-surface">No saved items yet</p>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
            Tap the heart icon on any piece across the Explore and Shop views to curate your collection.
          </p>
          <button
            onClick={() => onNavigate('shop')}
            className="mt-2 px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-sm active:scale-95 transition-all"
          >
            Browse Atelier Shop
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {savedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="bg-surface-container-lowest rounded-2xl p-3 flex flex-col justify-between shadow-xs relative group border border-outline-variant/30 cursor-pointer hover:shadow-md transition-all"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(product.id);
                }}
                className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-surface/90 backdrop-blur-md flex items-center justify-center text-primary shadow-xs active:scale-90"
              >
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  favorite
                </span>
              </button>
              <div className="w-full h-32 rounded-xl overflow-hidden bg-surface-container mb-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h4 className="font-headline-sm text-[15px] text-on-surface truncate leading-tight">
                {product.name}
              </h4>
              <span className="font-metric-price text-metric-price text-primary font-semibold mt-1">
                ${product.price.toLocaleString()}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
                className="mt-2 py-1.5 px-3 rounded-full bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary font-label-sm text-label-sm flex items-center justify-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">shopping_bag</span>
                <span>Add to Order</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
