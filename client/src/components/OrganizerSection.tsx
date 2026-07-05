import React from 'react';
import { ORGANIZER } from '../constants';

const OrganizerSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5">
          <div className="relative group">
            <div className="absolute -inset-4 bg-red-600/20 rounded-3xl blur-2xl group-hover:bg-red-600/30 transition-all"></div>
            <img
              src={ORGANIZER.imageUrl}
              alt={ORGANIZER.name}
              className="relative w-full aspect-[4/5] object-cover rounded-3xl border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
        <div className="lg:col-span-7 space-y-8">
          <h2 className="text-red-600 font-oswald text-lg font-bold tracking-widest uppercase">
            أهلاً فيكم برحلة “سَمْت”.
          </h2>
         
          <p className="text-white text-xl font-bold tracking-tight uppercase">
           عالمنا مش دايماً واضح، وأحياناً بنحس حالنا تايهين… بس يمكن هذا الضياع هو بداية طريقنا الحقيقي.<br/>
           ممكن نكون بمرحلة شك أو ارتباك، وهذا طبيعي.<br/>
           بس جهّزوا حالكم نمشي داخل الضباب، ونكتشف “نقطة” جديدة بداخل كل واحد فينا.<br/>
           رح نمر على 9 نقاط، وكل نقطة رسمت سمتها بطريقتها الخاصة.<br/>
           استعدوا تلاقوا سمتكم الخاص.<br/>

          </p>
          <div className="h-1 w-20 bg-red-600"></div>
          <p className="text-gray-400 text-xl leading-relaxed font-light italic">
          Saif AL-shul <br/>
          Licence holder 

          </p>
        </div>
      </div>
    </div>
  );
};

export default OrganizerSection;
