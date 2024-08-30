import React, { useState } from "react";
import Head from "next/head";
import minutesToSeconds from "@/helpers/minutesToSeconds";
import valueSetting from "@/helpers/valueSetting";
import WorkoutDisplay from "@/stuff/WorkoutDisplay";
import WorkTimer from "@/stuff/WorkTimer";
import WorkoutComplete from "@/stuff/WorkoutComplete";
import ControlButtons from "@/stuff/ControlButtons";
import { Toaster } from "react-hot-toast";
import SetButton from "@/stuff/SetButton";
import { ErrorToast, SuccessToast } from "@/stuff/CustomToast";

// p much just amrap just with a different name
function Fortime() {
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
      SuccessToast("Values set!");
    } else ErrorToast("Please enter a valid number");
  }

  return (
    <div className="flex flex-col justify-center min-h-screen bg-slate-900 text-gray-100">
      <Head>
        <title>For Time Timer</title>
        <meta name="description" content="For Time timer for workouts" />
        <meta property="og:title" content="For Time Timer" />
        <meta property="og:description" content="For Time timer for workouts" />
        <meta
          property="og:url"
          content="https://yigit-cankurtaran.github.io/workout-timer-nextjs/timers/for-time"
        />
      </Head>
      {/* for toast messages */}
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
              className="text-center text-lg font-semibold bg-slate-900 text-gray-100 border-4 border-gray-300 p-4 rounded-lg w-64"
            />
          </div>

          {/* button for setting the values */}
          <SetButton handleValueSetting={handleValueSetting} />
        </div>
      )}

      <div className="flex flex-col items-center justify-center">
        {/* display for the work-rest cycles and rounds (if any) */}
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
      {/* workout complete display */}
      <WorkoutComplete workoutCompleted={workoutCompleted} />
      {/* if values are set, display start-stop buttons */}
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

export default Fortime;
