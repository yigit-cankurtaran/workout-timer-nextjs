import React, { useState } from "react";
import Head from "next/head";
import valueSetting from "@/helpers/valueSetting";
import WorkoutDisplay from "@/stuff/WorkoutDisplay";
import WorkoutComplete from "@/stuff/WorkoutComplete";
import SingleTimer from "@/stuff/SingleTimer";
import ControlButtons from "@/stuff/ControlButtons";
import { Toaster } from "react-hot-toast";
import SetButton from "@/stuff/SetButton";
import { ErrorToast, SuccessToast } from "@/stuff/CustomToast";

function Amrap() {
  const [valuesSet, setValuesSet] = useState(false);
  const [strSeconds, setStrSeconds] = useState("300");
  const seconds = parseInt(strSeconds);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workRunning, setWorkRunning] = useState(false);
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
  }

  function handleValueSetting() {
    if (valueSetting(setValueError, seconds, 0, 1)) {
      setValuesSet(true);
      SuccessToast("Values set!");
    } else ErrorToast("All values must be valid");
  }

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <Head>
        <title>AMRAP Timer</title>
        <meta
          name="description"
          content="As Many Rounds As Possible (AMRAP) timer for workouts"
        />
        <meta property="og:title" content="AMRAP Timer" />
        <meta
          property="og:description"
          content="As Many Rounds As Possible (AMRAP) timer for workouts"
        />
        <meta
          property="og:url"
          content="https://yigit-cankurtaran.github.io/workout-timer-nextjs/timers/amrap"
        />
      </Head>
      <Toaster />

      {!valuesSet ? (
        <div className="apple-card p-8 w-full mt-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            AMRAP Timer Setup
          </h1>
          <div className="space-y-6">
            <div className="apple-input-group">
              <label htmlFor="seconds" className="apple-label">
                Total Duration (seconds)
              </label>
              <input
                type="number"
                id="seconds"
                value={strSeconds}
                onChange={(e) => setStrSeconds(e.target.value)}
                className="text-center font-medium"
              />
            </div>

            <SetButton handleValueSetting={handleValueSetting} />
          </div>
        </div>
      ) : (
        <div className="w-full mt-8">
          <WorkoutDisplay workoutStarted={workoutStarted} />

          {workRunning && (
            <SingleTimer
              seconds={seconds}
              setWorkoutCompleted={setWorkoutCompleted}
              stopWorkout={stopWorkout}
            />
          )}

          <WorkoutComplete workoutCompleted={workoutCompleted} />

          <ControlButtons
            workoutStarted={workoutStarted}
            setValuesSet={setValuesSet}
            stopWorkout={stopWorkout}
            startWorkout={startWorkout}
          />
        </div>
      )}
    </div>
  );
}

export default Amrap;
