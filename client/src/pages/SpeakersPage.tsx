import React from 'react';
import { SPEAKERS } from '../constants';

const SpeakersPage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden font-oswald">
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-red-950/20 rounded-full blur-[150px] transform translate-y-1/2 scale-150"></div>
        <div className="absolute inset-0 bg-red-950/10 rounded-full blur-[100px] transform -translate-x-1/2 scale-110"></div>
      </div>


      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 py-20 text-center">
        
        <div className="mb-16">
          <span className="text-4xl md:text-5xl font-extrabold tracking-tighter">
            <span className="text-red-600">TEDx</span>Shmeisani
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-widest text-red-600 uppercase mb-6 animate-pulse drop-shadow-[0_5px_15px_rgba(230,43,30,0.4)]">
          Coming Soon
        </h1>

        <p className="text-2xl md:text-4xl text-gray-100 font-bold mb-10 max-w-4xl leading-tight">
         صُنّاع السمت ... قريباً
        </p>

      </div>
    </div>
  );
};

export default SpeakersPage;