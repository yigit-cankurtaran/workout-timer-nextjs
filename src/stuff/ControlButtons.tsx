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
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
      <button
        className={`apple-button flex items-center justify-center min-w-[120px] py-3 px-6 ${
          workoutStarted
            ? "bg-[#ff3b30] hover:bg-[#ff453a]"
            : "bg-[#34c759] hover:bg-[#30d158]"
        }`}
        onClick={workoutStarted ? stopWorkout : startWorkout}
      >
        <span className="font-medium">{workoutStarted ? "Stop" : "Start"}</span>
      </button>

      <button
        className="apple-button-secondary flex items-center justify-center min-w-[120px] py-3 px-6"
        onClick={() => {
          stopWorkout();
          setValuesSet(false);
        }}
      >
        <span className="font-medium">Edit</span>
      </button>
    </div>
  );
}

export default ControlButtons;
