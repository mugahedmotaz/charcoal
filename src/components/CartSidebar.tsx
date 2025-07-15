import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

  /* ======================= حالة بيانات العميل ======================= */
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isOpen) return null;

  /* ======================= توليد رسالة واتساب ======================= */
  const handleCheckout = () => {
    let message = `🛒 *طلب جديد من الموقع*\n\n`;
    items.forEach((item, i) => {
      message += `🍔 *${i + 1}. ${item.burger.name}*\n`;
      message += `الكمية: ${item.quantity}\n`;
      message += `السعر: ${item.burger.price} ج.س\n`;
      if (item.selectedExtras.length)
        message += `الإضافات: ${item.selectedExtras.map(e => e.name).join(', ')}\n`;
      message += '\n';
    });
    message += `🔢 *الإجمالي:* ${totalPrice} ج.س\n\n`;
    message += `📦 *تفـاصيل العميل:*\n`;
    message += `الاسم: ${customerName || '---'}\n`;
    message += `الهاتف: ${customerPhone || '---'}\n`;
    message += `العنوان: ${customerAddress || '---'}\n`;

    const whatsappNumber = '249920486301'; // ← عدّل الرقم
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  /* ======================= واجهة المكوّن ======================= */
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">سلة التسوق</h2>
                <p className="text-white/80 text-sm">{items.length} منتج</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* محتوى السلة */}
        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-32 max-h-[75vh]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 text-gray-500">
              <ShoppingBag className="w-20 h-20 text-gray-300" />
              <h3 className="text-lg font-bold text-gray-800">السلة فارغة</h3>
              <p className="text-gray-600">ابدأ بإضافة البرجر المفضل لديك</p>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-xl"
              >
                تصفح القائمة
              </button>
            </div>
          ) : (
            <>
              {/* أزرار أعلى القائمة */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 text-lg">طلباتك</h3>
                <button
                  onClick={clearCart}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm"
                >
                  <Trash2 className="w-4 h-4" /> مسح الكل
                </button>
              </div>

              {/* عناصر السلة */}
              <div className="space-y-4">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="flex gap-3 bg-gray-50 rounded-2xl p-4 border border-gray-100"
                  >
                    {/* صورة */}
                    <div className="relative shrink-0">
                      <img
                        src={item.burger.image}
                        alt={item.burger.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    {/* تفاصيل */}
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">{item.burger.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">
                        {item.burger.price} ج.س × {item.quantity}
                      </p>
                      {!!item.selectedExtras.length && (
                        <p className="text-xs text-gray-500 mb-2">
                          <span className="font-medium">الإضافات:</span>{' '}
                          {item.selectedExtras.map(e => e.name).join(', ')}
                        </p>
                      )}
                      {/* تحكم بالكمية */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-1.5 rounded-full border hover:bg-gray-100"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 py-1 border rounded-lg text-sm">{item.quantity}</span>
                          <button
                            className="p-1.5 rounded-full border hover:bg-gray-100"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
                            className="p-1 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* فوتر الفاتورة */}
        {items.length > 0 && (
          <div
            className="w-full max-w-md bg-white border-t shadow-md p-4 pb-[calc(16px+env(safe-area-inset-bottom))] fixed bottom-0 left-0"
          >
            {/* المجموع */}
            <div className="flex justify-between mb-3 text-gray-700">
              <span>الإجمالي</span>
              <span className="font-bold text-red-600">{totalPrice} ج.س</span>
            </div>
            {/* زر إتمام الطلب */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 py-3 rounded-xl text-white font-bold"
            >
              <CreditCard className="w-5 h-5" /> إتمام الطلب
            </button>
          </div>
        )}

        {/* نافذة بيانات العميل */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center px-4">
            <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">
              <button
                className="absolute top-4 left-4 text-gray-500 hover:text-red-500"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-center text-xl font-bold mb-5 text-gray-800">تفاصيل التوصيل</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="اسمك الكامل"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 outline-0"
                />
                <input
                  type="tel"
                  placeholder="رقم الهاتف"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2  outline-0 text-right"
                />
                <textarea
                  placeholder="العنوان بالتفصيل"
                  value={customerAddress}
                  onChange={e => setCustomerAddress(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 outline-0"
                />
                <button
                  onClick={() => {
                    handleCheckout();
                    setIsModalOpen(false);
                    onClose(); // إغلاق السلة بعد إرسال الطلب
                  }}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-500 hover:to-orange-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  إرسال الطلب عبر واتساب
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
