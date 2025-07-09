
import React, { useState, useMemo } from 'react';
import { CartProvider } from '../contexts/CartContext';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import BurgerCard from '../components/BurgerCard';
import BurgerDetails from '../components/BurgerDetails';
import CartSidebar from '../components/CartSidebar';
import CategoryFilter from '../components/CategoryFilter';
import { burgerData } from '../data/burgers';
import { BurgerItem } from '../types/burger';

const categories = [
  { id: 'all', name: 'الكل', icon: '🍽️' },
  { id: 'burger', name: 'برجر', icon: '🍔' },
  { id: 'combo', name: 'كومبو', icon: '🍟' },
  { id: 'sides', name: 'إضافات', icon: '🥤' },
  { id: 'drinks', name: 'مشروبات', icon: '🥤' }
];

const Index: React.FC = () => {
  const [selectedBurger, setSelectedBurger] = useState<BurgerItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredBurgers = useMemo(() => {
    return burgerData.filter(burger => {
      const matchesSearch = burger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           burger.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || burger.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const popularBurgers = useMemo(() => {
    return burgerData.filter(burger => burger.popular).slice(0, 3);
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header 
          onCartClick={() => setIsCartOpen(true)}
          onSearchChange={setSearchQuery}
        />

        {/* Hero Section */}
        <HeroSection />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          {/* Popular Items Section */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                الأكثر مبيعاً 🔥
              </h2>
              <p className="text-gray-600 text-lg">
                البرجر المفضل لدى عملائنا
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularBurgers.map((burger) => (
                <BurgerCard
                  key={burger.id}
                  burger={burger}
                  onDetailsClick={setSelectedBurger}
                />
              ))}
            </div>
          </section>

          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Menu Section */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                قائمة الطعام الكاملة
              </h2>
              <p className="text-gray-600 text-lg">
                اكتشف جميع خياراتنا اللذيذة
              </p>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                عرض {filteredBurgers.length} منتج
                {searchQuery && ` من البحث عن "${searchQuery}"`}
              </p>
            </div>

            {/* Burgers Grid */}
            {filteredBurgers.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBurgers.map((burger) => (
                  <BurgerCard
                    key={burger.id}
                    burger={burger}
                    onDetailsClick={setSelectedBurger}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  لا توجد نتائج
                </h3>
                <p className="text-gray-600">
                  جرب البحث بكلمات مختلفة أو تصفح الفئات الأخرى
                </p>
              </div>
            )}
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12 mt-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center ml-3">
                <span className="text-red-600 font-bold text-2xl">🍔</span>
              </div>
              <h2 className="text-2xl font-bold">Charcoal's</h2>
            </div>
            <p className="text-gray-400 mb-6">
              أفضل برجر في المدينة - طعم لا يُنسى مع كل قضمة
            </p>
            <div className="flex justify-center gap-8 text-sm">
              <a href="#" className="hover:text-yellow-400 transition-colors">من نحن</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">اتصل بنا</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">سياسة الخصوصية</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">الشروط والأحكام</a>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-gray-400 text-sm">
              © 2024 Charcoal's. جميع الحقوق محفوظة.
            </div>
          </div>
        </footer>

        {/* Modals */}
        <BurgerDetails
          burger={selectedBurger}
          isOpen={!!selectedBurger}
          onClose={() => setSelectedBurger(null)}
        />

        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      </div>
    </CartProvider>
  );
};

export default Index;
