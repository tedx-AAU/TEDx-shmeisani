import React from 'react';
import { PARTNERS } from '../constants';
import type { Partner } from '../../types';

const PartnersSection: React.FC = () => {
  const platinumPartners = PARTNERS.filter((p) => p.tier === 'Platinum');
  const goldPartners = PARTNERS.filter((p) => p.tier === 'Gold');
  const silverPartners = PARTNERS.filter((p) => p.tier === 'Silver');
  const mediaPartners = PARTNERS.filter((p) => p.tier === 'Media');
  const roboticsPartners = PARTNERS.filter((p) => p.tier === 'Robotics');
  const communityPartners = PARTNERS.filter((p) => p.tier === 'Community');

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden"
    style={{ fontFamily: "'Childos Arabic', sans-serif" }}>
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-red-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-red-900/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Section Header */}
      <div className="relative text-center mb-24 z-10">
        <h2 className="text-red-600 text-xl font-bold tracking-[0.2em] uppercase mb-4">
          <br/>
          <br/>
          <br/>
          Our Support Network
        </h2>
        <h3 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tight">
          The{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
            Sponsors
          </span>
        </h3>
        <div className="w-24 h-1.5 bg-red-600 mx-auto mt-8 rounded-full"></div>
      </div>

      <div className="relative space-y-28 z-10">
        {/* Platinum Tier */}
        {platinumPartners.length > 0 && (
          <div className="relative">
            <div className="flex items-center gap-4 mb-16">
              <div className="h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent flex-1"></div>
              <h4 className="text-3xl text-white uppercase tracking-[0.15em] font-light">
                 <span className="font-bold text-red-500"></span>
              </h4>
              <div className="h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent flex-1"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-8 lg:gap-12 px-4 md:px-12">
              {platinumPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="w-full md:w-[calc(50%-1.5rem)]"
                >
                  <PartnerCard partner={partner} size="large" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gold Tier */}
        {goldPartners.length > 0 && (
          <div className="relative">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1"></div>
              <h4 className="text-2xl 
              text-white/90 uppercase tracking-[0.15em] font-light">
                <span className="font-bold text-yellow-500/80"></span>
              </h4>
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 lg:gap-8 px-4">
              {goldPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)]"
                >
                  <PartnerCard partner={partner} size="medium" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Silver Tier */}
        {silverPartners.length > 0 && (
          <div className="relative">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1"></div>
              <h4 className="text-xl text-white/70 uppercase tracking-[0.15em] font-light">
                 <span className="font-bold text-gray-400"></span>
              </h4>
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 px-4">
              {silverPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(25%-1.5rem)] lg:w-[calc(20%-1.5rem)]"
                >
                  <PartnerCard partner={partner} size="small" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Media Partners */}
        {mediaPartners.length > 0 && (
          <div className="relative">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent flex-1"></div>
              <h4 className="text-xl text-white/80 uppercase tracking-[0.15em] font-light">
                <span className="font-bold text-blue-400"></span>
              </h4>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent flex-1"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 px-4">
              {mediaPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(25%-1.5rem)] lg:w-[calc(20%-1.5rem)]"
                >
                  <PartnerCard partner={partner} size="small" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Robotics Partners */}
        {roboticsPartners.length > 0 && (
          <div className="relative">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent flex-1"></div>
              <h4 className="text-xl text-white/80 uppercase tracking-[0.15em] font-light">
                
                <span className="font-bold text-purple-400"></span>
              </h4>
              <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent flex-1"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 px-4">
              {roboticsPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(25%-1.5rem)] lg:w-[calc(20%-1.5rem)]"
                >
                  <PartnerCard partner={partner} size="small" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community Partners */}
        {communityPartners.length > 0 && (
          <div className="relative">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent flex-1"></div>
              <h4 className="text-xl  text-white/60 uppercase tracking-[0.15em] font-light">
              
                <span className="font-bold text-white/40"></span>
              </h4>
              <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent flex-1"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 px-4">
              {communityPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(25%-1.5rem)] lg:w-[calc(20%-1.5rem)]"
                >
                  <PartnerCard partner={partner} size="small" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface PartnerCardProps {
  partner: Partner;
  size: 'large' | 'medium' | 'small';
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner, size }) => {
  // Styles based on size
  const heightClass =
    size === 'large' ? 'h-64' : size === 'medium' ? 'h-40' : 'h-28';
  const imgClass =
    size === 'large'
      ? 'h-32 md:h-40'
      : size === 'medium'
        ? 'h-16 md:h-20'
        : 'h-10 md:h-12';

  // Dynamic glow color based on tier would be cool, but sticking to red/neutral for consistency

  return (
    <div
      className={`group relative flex items-center justify-center ${heightClass} 
      bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden
      transition-all duration-500 
      hover:bg-zinc-800/60 hover:border-red-500/30 hover:-translate-y-1
      hover:shadow-[0_10px_40px_-10px_rgba(220,38,38,0.2)]
    `}
    >
      {/* Dynamic corner accents on hover */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-600/0 to-transparent transition-all duration-500 group-hover:from-red-600/10"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-red-600/0 to-transparent transition-all duration-500 group-hover:from-red-600/10"></div>

      {/* Logo */}
      <img
        src={partner.logoUrl}
        alt={partner.name}
        className={`${imgClass} w-4/5 object-contain opacity-50 grayscale transition-all duration-500 
          group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 filter drop-shadow-lg`}
      />
    </div>
  );
};

export default PartnersSection;
