import React, { useState } from "react";
import minutesToSeconds from "@/helpers/minutesToSeconds";
import valueSetting from "@/helpers/valueSetting";
import WorkoutDisplay from "@/stuff/WorkoutDisplay";
import WorkTimer from "@/stuff/WorkTimer";
import WorkoutComplete from "@/stuff/WorkoutComplete";
import ControlButtons from "@/stuff/ControlButtons";
import { Toaster } from "react-hot-toast";
import { SuccessToast, ErrorToast } from "@/stuff/CustomToast";
import SetButton from "@/stuff/SetButton";
import Head from "next/head";

function Amrap() {
  const [valuesSet, setValuesSet] = useState(false);
  const [minutesInput, setMinutesInput] = useState("10");
  const intMins = parseInt(minutesInput);
  // using this to make it easier to set the values
  const [seconds, setSeconds] = useState(minutesToSeconds(intMins));
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workRunning, setWorkRunning] = useState(false);
  const [restRunning, setRestRunning] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [valueError, setValueError] = useState(false);
  const [reps, setReps] = useState(0);

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
      SuccessToast("Values set!");
    } else ErrorToast("Please enter a valid number");
  }

  function addRep() {
    setReps(reps + 1);
  }

  return (
    <div className="flex flex-col justify-center min-h-screen bg-slate-900 text-gray-100">
      <Head>
        <title>AMRAP Timer</title>
        <meta
          name="description"
          content="As many rounds as possible (AMRAP) timer for workouts"
        />
        <meta property="og:title" content="AMRAP Timer" />
        <meta
          property="og:description"
          content="As many rounds as possible (AMRAP) timer for workouts"
        />
        <meta
          property="og:url"
          content="https://yigit-cankurtaran.github.io/workout-timer-nextjs/timers/amrap"
        />
      </Head>
      <Toaster />
      {/* if values aren't set bring up the setting part */}
      {!valuesSet && (
        <div className="flex flex-col">
          <div className="flex p-4 flex-col items-center">
            <p className="p-2 text-xl font-extrabold">minutes</p>
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
              className="text-center text-lg font-semibold bg-slate-900 text-gray-100 border-4 border-gray-300 p-4 rounded-lg w-64"
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
      {workoutStarted && (
        // div for reps
        <div className="flex flex-col items-center">
          <button
            className="text-slate-300 hover:text-white font-bold text-center p-4 m-4 bg-gray-800 rounded-lg self-center"
            onClick={addRep}
          >
            add rep
          </button>
          <p className="font-bold">current reps: {reps}</p>
        </div>
      )}
    </div>
  );
}

export default Amrap;
