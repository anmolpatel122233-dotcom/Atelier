import React, { useState } from 'react';
import { Screen, Product, CartItem } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CartDrawer } from './components/CartDrawer';
import { ExploreView } from './views/ExploreView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { ARView } from './views/ARView';
import { PlannerView } from './views/PlannerView';
import { SavedView } from './views/SavedView';
import { SHOP_HERO_PRODUCT } from './data/mockData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product>(SHOP_HERO_PRODUCT);
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set(['kanso-lounge', 'trend-1']));
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      productId: SHOP_HERO_PRODUCT.id,
      name: 'Kanso Lounge Chair',
      price: 890,
      image: SHOP_HERO_PRODUCT.image,
      selectedColor: 'Oat Bouclé',
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedName, setLastAddedName] = useState('Kanso Lounge Chair');
  const [infoModal, setInfoModal] = useState<{ title: string; message: string } | null>(null);

  // Cart actions
  const handleAddToCart = (product: Product, tone?: string) => {
    setLastAddedName(product.name);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          selectedColor: tone || 'Oat Bouclé',
          quantity: 1,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId: string) => {
    setWishlistedIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Atelier - Kanso Lounge Chair',
        text: 'Discover Japandi interior curation and spatial AR view.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      setInfoModal({
        title: 'Share Piece',
        message: 'Link to this piece copied to clipboard! Ready to share with your interior design circle.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col items-center selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Container framing for mobile & desktop */}
      <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl min-h-screen bg-surface flex flex-col relative shadow-[0_0_50px_rgba(30,27,24,0.06)] border-x border-outline-variant/20">
        {/* Navigation Bar Header */}
        <Header
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          onOpenNotifications={() =>
            setInfoModal({
              title: 'Concierge Updates',
              message: 'Your custom white-glove arrival window for Kanso Bouclé Lounge has been reserved for Friday morning.',
            })
          }
          onOpenSearch={() => setCurrentScreen('shop')}
          onShare={handleShare}
        />

        {/* Main Content Stage */}
        <main className="flex-1 flex flex-col relative w-full pt-16">
          {currentScreen === 'explore' && (
            <ExploreView
              onNavigate={setCurrentScreen}
              onSelectProduct={(p) => {
                setSelectedProduct(p);
                setCurrentScreen('product');
              }}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistedIds={wishlistedIds}
            />
          )}

          {currentScreen === 'shop' && (
            <ShopView
              onNavigate={setCurrentScreen}
              onSelectProduct={(p) => {
                setSelectedProduct(p);
                setCurrentScreen('product');
              }}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistedIds={wishlistedIds}
              cartCount={totalCartCount}
              cartTotal={totalCartPrice}
              lastAddedName={lastAddedName}
              onOpenCart={() => setIsCartOpen(true)}
            />
          )}

          {currentScreen === 'product' && (
            <ProductDetailView
              onNavigate={setCurrentScreen}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={wishlistedIds.has(selectedProduct.id)}
            />
          )}

          {currentScreen === 'ar' && (
            <ARView
              onNavigate={setCurrentScreen}
              onAddToCart={handleAddToCart}
              onOpenCart={() => setIsCartOpen(true)}
              onSaveToRoomPlan={() => {
                setInfoModal({
                  title: 'Saved to Room Plan',
                  message: 'Kanso Lounge Chair with 1:1 scale calibration and 142° NE orientation added to "Primary Living Room".',
                });
              }}
            />
          )}

          {currentScreen === 'planner' && (
            <PlannerView
              onNavigate={setCurrentScreen}
              onAddToCart={handleAddToCart}
              onOpenCart={() => setIsCartOpen(true)}
            />
          )}

          {currentScreen === 'saved' && (
            <SavedView
              onNavigate={setCurrentScreen}
              onSelectProduct={(p) => {
                setSelectedProduct(p);
                setCurrentScreen('product');
              }}
              onAddToCart={handleAddToCart}
              wishlistedIds={wishlistedIds}
              onToggleWishlist={handleToggleWishlist}
            />
          )}
        </main>

        {/* Global Bottom Navigation */}
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          savedCount={wishlistedIds.size}
        />

        {/* Checkout Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={handleClearCart}
        />

        {/* Info/Share Modal */}
        {infoModal && (
          <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-sm rounded-2xl bg-surface p-5 shadow-2xl flex flex-col gap-3 border border-outline-variant/30 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  {infoModal.title}
                </h3>
                <button
                  onClick={() => setInfoModal(null)}
                  className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {infoModal.message}
              </p>
              <button
                onClick={() => setInfoModal(null)}
                className="mt-2 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-sm active:scale-95 transition-transform"
              >
                Understood
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
