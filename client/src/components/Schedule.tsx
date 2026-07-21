
import React from 'react';
import { SCHEDULE_TEDX as SCHEDULE } from '../constants';

interface ScheduleProps {
  onSeeFull?: () => void;
}

const Schedule: React.FC<ScheduleProps> = ({ onSeeFull }) => {
  const preview = SCHEDULE.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-red-600 font-oswald text-lg font-bold tracking-widest uppercase mb-4">
          Timeline
        </h2>
        <h3 className="text-5xl font-oswald font-bold">
          Event <span className="text-red-600">Schedule</span>
        </h3>
        <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
          A quick look at the journey—full pathway details are available on the
          schedule page.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {preview.map((item) => (
          <div
            key={`${item.time}-${item.title}`}
            className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-red-600/50 transition-all"
          >
            <p className="text-red-500 font-bold uppercase tracking-widest text-[10px] mb-3">
              {item.time}
            </p>
            <h4 className="text-2xl font-oswald font-bold text-white mb-3 uppercase">
              {item.title}
            </h4>
            <p className="text-gray-400 font-light leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button
          onClick={onSeeFull}
          className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-full font-bold text-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={!onSeeFull}
        >
          View Full Schedule
        </button>
      </div>
    </div>
  );
};

export default Schedule;
