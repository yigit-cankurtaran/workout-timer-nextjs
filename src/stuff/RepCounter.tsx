import React from 'react';

interface RepCounterProps {
  reps: number;
  addRep: () => void;
}

const RepCounter: React.FC<RepCounterProps> = ({ reps, addRep }) => {
  return (
    <div className="flex flex-col items-center">
      <button
        className="text-slate-300 hover:text-white font-bold text-center p-4 m-4 bg-gray-800 rounded-lg self-center"
        onClick={addRep}
      >
        add rep
      </button>
      <p className="font-bold">current reps: {reps}</p>
    </div>
  );
};

export default RepCounter;
