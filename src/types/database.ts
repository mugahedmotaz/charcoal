// تحديث أنواع البيانات لتتوافق مع قاعدة البيانات الجديدة

export interface BurgerItem {
  id: string;
  name: string;
  description: string;
  beef_price: number;
  chicken_price: number;
  original_beef_price?: number;
  original_chicken_price?: number;
  image: string;
  category_id: string;
  is_popular?: boolean;
  is_new?: boolean;
  is_active?: boolean;
  sort_order?: number;
  category?: Category;
}

export interface BurgerExtra {
  id: string;
  name: string;
  price: number;
  is_active?: boolean;
  sort_order?: number;
}

export interface CartItem {
  id: string;
  product: BurgerItem;
  meat_type: 'beef' | 'chicken';
  quantity: number;
  selectedExtras: BurgerExtra[];
  totalPrice: number;
}

export interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: BurgerItem, meatType: 'beef' | 'chicken', extras: BurgerExtra[]) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
  sort_order?: number;
  is_active?: boolean;
}

export interface AdminContextType {
  products: BurgerItem[];
  categories: Category[];
  extras: BurgerExtra[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<BurgerItem, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<BurgerItem>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export interface OrderData {
  customer_name: string;
  customer_phone?: string;
  customer_address?: string;
  items: {
    product_id: string;
    meat_type: 'beef' | 'chicken';
    quantity: number;
    unit_price: number;
    extras: {
      extra_id: string;
      quantity: number;
      unit_price: number;
    }[];
  }[];
}