import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-5xl font-oswald font-bold mb-10 text-red-600">
          ؟TEDx <span className="text-white"> شو يعني </span>
          </h2>
          <div className="space-y-8 text-gray-400 leading-relaxed text-xl font-light">
            <p>
            انطلاقاً من روح الأفكار التي تستحق الانتشار،
 أطلقت TED فعاليات TEDx
وهي فعاليات محلية بتنظم بشكل مستقل، وبتجمع الناس مع بعض ليعيشوا تجربة قريبة من تجربة TED العالمية، لكن بطابع محلي أقرب للمجتمع.
            </p>
            <p>
              في <strong>TEDx shmeisani</strong>, بنجمع متحدثين من خلفيات وتجارب مختلفة ليشاركوا أفكارهم وقصصهم على المسرح بشكل حي وملهم، ونخلق مساحة حوار بتربط بين الناس وبتفتح آفاق جديدة للتفكير والتواصل.
            </p>
            <p>
              او الثيم تبعنا هو  
              <span className="text-white font-semibold">
                "سمت"، 
              </span>{' '}
              اللي بذكرنا إنه لكل حدا فينا بصمته وطريقته الخاصة بالحياة، وإنه اختلافنا هو يلي بيميزنا وبيعطينا معنى أعمق للتجربة الإنسانية، وبيخلينا نشوف العالم من زوايا مختلفة بتصنع تأثير حقيقي بالمجتمع.
            </p>
          </div>
          <div className="mt-14 flex flex-wrap gap-12">
            <div className="text-left">
              <span className="block text-5xl font-bold text-white mb-1">
                9
              </span>
              <span className="text-xs text-red-600 uppercase tracking-widest font-bold">
                اشخاص عملوا طريقهم
              </span>
            </div>
            <div className="text-left border-l border-white/10 pl-12">
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
              src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="TEDx Atmosphere"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-red-600 text-white p-10 rounded-2xl shadow-2xl max-w-sm hidden md:block border border-white/10">
            <p className="text-2xl font-bold italic leading-tight mb-2">
              "Ideas that bridge the straits of the mind."
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
