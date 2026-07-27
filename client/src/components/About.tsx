import React from 'react';
import licenceImg from '../assets/images/licence.jpg';

const About: React.FC = () => {
  return (
    <div 
      dir="rtl" 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right"
      style={{ fontFamily: "'Childos Arabic', sans-serif" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-5xl font-bold mb-10 text-red-600">
            شو يعني <span className="text-white">TEDx؟</span>
          </h2>
          <div className="space-y-8 text-gray-400 leading-relaxed text-xl font-light">
            <p>
              فعالية محلية تنظم بشكل مستقل, بجتمع فيها الناس مع بعض ليعيشو التجربة العالمية لكن بطابع محلي.
            </p>
            <p>
              بنجمع فيها متحدثين من خلفيات و تجارب مختلفة ليشاركونا افكارهم و قصصهم على المسرح بطريقة ملهمة و واقعية, ونخلق مساحة حوار بين الجمهور و بتفتح افاق جديدة للتفكير و التواصل.
            </p>
            <p>
              الثيم تبعنا هو{' '}
              <span className="text-white font-semibold">
                "سمت"،
              </span>
              يلي رح يذكرنا انه كل حدا فينا اله بصمته و طريقه الخاص, وانه اختلافنا هو يلي بميزنا وبيعطينا معنى اعمق للتجربة الانسانية, وبخلينا نشوف العالم من زوايا مختلفة يلي رح تخلينا نصنع التأثير بالمجتمع.
            </p>
          </div>
          <div className="mt-14 flex flex-wrap gap-12">
            <div className="text-right">
              <span className="block text-5xl font-bold text-white mb-1">
                9
              </span>
              <span className="text-xs text-red-600 uppercase tracking-widest font-bold">
                اشخاص عملوا طريقهم
              </span>
            </div>
            <div className="text-right border-r border-white/10 pr-12">
              <span className="block text-5xl font-bold text-white mb-1">
                200+
              </span>
              <span className="text-xs text-red-600 uppercase tracking-widest font-bold">
                نقطة رح تكتشف طريقها
              </span>
            </div>
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="aspect-square rounded-3xl overflow-hidden border-4 border-white/5 shadow-2xl">
            <img
              src={licenceImg}
              alt="TEDx Atmosphere"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 bg-red-600 text-white p-10 rounded-2xl shadow-2xl max-w-sm hidden md:block border border-white/10 text-right">
            <p className="text-2xl font-bold leading-tight mb-2">
              "كل شخص عنده قصة، فكرة، أو تجربة تستحق إنها تُسمع."
            </p>
            <p className="text-sm opacity-70 uppercase tracking-widest font-bold">
              — Curator’s Note
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;