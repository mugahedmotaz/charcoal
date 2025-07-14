import React, { useState } from 'react';
import { Plus, Star, Clock, Flame, Heart, Eye } from 'lucide-react';
import { BurgerItem } from '../types/burger';
import { useCart } from '../contexts/CartContext';

interface BurgerCardProps {
  burger: BurgerItem;
  onDetailsClick: (burger: BurgerItem) => void;
}

const BurgerCard: React.FC<BurgerCardProps> = ({ burger, onDetailsClick }) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(burger, []);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div 
      className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-3 border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onDetailsClick(burger)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-3xl">
        <img 
          src={burger.image} 
          alt={burger.name}
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {burger.popular && (
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center shadow-lg animate-pulse">
              <Flame className="w-3 h-3 ml-1" />
              الأكثر مبيعاً
            </div>
          )}
          {burger.new && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              جديد
            </div>
          )}
          {burger.originalPrice && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              خصم {Math.round((1 - burger.price / burger.originalPrice) * 100)}%
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleLike}
            className={`p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isLiked 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            } ${isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDetailsClick(burger);
            }}
            className={`p-2.5 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-blue-500 transition-all duration-300 ${
              isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add Button */}
        <button
          onClick={handleQuickAdd}
          className={`absolute bottom-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
            isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-red-600 transition-colors line-clamp-1">
          {burger.name}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2 h-10">
          {burger.description}
        </p>

        {/* Features */}
        <div className="flex items-center justify-between mb-4 text-xs">
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex items-center">
              <Clock className="w-3 h-3 ml-1" />
              <span>15-20 دقيقة</span>
            </div>
            <div className="flex items-center">
              <Star className="w-3 h-3 ml-1 text-yellow-400 fill-current" />
              <span>4.{Math.floor(Math.random() * 3) + 6}</span>
            </div>
          </div>
          
          {/* Category Badge */}
          <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
            {burger.category === 'burger' ? 'برجر' : 
             burger.category === 'combo' ? 'كومبو' : 
             burger.category === 'sides' ? 'إضافات' : 'مشروبات'}
          </div>
        </div>

        {/* Price and Add Button */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-red-600">
                {burger.price}
              </span>
              <span className="text-sm text-gray-500 font-medium">ج.س</span>
            </div>
            {burger.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {burger.originalPrice} ج.س
              </span>
            )}
          </div>
          
          <button 
            onClick={handleQuickAdd}
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
          >
            إضافة
          </button>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-red-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </div>
  );
};

export default BurgerCard;