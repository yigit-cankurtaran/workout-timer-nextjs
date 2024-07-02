import React from "react";

type ControlButtonsProps = {
  workoutStarted: boolean;
  setValuesSet: (value: boolean) => void;
  stopWorkout: () => void;
  startWorkout: () => void;
};

// TODO: add a cancel button for edit

function ControlButtons({
  workoutStarted,
  setValuesSet,
  stopWorkout,
  startWorkout,
}: ControlButtonsProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="text-red-400 hover:text-red-600 p-2 m-2 bg-gray-800 rounded-lg w-32 h-10 self-center"
        onClick={workoutStarted ? stopWorkout : startWorkout}
      >
        {workoutStarted ? "stop" : "start"}
      </button>
      <button
        className="text-red-400 hover:text-red-600 p-2 m-2 bg-gray-800 rounded-lg w-32 h-10 self-center"
        onClick={() => {
          stopWorkout();
          setValuesSet(false);
        }}
      >
        edit values
      </button>
    </div>
  );
}

export default ControlButtons;
