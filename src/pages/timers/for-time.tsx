import React, { useState } from "react";
import minutesToSeconds from "@/hooks/minutesToSeconds";
import valueSetting from "@/hooks/valueSetting";
import WorkoutDisplay from "@/components/workoutdisplay";
import WorkTimer from "@/components/worktimer";
import WorkoutComplete from "@/components/workoutcomplete";
import ControlButtons from "@/components/controlbuttons";
import toast, { Toaster } from "react-hot-toast";
import SetButton from "@/components/setbutton";

// p much just amrap just with a different name
function fortime() {
  const [valuesSet, setValuesSet] = useState(false);
  const [minutesInput, setMinutesInput] = useState("10");
  const intMins = parseInt(minutesInput);
  const [seconds, setSeconds] = useState(minutesToSeconds(intMins));
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workRunning, setWorkRunning] = useState(false);
  const [restRunning, setRestRunning] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [valueError, setValueError] = useState(false);

  function startWorkout() {
    console.log("workout started");
    setWorkoutStarted(true);
    setWorkRunning(true);
    setWorkoutCompleted(false);
  }

  function stopWorkout() {
    console.log("workout stopped");
    setWorkoutStarted(false);
    if (workRunning) setWorkRunning(false);
    if (restRunning) setRestRunning(false);
  }

  function handleValueSetting() {
    if (valueSetting(setValueError, intMins)) {
      setValuesSet(true);
      setSeconds(minutesToSeconds(intMins));
      toast.success("Values set!");
    } else toast.error("Please enter a valid number");
  }

  return (
    <div className="flex flex-col justify-center min-h-screen bg-slate-900 text-gray-100">
      <Toaster />
      {!valuesSet && (
        <div className="flex flex-col">
          <div className="flex p-4 flex-col items-center ">
            <p className="p-2 text-xl font-extrabold">minutes:</p>
            <input
              type="number"
              value={minutesInput}
              onChange={(e) => setMinutesInput(e.target.value)}
              // makes the input send with an enter
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleValueSetting();
                }
              }}
              className="text-center text-lg font-semibold bg-slate-900 text-gray-100 border-4 border-gray-100 p-4 rounded-lg w-64"
            />
          </div>

          <SetButton handleValueSetting={handleValueSetting} />
        </div>
      )}

      <div className="flex flex-col items-center justify-center">
        <WorkoutDisplay workoutStarted={workoutStarted} />
        {workRunning && (
          <WorkTimer
            seconds={seconds}
            rounds={1}
            // practically functions as a 1 round timer
            setWorkoutCompleted={setWorkoutCompleted}
            stopWorkout={stopWorkout}
            setWorkRunning={setWorkRunning}
            setRestRunning={setRestRunning}
            setRounds={() => {}}
          />
        )}
      </div>
      <WorkoutComplete workoutCompleted={workoutCompleted} />
      {valuesSet && (
        <ControlButtons
          workoutStarted={workoutStarted}
          setValuesSet={setValuesSet}
          stopWorkout={stopWorkout}
          startWorkout={startWorkout}
        />
      )}
    </div>
  );
}

export default fortime;
