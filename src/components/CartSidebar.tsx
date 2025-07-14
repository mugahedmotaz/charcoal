import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard, MapPin, Clock } from 'lucide-react';
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
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300" 
        onClick={onClose} 
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">سلة التسوق</h2>
                  <p className="text-white/80 text-sm">{items.length} منتج في السلة</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Delivery Info */}
            {/* <div className="flex items-center gap-4 text-sm text-white/90">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>15-20 دقيقة</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>توصيل مجاني</span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto" style={{ height: 'calc(100vh - 300px)' }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">السلة فارغة</h3>
              <p className="text-center text-gray-600 mb-6">
                ابدأ بإضافة البرجر المفضل لديك من القائمة
              </p>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition-transform"
              >
                تصفح القائمة
              </button>
            </div>
          ) : (
            <div className="p-4">
              {/* Clear Cart Button */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 text-lg">طلباتك</h3>
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  مسح الكل
                </button>
              </div>

              {/* Cart Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-2xl p-4 hover:shadow-md transition-all duration-300 border border-gray-100">
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="relative">
                        <img 
                          src={item.burger.image} 
                          alt={item.burger.name}
                          className="w-16 h-16 object-cover rounded-xl"
                        />
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 mb-1">{item.burger.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.burger.price} ج.س × {item.quantity}
                        </p>
                        
                        {/* Extras */}
                        {item.selectedExtras.length > 0 && (
                          <div className="text-xs text-gray-500 mb-3 bg-white rounded-lg p-2">
                            <span className="font-medium">الإضافات: </span>
                            {item.selectedExtras.map(e => e.name).join(', ')}
                          </div>
                        )}

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="bg-white hover:bg-gray-100 p-2 rounded-full shadow-sm border border-gray-200 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold px-3 py-1 bg-white rounded-lg border border-gray-200 min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="bg-white hover:bg-gray-100 p-2 rounded-full shadow-sm border border-gray-200 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-red-600 text-lg">
                              {item.totalPrice * item.quantity} ج.س
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-lg transition-colors"
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
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className=" border-t border-gray-200 p-6 bg-white fixed  left-0  w-full max-w-md" style={{ top: '430px' }}>
            {/* Order Summary */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>المجموع الفرعي</span>
                <span>{totalPrice} ج.س</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>رسوم التوصيل</span>
                <span className="text-green-600 font-medium">مجاني</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">الإجمالي</span>
                  <span className="text-2xl font-bold text-red-600">{totalPrice} ج.س</span>
                </div>
              </div>
            </div>
            
            {/* Checkout Button */}
            <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
              <CreditCard className="w-5 h-5" />
              <span>إتمام الطلب</span>
            </button>
            
            {/* Continue Shopping */}
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;