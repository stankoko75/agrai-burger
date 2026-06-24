import { create } from 'zustand';

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  supplements: { name: string; price: number }[];
  dessert?: { name: string; price: number };
  drink?: { name: string; price: number };
  instructions?: string;
};

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  promoCode: string;
  promoDiscount: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  applyPromo: (code: string) => boolean;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
  getItemCount: () => number;
};

const PROMO_CODES: Record<string, number> = {
  AGRAI10: 0.1,
  NUIT15: 0.15,
  BIENVENUE: 0.2,
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  promoCode: '',
  promoDiscount: 0,

  addItem: (item) => {
    set((state) => {
      const existing = state.items.find(
        (i) => i.productId === item.productId && 
        JSON.stringify(i.supplements) === JSON.stringify(item.supplements)
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === existing.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    });
  },

  removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    }));
  },

  clearCart: () => set({ items: [], promoCode: '', promoDiscount: 0 }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  applyPromo: (code) => {
    const discount = PROMO_CODES[code.toUpperCase()];
    if (discount) {
      set({ promoCode: code.toUpperCase(), promoDiscount: discount });
      return true;
    }
    return false;
  },

  getSubtotal: () => {
    const { items } = get();
    return items.reduce((acc, item) => {
      const supplementsTotal = item.supplements.reduce((s, sup) => s + sup.price, 0);
      const dessertPrice = item.dessert?.price || 0;
      const drinkPrice = item.drink?.price || 0;
      return acc + (item.price + supplementsTotal + dessertPrice + drinkPrice) * item.quantity;
    }, 0);
  },

  getDeliveryFee: () => {
    const subtotal = get().getSubtotal();
    return subtotal >= 25 ? 0 : 2.5;
  },

  getTotal: () => {
    const { promoDiscount } = get();
    const subtotal = get().getSubtotal();
    const delivery = get().getDeliveryFee();
    return subtotal * (1 - promoDiscount) + delivery;
  },

  getItemCount: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
}));
