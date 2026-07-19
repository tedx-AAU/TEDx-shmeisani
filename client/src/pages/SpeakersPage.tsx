import React from 'react';
import { SPEAKERS } from '../constants';

const SpeakersPage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen pb-24 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-32">
          <h2 className="text-red-600 font-oswald text-xl font-bold tracking-[0.5em] uppercase mb-4">
            The Voices
          </h2>
          <h1 className="text-6xl md:text-8xl font-oswald font-extrabold tracking-tight">
            SPEAKER <span className="text-red-600">GALLERY</span>
          </h1>
          <p className="mt-8 text-gray-400 max-w-2xl mx-auto text-xl font-light">
            Ten visionaries crossing the boundaries of their fields to bring you
            ideas worth spreading.
          </p>
        </header>

        <div className="space-y-40">
          {SPEAKERS.map((speaker, index) => {
            const isImageLeft = index % 2 === 0;
            return (
              <div
                key={speaker.id}
                className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${
                  isImageLeft ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image Section */}
                <div className="w-full lg:w-1/2 group">
                  <div className="relative overflow-hidden rounded-2xl border-4 border-white/5 aspect-[4/5] lg:aspect-[3/4]">
                    <img
                      src={speaker.imageUrl}
                      alt={speaker.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    <div className="absolute top-6 left-6 bg-red-600 text-white text-xs font-bold uppercase tracking-widest py-2 px-4 rounded-full shadow-xl">
                      {speaker.category}
                    </div>
                  </div>
                </div>

                {/* Text Section */}
                <div
                  className={`w-full lg:w-1/2 space-y-6 ${isImageLeft ? 'lg:text-left' : 'lg:text-right'}`}
                >
                  <div className="inline-block px-4 py-1 border border-red-600/30 text-red-500 text-xs font-bold rounded-full uppercase tracking-tighter">
                    Speaker 0{index + 1}
                  </div>
                  <h3 className="text-4xl md:text-6xl font-oswald font-bold leading-tight">
                    {speaker.name}
                  </h3>
                  <p className="text-red-600 text-xl md:text-2xl font-semibold tracking-tight uppercase">
                    {speaker.title}
                  </p>
                  <div
                    className={`h-1 w-20 bg-red-600 ${isImageLeft ? 'mr-auto' : 'ml-auto'}`}
                  />
                  <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light">
                    {speaker.bio}
                  </p>
                  {(speaker.linkedin ||
                    speaker.facebook ||
                    speaker.instagram) && (
                    <div
                      className={`flex gap-4 pt-6 ${isImageLeft ? 'justify-start' : 'justify-end'}`}
                    >
                      {speaker.linkedin && (
                        <a
                          href={speaker.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-red-600 transition-colors p-2 border border-white/10 rounded-full hover:border-red-600/50"
                          aria-label={`${speaker.name} LinkedIn`}
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                      )}
                      {speaker.facebook && (
                        <a
                          href={speaker.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-red-600 transition-colors p-2 border border-white/10 rounded-full hover:border-red-600/50"
                          aria-label={`${speaker.name} Facebook`}
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </a>
                      )}
                      {speaker.instagram && (
                        <a
                          href={speaker.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-red-600 transition-colors p-2 border border-white/10 rounded-full hover:border-red-600/50"
                          aria-label={`${speaker.name} Instagram`}
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

 

export default SpeakersPage;