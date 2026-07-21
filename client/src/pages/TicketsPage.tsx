import React from 'react';
import BookingForm from '../components/BookingForm';

const TicketsPage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-24">
          <h2 className="text-red-600 font-oswald text-xl font-bold tracking-[0.5em] uppercase mb-4">
            Register
          </h2>
          <h1 className="text-6xl md:text-8xl font-oswald font-extrabold tracking-tight">
            GET YOUR <span className="text-red-600">TICKETS</span>
          </h1>
          <p className="mt-8 text-gray-400 max-w-2xl mx-auto text-xl font-light">
            Join 500+ innovators for a day that will change the way you see the
            world.
          </p>
        </header>

        <div className="mt-16">
          <BookingForm />
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;