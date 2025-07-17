import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  beef_price: number;
  chicken_price: number;
  original_beef_price?: number;
  original_chicken_price?: number;
  image?: string;
  category_id: string;
  is_popular: boolean;
  is_new: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Extra {
  id: string;
  name: string;
  price: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_phone?: string;
  customer_address?: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  meat_type: 'beef' | 'chicken';
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
  product?: Product;
  order_item_extras?: OrderItemExtra[];
}

export interface OrderItemExtra {
  id: string;
  order_item_id: string;
  extra_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  extra?: Extra;
}

export interface AdminUser {
  id: string;
  username: string;
  full_name?: string;
  email?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}