import React, { useState } from 'react';
import { Plus, Edit, Trash2, Package, Tag, X } from 'lucide-react';
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
      <div className="fixed top-0 right-0 h-full w-full max-w-4xl bg-white shadow-2xl z-50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">لوحة الإدارة</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'products'
                  ? 'bg-white text-blue-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Package className="w-5 h-5" />
              المنتجات
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'categories'
                  ? 'bg-white text-blue-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Tag className="w-5 h-5" />
              الأصناف
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6" style={{ height: 'calc(100vh - 140px)' }}>
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">
            {editingItem ? 'تعديل المنتج' : 'إضافة منتج جديد'}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم المنتج
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الوصف
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              السعر (ج.س)
            </label>
            <input
              type="number"
              value={formData.price || 0}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رابط الصورة
            </label>
            <input
              type="url"
              value={formData.image || ''}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الصنف
            </label>
            <select
              value={formData.category || 'burger'}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              حفظ
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">إدارة المنتجات</h3>
        <button
          onClick={onAddNew}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          إضافة منتج جديد
        </button>
      </div>

      <div className="grid gap-4">
        {burgers.map((burger) => (
          <div key={burger.id} className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
            <img
              src={burger.image}
              alt={burger.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-bold text-lg">{burger.name}</h4>
              <p className="text-gray-600 text-sm">{burger.description}</p>
              <p className="text-blue-600 font-bold">{burger.price} ج.س</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(burger)}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(burger.id)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">
            {editingItem ? 'تعديل الصنف' : 'إضافة صنف جديد'}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم الصنف
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الأيقونة
            </label>
            <input
              type="text"
              value={formData.icon || ''}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="🍔"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الوصف
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              حفظ
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">إدارة الأصناف</h3>
        <button
          onClick={onAddNew}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          إضافة صنف جديد
        </button>
      </div>

      <div className="grid gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
            <div className="text-3xl">{category.icon}</div>
            <div className="flex-1">
              <h4 className="font-bold text-lg">{category.name}</h4>
              <p className="text-gray-600 text-sm">{category.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(category)}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(category.id)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;