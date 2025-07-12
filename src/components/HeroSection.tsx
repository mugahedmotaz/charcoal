
import React from 'react';
import { Clock, Star, Truck } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-red-500 via-orange-500 to-yellow-400 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" ></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-right">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              أطعم برجر
              <span className="block text-yellow-300 animate-pulse"> </span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed">
              اكتشف طعم البرجر الأصيل مع وصفاتنا السرية والمكونات الطازجة
            </p>
            
            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-6 mb-8">
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                {/* <Clock className="w-5 h-5 ml-2" /> */}
                <span>الجودة شعارنا</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="w-5 h-5 ml-2 text-yellow-300" />
                <span>تقييم 4.8/5</span>
              </div>
            
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-red-600 font-bold py-4 px-8 rounded-full text-lg transition-all hover:scale-105 shadow-xl">
                اطلب الآن 
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-bold py-4 px-8 rounded-full text-lg transition-all hover:scale-105">
                تصفح القائمة
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop"
                alt="برجر لذيذ"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
              
              {/* Floating Elements */}
              {/* <div className="absolute -top-4 -right-4 bg-yellow-400 text-red-600 rounded-full w-20 h-20 flex items-center justify-center font-bold text-lg shadow-lg animate-bounce">
                خصم
                <br />
                25%
              </div> */}
              
              <div className="absolute -bottom-4 -left-4 bg-white text-red-600 rounded-2xl px-4 py-2 shadow-lg">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 ml-1" />
                  <span className="font-bold">4.8</span>
                  <span className="text-gray-600 mr-2">(1,234 تقييم)</span>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-red-500/20 rounded-3xl transform rotate-6 -z-10"></div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="white"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
