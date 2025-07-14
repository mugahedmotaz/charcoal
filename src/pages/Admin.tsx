import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Package, 
  Tag, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign,
  Eye,
  Settings,
  LogOut,
  Bell,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  Image,
  AlertCircle,
  Calendar,
  Clock,
  Star,
  Activity
} from 'lucide-react';
import { AdminProvider, useAdmin } from '../contexts/AdminContext';
import { BurgerItem, Category } from '../types/burger';

const AdminDashboard: React.FC = () => {
  return (
    <AdminProvider>
      <AdminContent />
    </AdminProvider>
  );
};

const AdminContent: React.FC = () => {
  const navigate = useNavigate();
  const { burgers, categories, addBurger, updateBurger, deleteBurger, addCategory, updateCategory, deleteCategory } = useAdmin();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories' | 'orders' | 'analytics' | 'settings'>('dashboard');
  const [editingItem, setEditingItem] = useState<BurgerItem | Category | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // إحصائيات وهمية للعرض
  const stats = {
    totalProducts: burgers.length,
    totalCategories: categories.length,
    totalOrders: 156,
    totalRevenue: 45230,
    todayOrders: 23,
    todayRevenue: 3450,
    popularProduct: burgers.find(b => b.popular)?.name || 'برجر كلاسيك',
    averageRating: 4.8
  };

  const recentOrders = [
    { id: '001', customer: 'أحمد محمد', items: 3, total: 450, status: 'مكتمل', time: '10:30 ص' },
    { id: '002', customer: 'فاطمة علي', items: 2, total: 320, status: 'قيد التحضير', time: '10:45 ص' },
    { id: '003', customer: 'محمد أحمد', items: 1, total: 180, status: 'جديد', time: '11:00 ص' },
    { id: '004', customer: 'سارة حسن', items: 4, total: 680, status: 'مكتمل', time: '11:15 ص' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-72 bg-white shadow-2xl border-r border-gray-200 z-40">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">لوحة الإدارة</h1>
              <p className="text-sm text-gray-500">شاركلز - بورتسودان</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {[
            { id: 'dashboard', name: 'الرئيسية', icon: BarChart3, badge: null },
            { id: 'products', name: 'المنتجات', icon: Package, badge: stats.totalProducts },
            { id: 'categories', name: 'الأصناف', icon: Tag, badge: stats.totalCategories },
            { id: 'orders', name: 'الطلبات', icon: ShoppingCart, badge: stats.todayOrders },
            { id: 'analytics', name: 'التحليلات', icon: TrendingUp, badge: null },
            { id: 'settings', name: 'الإعدادات', icon: Settings, badge: null },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
                <span className="font-medium">{item.name}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  activeTab === item.id ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">أ</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">أدمن النظام</p>
              <p className="text-sm text-gray-500">admin@charcoals.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mr-72">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {activeTab === 'dashboard' && 'لوحة المعلومات'}
                {activeTab === 'products' && 'إدارة المنتجات'}
                {activeTab === 'categories' && 'إدارة الأصناف'}
                {activeTab === 'orders' && 'إدارة الطلبات'}
                {activeTab === 'analytics' && 'التحليلات والتقارير'}
                {activeTab === 'settings' && 'إعدادات النظام'}
              </h2>
              <p className="text-gray-600 mt-1">
                {new Date().toLocaleDateString('ar-SA', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="البحث..."
                  className="w-80 pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-right"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* View Site */}
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all font-medium"
              >
                <Eye className="w-5 h-5" />
                عرض الموقع
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === 'dashboard' && <DashboardContent stats={stats} recentOrders={recentOrders} />}
          {activeTab === 'products' && (
            <ProductsContent
              burgers={burgers}
              categories={categories}
              searchQuery={searchQuery}
              onEdit={setEditingItem}
              onDelete={deleteBurger}
              onAddNew={() => setIsAddingNew(true)}
              editingItem={editingItem}
              isAddingNew={isAddingNew}
              onSave={(data) => {
                if (editingItem && 'price' in editingItem) {
                  updateBurger(editingItem.id, data);
                } else {
                  addBurger(data as any);
                }
                setEditingItem(null);
                setIsAddingNew(false);
              }}
              onCancel={() => {
                setEditingItem(null);
                setIsAddingNew(false);
              }}
            />
          )}
          {activeTab === 'categories' && (
            <CategoriesContent
              categories={categories}
              searchQuery={searchQuery}
              onEdit={setEditingItem}
              onDelete={deleteCategory}
              onAddNew={() => setIsAddingNew(true)}
              editingItem={editingItem}
              isAddingNew={isAddingNew}
              onSave={(data) => {
                if (editingItem && 'icon' in editingItem) {
                  updateCategory(editingItem.id, data);
                } else {
                  addCategory(data as any);
                }
                setEditingItem(null);
                setIsAddingNew(false);
              }}
              onCancel={() => {
                setEditingItem(null);
                setIsAddingNew(false);
              }}
            />
          )}
          {activeTab === 'orders' && <OrdersContent recentOrders={recentOrders} />}
          {activeTab === 'analytics' && <AnalyticsContent stats={stats} />}
          {activeTab === 'settings' && <SettingsContent />}
        </div>
      </div>
    </div>
  );
};

// Dashboard Content Component
const DashboardContent: React.FC<{ stats: any; recentOrders: any[] }> = ({ stats, recentOrders }) => {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'إجمالي المبيعات', 
            value: `${stats.totalRevenue} ج.س`, 
            change: '+12%', 
            icon: DollarSign, 
            color: 'from-green-500 to-emerald-600',
            bgColor: 'bg-green-50',
            textColor: 'text-green-600'
          },
          { 
            title: 'الطلبات اليوم', 
            value: stats.todayOrders, 
            change: '+8%', 
            icon: ShoppingCart, 
            color: 'from-blue-500 to-cyan-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600'
          },
          { 
            title: 'إجمالي المنتجات', 
            value: stats.totalProducts, 
            change: '+3%', 
            icon: Package, 
            color: 'from-purple-500 to-pink-600',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-600'
          },
          { 
            title: 'متوسط التقييم', 
            value: stats.averageRating, 
            change: '+0.2', 
            icon: Star, 
            color: 'from-yellow-500 to-orange-600',
            bgColor: 'bg-yellow-50',
            textColor: 'text-yellow-600'
          },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">المبيعات الأسبوعية</h3>
              <p className="text-gray-600">آخر 7 أيام</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
              <Download className="w-4 h-4" />
              تصدير
            </button>
          </div>
          
          {/* Simple Chart Representation */}
          <div className="space-y-4">
            {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map((day, index) => {
              const value = Math.random() * 100;
              return (
                <div key={day} className="flex items-center gap-4">
                  <span className="w-16 text-sm text-gray-600">{day}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                  <span className="w-16 text-sm font-medium text-gray-800">{Math.round(value * 50)} ج.س</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">الطلبات الأخيرة</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              عرض الكل
            </button>
          </div>
          
          <div className="space-y-4">
            {recentOrders.slice(0, 4).map((order) => (
              <div key={order.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{order.customer[0]}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{order.customer}</p>
                  <p className="text-xs text-gray-500">{order.items} منتج - {order.total} ج.س</p>
                </div>
                <div className="text-left">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    order.status === 'مكتمل' ? 'bg-green-100 text-green-600' :
                    order.status === 'قيد التحضير' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {order.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">إجراءات سريعة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'إضافة منتج', icon: Plus, color: 'from-green-500 to-emerald-600' },
            { name: 'إضافة صنف', icon: Tag, color: 'from-blue-500 to-cyan-600' },
            { name: 'عرض التقارير', icon: BarChart3, color: 'from-purple-500 to-pink-600' },
            { name: 'الإعدادات', icon: Settings, color: 'from-orange-500 to-red-600' },
          ].map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-3 p-6 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all duration-300 hover:scale-105"
            >
              <div className={`p-3 rounded-2xl bg-gradient-to-r ${action.color}`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <span className="font-medium text-gray-700">{action.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Products Content Component
const ProductsContent: React.FC<{
  burgers: BurgerItem[];
  categories: Category[];
  searchQuery: string;
  onEdit: (item: BurgerItem) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
  editingItem: BurgerItem | Category | null;
  isAddingNew: boolean;
  onSave: (data: Partial<BurgerItem>) => void;
  onCancel: () => void;
}> = ({ burgers, categories, searchQuery, onEdit, onDelete, onAddNew, editingItem, isAddingNew, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<BurgerItem>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  React.useEffect(() => {
    if (editingItem && 'price' in editingItem) {
      setFormData(editingItem);
    } else if (isAddingNew) {
      setFormData({
        name: '',
        description: '',
        price: 0,
        image: '',
        category: 'burger',
        extras: []
      });
    }
  }, [editingItem, isAddingNew]);

  const filteredBurgers = burgers.filter(burger => {
    const matchesSearch = burger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         burger.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || burger.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (editingItem || isAddingNew) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
                {editingItem ? <Edit className="w-6 h-6 text-white" /> : <Plus className="w-6 h-6 text-white" />}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {editingItem ? 'تعديل المنتج' : 'إضافة منتج جديد'}
                </h3>
                <p className="text-gray-600">املأ البيانات المطلوبة</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    اسم المنتج *
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-right"
                    placeholder="مثال: برجر كلاسيك"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    الوصف *
                  </label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-right"
                    rows={4}
                    placeholder="وصف مفصل للمنتج..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      السعر (ج.س) *
                    </label>
                    <input
                      type="number"
                      value={formData.price || 0}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-right"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      الصنف *
                    </label>
                    <select
                      value={formData.category || 'burger'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-right"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.popular || false}
                      onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">منتج مميز</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.new || false}
                      onChange={(e) => setFormData({ ...formData, new: e.target.checked })}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm font-medium text-gray-700">منتج جديد</span>
                  </label>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    رابط الصورة *
                  </label>
                  <div className="space-y-3">
                    <input
                      type="url"
                      value={formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-right"
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                    
                    {formData.image && (
                      <div className="relative">
                        <img
                          src={formData.image}
                          alt="معاينة"
                          className="w-full h-48 object-cover rounded-2xl border border-gray-200"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                          معاينة
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">نصائح للصورة:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• استخدم صور عالية الجودة</li>
                        <li>• الحجم المفضل: 600x400 بكسل</li>
                        <li>• تأكد من وضوح المنتج</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                حفظ المنتج
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-2xl hover:bg-gray-200 transition-all duration-300 font-semibold"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">إدارة المنتجات</h3>
          <p className="text-gray-600 mt-1">إضافة وتعديل وحذف المنتجات</p>
        </div>
        <button
          onClick={onAddNew}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          إضافة منتج جديد
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700">تصفية حسب الصنف:</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              الكل ({burgers.length})
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name} ({burgers.filter(b => b.category === category.id).length})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6">
        {filteredBurgers.map((burger) => (
          <div key={burger.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={burger.image}
                  alt={burger.name}
                  className="w-24 h-24 object-cover rounded-2xl"
                />
                {burger.popular && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    مميز
                  </div>
                )}
                {burger.new && (
                  <div className="absolute -top-2 -left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    جديد
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-xl text-gray-800 mb-2">{burger.name}</h4>
                    <p className="text-gray-600 mb-3 line-clamp-2">{burger.description}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-red-600">{burger.price} ج.س</span>
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                        {categories.find(c => c.id === burger.category)?.name}
                      </span>
                      {burger.originalPrice && (
                        <span className="text-gray-400 line-through">{burger.originalPrice} ج.س</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(burger)}
                      className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(burger.id)}
                      className="bg-red-500 text-white p-3 rounded-xl hover:bg-red-600 transition-colors shadow-md hover:shadow-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBurgers.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">لا توجد منتجات</h3>
          <p className="text-gray-600">لم يتم العثور على منتجات تطابق البحث</p>
        </div>
      )}
    </div>
  );
};

// Categories Content Component
const CategoriesContent: React.FC<{
  categories: Category[];
  searchQuery: string;
  onEdit: (item: Category) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
  editingItem: BurgerItem | Category | null;
  isAddingNew: boolean;
  onSave: (data: Partial<Category>) => void;
  onCancel: () => void;
}> = ({ categories, searchQuery, onEdit, onDelete, onAddNew, editingItem, isAddingNew, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Category>>({});

  React.useEffect(() => {
    if (editingItem && 'icon' in editingItem) {
      setFormData(editingItem);
    } else if (isAddingNew) {
      setFormData({
        name: '',
        icon: '🍽️',
        description: ''
      });
    }
  }, [editingItem, isAddingNew]);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (editingItem || isAddingNew) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                {editingItem ? <Edit className="w-6 h-6 text-white" /> : <Plus className="w-6 h-6 text-white" />}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {editingItem ? 'تعديل الصنف' : 'إضافة صنف جديد'}
                </h3>
                <p className="text-gray-600">املأ بيانات الصنف</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                اسم الصنف *
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-right"
                placeholder="مثال: برجر"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                الأيقونة *
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={formData.icon || ''}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-right"
                  placeholder="🍔"
                  required
                />
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl">
                  {formData.icon || '🍽️'}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                الوصف
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-right"
                rows={3}
                placeholder="وصف الصنف..."
              />
            </div>

            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                حفظ الصنف
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-2xl hover:bg-gray-200 transition-all duration-300 font-semibold"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">إدارة الأصناف</h3>
          <p className="text-gray-600 mt-1">إضافة وتعديل وحذف الأصناف</p>
        </div>
        <button
          onClick={onAddNew}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          إضافة صنف جديد
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-3xl">
                {category.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xl text-gray-800 mb-1">{category.name}</h4>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(category)}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                تعديل
              </button>
              <button
                onClick={() => onDelete(category.id)}
                className="flex-1 bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">لا توجد أصناف</h3>
          <p className="text-gray-600">لم يتم العثور على أصناف تطابق البحث</p>
        </div>
      )}
    </div>
  );
};

// Orders Content Component
const OrdersContent: React.FC<{ recentOrders: any[] }> = ({ recentOrders }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">الطلبات الحديثة</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-right py-3 px-4 font-semibold text-gray-700">رقم الطلب</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">العميل</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">المنتجات</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">المبلغ</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">الحالة</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">الوقت</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-800">#{order.id}</td>
                  <td className="py-4 px-4 text-gray-700">{order.customer}</td>
                  <td className="py-4 px-4 text-gray-700">{order.items} منتج</td>
                  <td className="py-4 px-4 font-bold text-green-600">{order.total} ج.س</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'مكتمل' ? 'bg-green-100 text-green-600' :
                      order.status === 'قيد التحضير' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{order.time}</td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Analytics Content Component
const AnalyticsContent: React.FC<{ stats: any }> = ({ stats }) => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">أداء المبيعات</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">هذا الشهر</span>
              <span className="font-bold text-green-600">+15%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">الشهر الماضي</span>
              <span className="font-bold text-blue-600">+8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">نفس الفترة العام الماضي</span>
              <span className="font-bold text-purple-600">+25%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">المنتجات الأكثر مبيعاً</h3>
          <div className="space-y-3">
            {['برجر كلاسيك', 'برجر تشيز', 'كومبو سبيشال', 'برجر باربكيو'].map((product, index) => (
              <div key={product} className="flex items-center justify-between">
                <span className="text-gray-700">{product}</span>
                <span className="font-bold text-blue-600">{45 - index * 8} مبيعة</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Settings Content Component
const SettingsContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">إعدادات النظام</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-800">الإشعارات</h4>
              <p className="text-sm text-gray-600">تلقي إشعارات الطلبات الجديدة</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-800">التحديث التلقائي</h4>
              <p className="text-sm text-gray-600">تحديث البيانات تلقائياً</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;