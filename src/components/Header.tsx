
import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Settings } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Logo from "../components/logo.png"
interface HeaderProps {
  onCartClick: () => void;
  onSearchChange: (query: string) => void;
  onAdminClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, onSearchChange, onAdminClick }) => {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <header className="bg-gradient-to-r from-red-500 via-red-600 to-orange-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-red-600 font-bold text-xl"><img src={Logo} alt="" /></span>
            </div>
            <h1 className="bg-white pr-2 font-bold bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              شاركلز - بورتسودان
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="hover:text-yellow-300 transition-colors font-medium">الرئيسية</a>
            <a href="#menu" className="hover:text-yellow-300 transition-colors font-medium">القائمة</a>
            <a href="#offers" className="hover:text-yellow-300 transition-colors font-medium">العروض</a>
            <a href="#contact" className="hover:text-yellow-300 transition-colors font-medium">اتصل بنا</a>
            <button
              onClick={onAdminClick}
              className="hover:text-yellow-300 transition-colors font-medium flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              الإدارة
            </button>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
            <Search className="w-5 h-5 text-white/70 ml-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="... ابحث عن البرجر المفضل "
              className="bg-transparent text-white placeholder-white/70 outline-none w-64 pl-2"
            />
          </div>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative bg-yellow-400 hover:bg-yellow-500 text-red-600 px-4 py-2 rounded-full font-bold transition-all hover:scale-105 shadow-lg"
          >
            <ShoppingCart className="w-5 h-5 inline" />
                <span className="mx-2">السلة </span> 
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-yellow-300 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20">
            <div className="flex flex-col space-y-4 mt-4">
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
                <Search className="w-5 h-5 text-white/70 ml-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="ابحث..."
                  className="bg-transparent text-white placeholder-white/70 outline-none w-full"
                />
              </div>
              <nav className="flex flex-col space-y-2">
                <a href="#home" className="hover:text-yellow-300 transition-colors font-medium py-2">الرئيسية</a>
                <a href="#menu" className="hover:text-yellow-300 transition-colors font-medium py-2">القائمة</a>
                <a href="#offers" className="hover:text-yellow-300 transition-colors font-medium py-2">العروض</a>
                <a href="#contact" className="hover:text-yellow-300 transition-colors font-medium py-2">اتصل بنا</a>
                <button
                  onClick={onAdminClick}
                  className="hover:text-yellow-300 transition-colors font-medium py-2 text-right flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  الإدارة
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
