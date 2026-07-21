import React from 'react';
interface HeroProps {
  onSeeSpeakers: () => void;
  onGetTickets: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSeeSpeakers, onGetTickets }) => {
  return (
    <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
    {/*
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
       */}
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black z-1" />

      <div className="relative z-10 text-center px-4 max-w-5xl">
        <h2 className="text-red-600 font-bold tracking-[0.4em] mb-6 uppercase text-xl md:text-2xl">
          TEDx shmeisani
        </h2>
        <h1 className="text-white text-6xl md:text-9xl font-extrabold mb-8 leading-none tracking-tighter">
          كل طريق ببدا  <span className="text-red-600">بنقطة</span>
        </h1>
      
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/*tickets button on*/}
          <button
            onClick={onGetTickets}
            className="w-full sm:w-auto bg-red-600 text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-red-700 transition-all shadow-[0_0_30px_rgba(235,0,40,0.5)] hover:scale-105 active:scale-95"
          >
            Get Tickets
          </button>
          <button
            onClick={onSeeSpeakers}
            className="w-full sm:w-auto bg-transparent border-2 border-white/20 text-white px-12 py-5 rounded-full font-bold text-lg hover:border-red-600 hover:text-red-600 transition-all"
          >
            Meet Speakers
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
