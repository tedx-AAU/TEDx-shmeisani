import React from 'react';
import { TEAM_MEMBERS } from '../constants';

const TeamPage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-24">
         
          <h1 className="text-6xl md:text-8xl font-oswald font-extrabold tracking-tight">
             بنّائين <span className="text-red-600"> السمت</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          {TEAM_MEMBERS.map((member, index) => {
            const isAloneInRow = TEAM_MEMBERS.length % 3 === 1 && index === TEAM_MEMBERS.length - 1;
            return (
            <div
              key={member.id}
              className={`group relative overflow-hidden rounded-2xl bg-zinc-900 aspect-[4/5] border border-white/5 ${isAloneInRow ? 'lg:col-start-2' : ''}`}
            >
              {/* Image with grayscale filter on hover */}
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:grayscale group-hover:scale-110"
              />

              {/* Red Tint Overlay on Hover */}
              <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Info & Buttons Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 p-8 text-center">
                <h3 className="text-2xl font-oswald font-bold mb-1">
                  {member.name}
                </h3>
                <p className="text-red-500 font-bold uppercase tracking-widest text-xs mb-6">
                  {member.role}
                </p>

                <div className="flex gap-4">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black p-3 rounded-full hover:bg-red-600 hover:text-white transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                  {member.instagram && (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black p-3 rounded-full hover:bg-red-600 hover:text-white transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Default Gradient Bottom for Visibility */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent group-hover:opacity-0 transition-opacity" />
              <div className="absolute bottom-6 left-6 group-hover:opacity-0 transition-opacity">
                <h4 className="text-xl font-oswald font-bold">{member.name}</h4>
                <p className="text-red-500 text-xs font-bold uppercase tracking-widest">
                  {member.role}
                </p>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
