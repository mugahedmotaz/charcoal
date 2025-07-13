import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AdminContextType, BurgerItem, Category } from '../types/burger';
import { burgerData } from '../data/burgers';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const defaultCategories: Category[] = [
  { id: 'burger', name: 'برجر', icon: '🍔', description: 'برجر لذيذ بأنواع مختلفة' },
  { id: 'combo', name: 'كومبو', icon: '🍟', description: 'وجبات كاملة مع المشروبات والبطاطس' },
  { id: 'sides', name: 'إضافات', icon: '🥤', description: 'إضافات جانبية لذيذة' },
  { id: 'drinks', name: 'مشروبات', icon: '🥤', description: 'مشروبات منعشة ومتنوعة' }
];

type AdminAction =
  | { type: 'ADD_BURGER'; payload: BurgerItem }
  | { type: 'UPDATE_BURGER'; payload: { id: string; burger: Partial<BurgerItem> } }
  | { type: 'DELETE_BURGER'; payload: string }
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'UPDATE_CATEGORY'; payload: { id: string; category: Partial<Category> } }
  | { type: 'DELETE_CATEGORY'; payload: string };

interface AdminState {
  burgers: BurgerItem[];
  categories: Category[];
}

const adminReducer = (state: AdminState, action: AdminAction): AdminState => {
  switch (action.type) {
    case 'ADD_BURGER':
      return {
        ...state,
        burgers: [...state.burgers, action.payload]
      };
    
    case 'UPDATE_BURGER':
      return {
        ...state,
        burgers: state.burgers.map(burger =>
          burger.id === action.payload.id
            ? { ...burger, ...action.payload.burger }
            : burger
        )
      };
    
    case 'DELETE_BURGER':
      return {
        ...state,
        burgers: state.burgers.filter(burger => burger.id !== action.payload)
      };
    
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload]
      };
    
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.payload.id
            ? { ...category, ...action.payload.category }
            : category
        )
      };
    
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload)
      };
    
    default:
      return state;
  }
};

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, {
    burgers: burgerData,
    categories: defaultCategories
  });

  const addBurger = (burgerData: Omit<BurgerItem, 'id'>) => {
    const newBurger: BurgerItem = {
      ...burgerData,
      id: `burger-${Date.now()}`
    };
    dispatch({ type: 'ADD_BURGER', payload: newBurger });
  };

  const updateBurger = (id: string, burger: Partial<BurgerItem>) => {
    dispatch({ type: 'UPDATE_BURGER', payload: { id, burger } });
  };

  const deleteBurger = (id: string) => {
    dispatch({ type: 'DELETE_BURGER', payload: id });
  };

  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: `category-${Date.now()}`
    };
    dispatch({ type: 'ADD_CATEGORY', payload: newCategory });
  };

  const updateCategory = (id: string, category: Partial<Category>) => {
    dispatch({ type: 'UPDATE_CATEGORY', payload: { id, category } });
  };

  const deleteCategory = (id: string) => {
    dispatch({ type: 'DELETE_CATEGORY', payload: id });
  };

  return (
    <AdminContext.Provider value={{
      burgers: state.burgers,
      categories: state.categories,
      addBurger,
      updateBurger,
      deleteBurger,
      addCategory,
      updateCategory,
      deleteCategory
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};