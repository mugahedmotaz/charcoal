
import { BurgerItem } from '../types/burger';

export const burgerData: BurgerItem[] = [
  {
    id: '1',
    name: 'كلاسيك',
    description: 'لحم بقري طازج مع الخس  والبصل وصوص الكاتشب والمايونيز',
    price: 7500,
    originalPrice: 7500,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    category: 'burger',
    popular: true,
    extras: [
      { id: 'cheese', name: 'جبنة إضافية', price: 3 },
      { id: 'bacon', name: 'بيكون', price: 5 },
      { id: 'avocado', name: 'أفوكادو', price: 4 }
    ]
  },
  {
    id: '2',
    name: 'تشيز',
    description: '  لحم بقري طازج مع الخس  والبصل  وجبنه شرائح وصوص الكاتشب والمايونيز',
    price: 7900,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
    category: 'burger',
    new: true,
    extras: [
      { id: 'cheese', name: 'جبنة إضافية', price: 3 },
      { id: 'onion_rings', name: 'حلقات البصل', price: 4 },
      { id: 'mushroom', name: 'فطر مشوي', price: 3 }
    ]
  },
  {
    id: '3',
    name: 'برجر الفراخ المقرمش',
    description: 'قطعة دجاج مقرمشة مع خس وطماطم وصوص المايونيز',
    price: 28,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e2d5314f?w=400&h=300&fit=crop',
    category: 'burger',
    extras: [
      { id: 'cheese', name: 'جبنة شيدر', price: 3 },
      { id: 'spicy_sauce', name: 'صوص حار', price: 2 },
      { id: 'pickles', name: 'مخلل إضافي', price: 1 }
    ]
  },
  {
    id: '4',
    name: 'كومبو العائلة',
    description: '3 برجر + بطاطس كبيرة + 3 مشروبات',
    price: 85,
    originalPrice: 100,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop',
    category: 'combo',
    popular: true,
    extras: [
      { id: 'extra_fries', name: 'بطاطس إضافية', price: 8 },
      { id: 'upgrade_drink', name: 'ترقية المشروب', price: 5 }
    ]
  },
  {
    id: '5',
    name: 'برجر الفطر النباتي',
    description: 'برجر نباتي مع فطر مشوي وخضروات طازجة',
    price: 30,
    image: 'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=400&h=300&fit=crop',
    category: 'burger',
    new: true,
    extras: [
      { id: 'avocado', name: 'شرائح أفوكادو', price: 4 },
      { id: 'grilled_veggies', name: 'خضروات مشوية', price: 3 }
    ]
  },
  {
    id: '6',
    name: 'بطاطس مقرمشة',
    description: 'بطاطس ذهبية مقرمشة مع توابل خاصة',
    price: 12,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
    category: 'sides',
    extras: [
      { id: 'cheese_sauce', name: 'صوص الجبنة', price: 3 },
      { id: 'ketchup', name: 'كاتشب إضافي', price: 1 }
    ]
  },
  {
    id: '7',
    name: 'كولا مثلجة',
    description: 'مشروب غازي منعش مع الثلج',
    price: 8,
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=300&fit=crop',
    category: 'drinks',
    extras: []
  },
  {
    id: '8',
    name: 'برجر البيج تيست',
    description: 'برجر ضخم بقطعتين لحم وجبنة مذابة وخضروات',
    price: 45,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop',
    category: 'burger',
    popular: true,
    extras: [
      { id: 'double_cheese', name: 'جبنة مضاعفة', price: 6 },
      { id: 'bacon', name: 'لحم مقدد', price: 5 },
      { id: 'fried_egg', name: 'بيض مقلي', price: 4 }
    ]
  }
];
