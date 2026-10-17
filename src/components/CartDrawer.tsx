import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isOrdered, setIsOrdered] = useState(false);
  const [isPlacing, setIsPlacing] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const tax = Math.round(subtotal * 0.0825);
  const total = subtotal + tax;

  const handleCheckout = () => {
    setIsPlacing(true);
    setTimeout(() => {
      setIsPlacing(false);
      setIsOrdered(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsOrdered(false);
    onClearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all">
      <div
        className="w-full max-w-lg bg-surface rounded-t-[2.5rem] sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-outline-variant/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="w-12 h-1 bg-outline-variant/60 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Header */}
        <div className="p-space-md border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Order Review ({totalItems})
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Curated atelier items • White-Glove In-Home
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-space-md overflow-y-auto flex-1 flex flex-col gap-3">
          {isOrdered ? (
            <div className="py-8 px-4 flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-md animate-bounce">
                <span className="material-symbols-outlined text-[32px]">verified</span>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Order Confirmed
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                Thank you, Elena. Your curated furnishings are scheduled for white-glove in-home placement. A concierge delivery specialist will reach out within 24 hours.
              </p>
              <div className="p-3 bg-surface-container-low rounded-xl w-full text-left font-body-sm text-body-sm flex justify-between items-center mt-2">
                <span className="text-on-surface-variant">Estimated Delivery</span>
                <span className="font-semibold text-primary">Oct 24 – Oct 28, 2026</span>
              </div>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-md active:scale-95 transition-all"
              >
                Continue Browsing
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-12 flex flex-col items-center text-center gap-2">
              <span className="material-symbols-outlined text-outline text-[40px]">chair</span>
              <p className="font-headline-sm text-headline-sm text-on-surface">Your bag is empty</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Explore our catalog to add handcrafted furnishings to your space.
              </p>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between gap-3 shadow-xs"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover bg-surface-container shrink-0"
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <h4 className="font-headline-sm text-[15px] text-on-surface truncate">
                      {item.name}
                    </h4>
                    {item.selectedColor && (
                      <span className="font-body-sm text-[11px] text-on-surface-variant">
                        Tone: {item.selectedColor}
                      </span>
                    )}
                    <span className="font-metric-price text-body-md text-primary font-semibold mt-0.5">
                      ${item.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-on-surface-variant hover:text-error text-xs transition-colors"
                      aria-label="Remove item"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                    <div className="flex items-center gap-2 bg-surface-container rounded-full px-2 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="text-on-surface font-bold text-sm w-4 h-4 flex items-center justify-center hover:text-primary"
                      >
                        -
                      </button>
                      <span className="font-label-sm text-xs font-semibold text-on-surface min-w-[12px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="text-on-surface font-bold text-sm w-4 h-4 flex items-center justify-center hover:text-primary"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* White glove notice */}
              <div className="p-3 rounded-xl bg-secondary-container/50 flex items-center gap-2.5">
                <span className="material-symbols-outlined text-secondary text-[20px]">
                  local_shipping
                </span>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-semibold text-on-surface">
                    Complimentary White-Glove Service
                  </span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">
                    Uncrating, assembly, placement in room, packaging recycling included.
                  </span>
                </div>
              </div>

              {/* Price summary */}
              <div className="bg-surface-container-low rounded-xl p-3 flex flex-col gap-1.5 mt-2">
                <div className="flex justify-between text-body-sm font-body-sm text-on-surface-variant">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-body-sm font-body-sm text-on-surface-variant">
                  <span>White-Glove In-Home Delivery</span>
                  <span className="text-secondary font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-body-sm font-body-sm text-on-surface-variant">
                  <span>Estimated Tax</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-outline-variant/40 pt-2 mt-1 flex justify-between font-headline-sm text-headline-sm text-on-surface">
                  <span>Total</span>
                  <span className="text-primary font-bold">${total.toLocaleString()}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        {!isOrdered && items.length > 0 && (
          <div className="p-space-md border-t border-outline-variant/30 flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-3.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
            >
              Continue
            </button>
            <button
              onClick={handleCheckout}
              disabled={isPlacing}
              className="flex-1 py-3.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-transform disabled:opacity-60"
            >
              {isPlacing ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    progress_activity
                  </span>
                  <span>Securing Order...</span>
                </>
              ) : (
                <>
                  <span>Complete Order</span>
                  <span className="font-bold">• ${total.toLocaleString()}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
