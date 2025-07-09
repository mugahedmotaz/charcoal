
import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, Star, Clock } from 'lucide-react';
import { BurgerItem, BurgerExtra } from '../types/burger';
import { useCart } from '../contexts/CartContext';

interface BurgerDetailsProps {
  burger: BurgerItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const BurgerDetails: React.FC<BurgerDetailsProps> = ({ burger, isOpen, onClose }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<BurgerExtra[]>([]);

  if (!burger || !isOpen) return null;

  const handleExtraToggle = (extra: BurgerExtra) => {
    setSelectedExtras(prev => {
      const exists = prev.find(e => e.id === extra.id);
      if (exists) {
        return prev.filter(e => e.id !== extra.id);
      } else {
        return [...prev, extra];
      }
    });
  };

  const extrasPrice = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  const totalPrice = (burger.price + extrasPrice) * quantity;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(burger, selectedExtras);
    }
    onClose();
    setQuantity(1);
    setSelectedExtras([]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="relative">
          <img 
            src={burger.image} 
            alt={burger.name}
            className="w-full h-64 object-cover rounded-t-3xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {burger.popular && (
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                الأكثر مبيعاً
              </span>
            )}
            {burger.new && (
              <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                جديد
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title and Info */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{burger.name}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{burger.description}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="w-4 h-4 ml-1" />
                <span>15-20 دقيقة</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 ml-1 text-yellow-400" />
                <span>4.{Math.floor(Math.random() * 3) + 6}</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-red-600">
              {burger.price} ج.س
            </span>
            {burger.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                {burger.originalPrice} ج.س
              </span>
            )}
          </div>

          {/* Extras */}
          {burger.extras.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">الإضافات المتاحة</h3>
              <div className="space-y-3">
                {burger.extras.map((extra) => (
                  <label 
                    key={extra.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-red-500 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedExtras.some(e => e.id === extra.id)}
                        onChange={() => handleExtraToggle(extra)}
                        className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 ml-3"
                      />
                      <span className="font-medium text-gray-800">{extra.name}</span>
                    </div>
                    <span className="font-bold text-red-600">+{extra.price} ج.س</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">الكمية</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-2xl font-bold text-gray-800 px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Total and Add to Cart */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium text-gray-700">الإجمالي:</span>
              <span className="text-2xl font-bold text-red-600">{totalPrice} ج.س</span>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              إضافة للسلة ({quantity})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerDetails;
