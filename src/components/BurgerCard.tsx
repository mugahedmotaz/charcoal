
import React, { useState } from 'react';
import { Plus, Star, Clock, Flame } from 'lucide-react';
import { BurgerItem, BurgerExtra } from '../types/burger';
import { useCart } from '../contexts/CartContext';

interface BurgerCardProps {
  burger: BurgerItem;
  onDetailsClick: (burger: BurgerItem) => void;
}

const BurgerCard: React.FC<BurgerCardProps> = ({ burger, onDetailsClick }) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(burger, []);
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onDetailsClick(burger)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={burger.image} 
          alt={burger.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {burger.popular && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center animate-pulse">
              <Flame className="w-3 h-3 ml-1" />
              الأكثر مبيعاً
            </span>
          )}
          {burger.new && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              جديد
            </span>
          )}
          {/* {burger.originalPrice && (
            <span className="bg-yellow-400 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
              خصم {Math.round((1 - burger.price / burger.originalPrice) * 100)}%
            </span>
          )} */}
        </div>

        {/* Quick Add Button */}
        <button
          onClick={handleQuickAdd}
          className={`absolute bottom-3 right-3 bg-yellow-400 hover:bg-yellow-500 text-red-600 p-3 rounded-full shadow-lg transition-all duration-300 transform ${
            isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
          {burger.name}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
          {burger.description}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
          <div className="flex items-center">
            <Clock className="w-3 h-3 ml-1" />
            <span>15-20 دقيقة</span>
          </div>
          <div className="flex items-center">
            <Star className="w-3 h-3 ml-1 text-yellow-400" />
            <span>4.{Math.floor(Math.random() * 3) + 6}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-red-600">
              {burger.price} ج.س
            </span>
            {burger.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {burger.originalPrice} ج.س
              </span>
            )}
          </div>
          
          <button 
            onClick={handleQuickAdd}
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 shadow-md"
          >
            إضافة للسلة
          </button>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default BurgerCard;
