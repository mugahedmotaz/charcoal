import { useState, useEffect } from 'react';
import { supabase, Category, Product, Extra, Order } from '../lib/supabase';

// Hook للحصول على الأصناف
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ');
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, error, refetch: fetchCategories };
};

// Hook للحصول على المنتجات
export const useProducts = (categoryId?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('products')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('is_active', true)
        .order('sort_order');

      if (categoryId && categoryId !== 'all') {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ');
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refetch: fetchProducts };
};

// Hook للحصول على الإضافات
export const useExtras = () => {
  const [extras, setExtras] = useState<Extra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExtras();
  }, []);

  const fetchExtras = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('extras')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;
      setExtras(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ');
    } finally {
      setLoading(false);
    }
  };

  return { extras, loading, error, refetch: fetchExtras };
};

// Hook للحصول على الطلبات (للمشرفين)
export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items(
            *,
            product:products(*),
            order_item_extras(
              *,
              extra:extras(*)
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ');
    } finally {
      setLoading(false);
    }
  };

  return { orders, loading, error, refetch: fetchOrders };
};

// Hook لإنشاء طلب جديد
export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (orderData: {
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
  }) => {
    try {
      setLoading(true);
      setError(null);

      // حساب المبلغ الإجمالي
      const totalAmount = orderData.items.reduce((total, item) => {
        const itemTotal = item.unit_price * item.quantity;
        const extrasTotal = item.extras.reduce((extrasSum, extra) => 
          extrasSum + (extra.unit_price * extra.quantity), 0
        );
        return total + itemTotal + extrasTotal;
      }, 0);

      // إنشاء الطلب
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: orderData.customer_name,
          customer_phone: orderData.customer_phone,
          customer_address: orderData.customer_address,
          total_amount: totalAmount,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // إضافة عناصر الطلب
      for (const item of orderData.items) {
        const { data: orderItem, error: itemError } = await supabase
          .from('order_items')
          .insert({
            order_id: order.id,
            product_id: item.product_id,
            meat_type: item.meat_type,
            quantity: item.quantity,
            unit_price: item.unit_price,
            total_price: item.unit_price * item.quantity
          })
          .select()
          .single();

        if (itemError) throw itemError;

        // إضافة إضافات العنصر
        if (item.extras.length > 0) {
          const extraInserts = item.extras.map(extra => ({
            order_item_id: orderItem.id,
            extra_id: extra.extra_id,
            quantity: extra.quantity,
            unit_price: extra.unit_price,
            total_price: extra.unit_price * extra.quantity
          }));

          const { error: extrasError } = await supabase
            .from('order_item_extras')
            .insert(extraInserts);

          if (extrasError) throw extrasError;
        }
      }

      return order;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ في إنشاء الطلب';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createOrder, loading, error };
};