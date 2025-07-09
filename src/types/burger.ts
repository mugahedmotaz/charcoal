
export interface BurgerItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'burger' | 'combo' | 'sides' | 'drinks';
  popular?: boolean;
  new?: boolean;
  extras: BurgerExtra[];
}

export interface BurgerExtra {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  burger: BurgerItem;
  quantity: number;
  selectedExtras: BurgerExtra[];
  totalPrice: number;
}

export interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (burger: BurgerItem, extras: BurgerExtra[]) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}
