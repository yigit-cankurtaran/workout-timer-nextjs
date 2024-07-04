import React from "react";

type ControlButtonsProps = {
  workoutStarted: boolean;
  setValuesSet: (value: boolean) => void;
  stopWorkout: () => void;
  startWorkout: () => void;
};

function ControlButtons({
  workoutStarted,
  setValuesSet,
  stopWorkout,
  startWorkout,
}: ControlButtonsProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="text-slate-300 hover:text-white text-xl font-bold text-center p-4 m-4 bg-gray-800 rounded-lg w-48"
        onClick={workoutStarted ? stopWorkout : startWorkout}
      >
        {workoutStarted ? "stop" : "start"}
      </button>
      <button
        className="text-slate-300 hover:text-white text-xl font-bold text-center p-4 m-4 bg-gray-800 rounded-lg w-48"
        onClick={() => {
          stopWorkout();
          setValuesSet(false);
        }}
      >
        edit
      </button>
    </div>
  );
}

export default ControlButtons;
