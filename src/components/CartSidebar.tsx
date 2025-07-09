
import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6" />
              <h2 className="text-xl font-bold">سلة التسوق</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-yellow-300 transition-colors p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-white/80 mt-2">{items.length} منتج في السلة</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4" style={{ height: 'calc(100vh - 200px)' }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">السلة فارغة</p>
              <p className="text-sm text-center">ابدأ بإضافة البرجر المفضل لديك!</p>
            </div>
          ) : (
            <>
              {/* Clear Cart Button */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">طلباتك</h3>
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                >
                  مسح الكل
                </button>
              </div>

              {/* Cart Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-2xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      {/* Image */}
                      <img 
                        src={item.burger.image} 
                        alt={item.burger.name}
                        className="w-16 h-16 object-cover rounded-xl"
                      />
                      
                      {/* Details */}
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 mb-1">{item.burger.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.burger.price} ج.س × {item.quantity}
                        </p>
                        
                        {/* Extras */}
                        {item.selectedExtras.length > 0 && (
                          <div className="text-xs text-gray-500 mb-2">
                            الإضافات: {item.selectedExtras.map(e => e.name).join(', ')}
                          </div>
                        )}

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="bg-white hover:bg-gray-100 p-1 rounded-full shadow-sm border"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-medium px-2">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="bg-white hover:bg-gray-100 p-1 rounded-full shadow-sm border"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-red-600">
                              {item.totalPrice * item.quantity} ج.س
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold text-gray-800">الإجمالي:</span>
              <span className="text-2xl font-bold text-red-600">{totalPrice} ج.س</span>
            </div>
            
            <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-105 shadow-lg">
              إتمام الطلب 🚀
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
