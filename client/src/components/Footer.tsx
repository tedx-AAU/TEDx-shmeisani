import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12"
    style={{ fontFamily: "'Childos Arabic', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <span className=" text-4xl font-bold mb-8 block">
            <span className="text-red-600">TEDx</span>Shmeisani
          </span>
          <p className="text-gray-400 max-w-sm mb-10 leading-relaxed text-lg font-light">
            Location:<a href=" https://maps.app.goo.gl/a3HKhBVbSpbWcxrg9" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">  Shmeisani— Amman, Jordan</a>
          </p>
        </div>

        <div className="pt-12 border-t border-white/5 text-center">
          <p className="text-[10px] text-gray-600 max-w-2xl mx-auto mb-6 uppercase tracking-wider leading-relaxed">
            This TEDx event is independently organized. TEDx events are operated
            under license from TED.
          </p>
          <p className="text-xs text-gray-400 font-medium mb-2">
            &copy; {new Date().getFullYear()} TEDx Shmeisani.
          </p>
          <p className="text-xs text-gray-500">
            Developed by Skyfall Enterprises
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
