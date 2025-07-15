
import React, { useState, useMemo } from 'react';
import { CartProvider } from '../contexts/CartContext';
import { AdminProvider } from '../contexts/AdminContext';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import BurgerCard from '../components/BurgerCard';
import BurgerDetails from '../components/BurgerDetails';
import CartSidebar from '../components/CartSidebar';
import CategoryFilter from '../components/CategoryFilter';
import { useAdmin } from '../contexts/AdminContext';
import { BurgerItem } from '../types/burger';
import Logo from "../components/logo.png"
import { Facebook, Instagram,} from 'lucide-react';

const IndexContent: React.FC = () => {
  const { burgers, categories } = useAdmin();
  const [selectedBurger, setSelectedBurger] = useState<BurgerItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const allCategories = [
    { id: 'all', name: 'الكل', icon: '🍽️' },
    ...categories
  ];

  const filteredBurgers = useMemo(() => {
    return burgers.filter(burger => {
      const matchesSearch = burger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           burger.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || burger.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, burgers]);

  const popularBurgers = useMemo(() => {
    return burgers.filter(burger => burger.popular).slice(0, 3);
  }, [burgers]);

  return (
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
          categories={allCategories}
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
    <footer className="bg-white text-gray-800 py-10 border-t">
  <div className="container mx-auto px-4 text-center">
    
    {/* Logo and Title */}
    <div className="flex items-center justify-center mb-4">
      <img src={Logo} alt="Charcoal's Logo" className="w-12  mr-2" />
      <h1 className="font-bold text-xl">شاركلز - بورتسودان</h1>
    </div>

    {/* Social Links */}
    <div className="flex justify-center items-center gap-3 my-4">
      <a href="#" aria-label="Facebook">
        <Facebook className="w-8 h-8 text-white bg-gradient-to-r from-red-500 to-orange-500 p-1 rounded-md hover:bg-yellow-600 transition" />
      </a>
      <a href="#" aria-label="Instagram">
        <Instagram className="w-8 h-8 text-white bg-gradient-to-r from-red-500 to-orange-500 p-1 rounded-md hover:bg-yellow-600 transition" />
      </a>
    </div>

    {/* Description */}
    <p className="text-gray-600 mb-6">
      أفضل برجر في المدينة - طعم لا يُنسى مع كل قضمة
    </p>

    {/* Footer Links */}
    <div className="flex justify-center flex-wrap gap-6 text-sm text-gray-600 mb-6">
      <a href="#" className="hover:text-red-500 transition">من نحن</a>
      <a href="#" className="hover:text-red-500 transition">اتصل بنا</a>
      <a href="#" className="hover:text-red-500 transition">سياسة الخصوصية</a>
      <a href="#" className="hover:text-red-500 transition">الشروط والأحكام</a>
    </div>

    {/* Bottom Note */}
    <p className="text-xs text-gray-500">
      © 2024 Charcoal's. جميع الحقوق محفوظة.
    </p>
    <p className="text-xs text-gray-500 mt-2">
      Development by <span className="text-red-600 font-semibold">Mugahed Motaz</span>
    </p>
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
  );
};

const Index: React.FC = () => {
  return (
    <AdminProvider>
      <CartProvider>
        <IndexContent />
      </CartProvider>
    </AdminProvider>
  );
};

export default Index;
