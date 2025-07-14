import React, { useState } from 'react';
import { Plus, Edit, Trash2, Package, Tag, X, Save, Upload, Image, AlertCircle } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { BurgerItem, Category } from '../../types/burger';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { burgers, categories, addBurger, updateBurger, deleteBurger, addCategory, updateCategory, deleteCategory } = useAdmin();
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [editingItem, setEditingItem] = useState<BurgerItem | Category | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  if (!isOpen) return null;

  const handleSaveBurger = (burgerData: Partial<BurgerItem>) => {
    if (editingItem && 'price' in editingItem) {
      updateBurger(editingItem.id, burgerData);
    } else {
      addBurger({
        name: burgerData.name || '',
        description: burgerData.description || '',
        price: burgerData.price || 0,
        image: burgerData.image || '',
        category: burgerData.category || 'burger',
        extras: burgerData.extras || []
      });
    }
    setEditingItem(null);
    setIsAddingNew(false);
  };

  const handleSaveCategory = (categoryData: Partial<Category>) => {
    if (editingItem && 'icon' in editingItem) {
      updateCategory(editingItem.id, categoryData);
    } else {
      addCategory({
        name: categoryData.name || '',
        icon: categoryData.icon || '🍽️',
        description: categoryData.description || ''
      });
    }
    setEditingItem(null);
    setIsAddingNew(false);
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
      
      {/* Admin Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-6xl bg-white shadow-2xl z-50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Package className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">لوحة الإدارة</h2>
                  <p className="text-white/80">إدارة المنتجات والأصناف</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 hover:bg-white/20 rounded-2xl transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Tabs */}
            <div className="flex gap-2">
              {[
                { id: 'products', name: 'المنتجات', icon: Package, count: burgers.length },
                { id: 'categories', name: 'الأصناف', icon: Tag, count: categories.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-semibold">{tab.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-white/20 text-white'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50" style={{ height: 'calc(100vh - 180px)' }}>
          {activeTab === 'products' ? (
            <ProductsTab
              burgers={burgers}
              categories={categories}
              onEdit={setEditingItem}
              onDelete={deleteBurger}
              onAddNew={() => setIsAddingNew(true)}
              editingItem={editingItem}
              isAddingNew={isAddingNew}
              onSave={handleSaveBurger}
              onCancel={() => {
                setEditingItem(null);
                setIsAddingNew(false);
              }}
            />
          ) : (
            <CategoriesTab
              categories={categories}
              onEdit={setEditingItem}
              onDelete={deleteCategory}
              onAddNew={() => setIsAddingNew(true)}
              editingItem={editingItem}
              isAddingNew={isAddingNew}
              onSave={handleSaveCategory}
              onCancel={() => {
                setEditingItem(null);
                setIsAddingNew(false);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

// Products Tab Component
const ProductsTab: React.FC<{
  burgers: BurgerItem[];
  categories: Category[];
  onEdit: (item: BurgerItem) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
  editingItem: BurgerItem | Category | null;
  isAddingNew: boolean;
  onSave: (data: Partial<BurgerItem>) => void;
  onCancel: () => void;
}> = ({ burgers, categories, onEdit, onDelete, onAddNew, editingItem, isAddingNew, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<BurgerItem>>({});

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (editingItem || isAddingNew) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-8">
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
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
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

        <div className="grid gap-6">
          {burgers.map((burger) => (
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
      </div>
    </div>
  );
};

// Categories Tab Component
const CategoriesTab: React.FC<{
  categories: Category[];
  onEdit: (item: Category) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
  editingItem: BurgerItem | Category | null;
  isAddingNew: boolean;
  onSave: (data: Partial<Category>) => void;
  onCancel: () => void;
}> = ({ categories, onEdit, onDelete, onAddNew, editingItem, isAddingNew, onSave, onCancel }) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (editingItem || isAddingNew) {
    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-8">
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
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
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

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-3xl">
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-xl text-gray-800 mb-1">{category.name}</h4>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(category)}
                    className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(category.id)}
                    className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600 transition-colors shadow-md hover:shadow-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;