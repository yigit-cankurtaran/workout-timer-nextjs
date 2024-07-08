import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
// need to use useEffect for the rounds value
import valueSetting from "@/helpers/valueSetting";
import WorkTimer from "@/components/WorkTimer";
import RestTimer from "@/components/RestTimer";
import ControlButtons from "@/components/ControlButtons";
import { Toaster } from "react-hot-toast";
import SetButton from "@/components/SetButton";
import { errorToast, successToast } from "@/components/CustomToast";
import WorkoutDisplay from "@/components/WorkoutDisplay";

function Tabata() {
  const [valuesSet, setValuesSet] = useState(false);
  const [minutesInput, setMinutesInput] = useState("4");
  const intMins = parseInt(minutesInput);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workRunning, setWorkRunning] = useState(false);
  const [restRunning, setRestRunning] = useState(false);
  const [rounds, setRounds] = useState(8);
  const [seconds, setSeconds] = useState(20);
  const [restSeconds, setRestSeconds] = useState(10);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [valueError, setValueError] = useState(false);

  useEffect(() => {
    const intMins = parseInt(minutesInput);
    if (intMins > 0) {
      setRounds(intMins * 2);
      // this keeps the value we left off at
    }
  }, [minutesInput]);
  // 2 rounds per minute
  // 20 seconds work, 10 seconds rest

  function startWorkout() {
    console.log("workout started");
    setWorkoutStarted(true);
    setWorkoutCompleted(false);
    setWorkRunning(true);
  }

  function stopWorkout() {
    console.log("workout stopped");
    setWorkoutStarted(false);
    if (workRunning) setWorkRunning(false);
    if (restRunning) setRestRunning(false);

    // this is to reset the rounds to the original value
    setMinutesInput("4");
    setRounds(8);
    // just in case
    setSeconds(20);
    setRestSeconds(10);
  }

  function handleValueSetting() {
    if (valueSetting(setValueError, intMins)) {
      setValuesSet(true);
      successToast("Values set!");
    } else errorToast("Please enter a valid number");
  }

  return (
    <div className="flex flex-col justify-center bg-slate-900 min-h-screen text-gray-100">
      <Helmet prioritizeSeoTags>
        <title>Tabata Timer</title>
        <meta
          name="description"
          content="Tabata timer for high intensity interval training (HIIT)"
        />
      </Helmet>
      <Toaster />
      {!valuesSet && (
        <div className="flex flex-col">
          <div className="flex p-4 flex-col items-center">
            <p id="minutes" className="p-2 text-xl font-extrabold">
              minutes
            </p>
            <input
              type="number"
              id="minutesInput"
              value={minutesInput}
              onChange={(e) => setMinutesInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleValueSetting();
              }}
              className="text-center text-lg font-semibold bg-slate-900 text-gray-100 border-4 border-gray-300 p-4 rounded-lg w-64"
            />
          </div>
          <SetButton handleValueSetting={handleValueSetting} />
        </div>
      )}

      <div className="flex flex-col items-center justify-center">
        <WorkoutDisplay
          workoutStarted={workoutStarted}
          workRunning={workRunning}
          rounds={rounds}
        />
        {/* if work is running and rounds are above 0, display worktTimer  */}
        {workRunning && rounds > 0 && (
          <WorkTimer
            seconds={seconds}
            rounds={rounds}
            setWorkoutCompleted={setWorkoutCompleted}
            stopWorkout={stopWorkout}
            setWorkRunning={setWorkRunning}
            setRestRunning={setRestRunning}
            setRounds={setRounds}
          />
        )}
        {/* if rest is running run RestTimer */}
        {restRunning && (
          <RestTimer
            restSeconds={restSeconds}
            setRestRunning={setRestRunning}
            setWorkRunning={setWorkRunning}
          />
        )}
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

export default Tabata;
