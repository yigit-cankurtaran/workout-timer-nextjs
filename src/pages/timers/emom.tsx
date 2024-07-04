import React, { useState, useEffect } from "react";
import WorkTimer from "@/components/worktimer";
import RestTimer from "@/components/resttimer";
import valueSetting from "@/hooks/valueSetting";
import WorkoutDisplay from "@/components/workoutdisplay";
import WorkoutComplete from "@/components/workoutcomplete";
import ControlButtons from "@/components/controlbuttons";
import toast, { Toaster } from "react-hot-toast";
import SetButton from "@/components/setbutton";

function emom() {
  const [valuesSet, setValuesSet] = useState(false);
  const [minutesInput, setMinutesInput] = useState("10");
  const intMins = parseInt(minutesInput);
  const [rounds, setRounds] = useState(10);
  const [workSeconds, setWorkSeconds] = useState(45);
  const [restSeconds, setRestSeconds] = useState(15);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workRunning, setWorkRunning] = useState(false);
  const [restRunning, setRestRunning] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [valueError, setValueError] = useState(false);

  useEffect(() => {
    const intMins = parseInt(minutesInput);
    if (intMins > 0) {
      setRounds(intMins);
    }
  }, [minutesInput]);
  // TODO: round change works properly but the display doesnt change

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
    // this is to reset the rounds to the original value
    setMinutesInput("10");
    setRounds(10);
  }

  function handleValueSetting() {
    if (valueSetting(setValueError, workSeconds, restSeconds, intMins)) {
      setValuesSet(true);
      toast.success("Values set!");
    } else toast.error("Please enter a valid number");
  }

  return (
    <div className="flex bg-slate-900 text-gray-100 flex-col flex-grow h-screen justify-center items-center">
      <Toaster />
      {/* inputs */}
      {!valuesSet && (
        <div className="flex flex-col">
          <div className="flex p-4 flex-col items-center">
            <p className="font-bold p-4">minutes:</p>
            <input
              type="number"
              value={minutesInput}
              onChange={(e) => setMinutesInput(e.target.value)}
              className="text-center bg-slate-900 text-gray-100 border-4 border-gray-100 p-2 rounded-lg"
            />
            <p className="font-bold p-2">work seconds</p>
            <input
              type="number"
              value={workSeconds}
              onChange={(e) => setWorkSeconds(Number(e.target.value))}
              className="text-center bg-slate-900 text-gray-100 border-4 border-gray-100 p-2 rounded-lg"
            />
            <p className="font-bold p-2">rest seconds</p>
            <input
              type="number"
              value={restSeconds}
              onChange={(e) => setRestSeconds(Number(e.target.value))}
              className="text-center bg-slate-900 text-gray-100 border-4 border-gray-100 p-2 rounded-lg"
            />
          </div>

          <SetButton handleValueSetting={handleValueSetting} />
        </div>
      )}

      {/* workout display */}
      <div className="flex flex-col items-center justify-center">
        <WorkoutDisplay workoutStarted={workoutStarted} rounds={rounds} />
        {/* work timer */}
        {workRunning && (
          <WorkTimer
            seconds={workSeconds}
            rounds={intMins}
            setWorkoutCompleted={setWorkoutCompleted}
            setWorkRunning={setWorkRunning}
            setRestRunning={setRestRunning}
            setRounds={() => {}} // not used
            stopWorkout={stopWorkout}
          />
        )}
        {/* rest timer */}
        {restRunning && (
          <RestTimer
            restSeconds={restSeconds}
            setWorkRunning={setWorkRunning}
            setRestRunning={setRestRunning}
          />
        )}
        <WorkoutComplete workoutCompleted={workoutCompleted} />
      </div>
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

export default emom;
