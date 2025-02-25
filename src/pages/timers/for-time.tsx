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
import StructuredData from "@/stuff/StructuredData";

function ForTime() {
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
        <title>For Time Timer</title>
        <meta
          name="description"
          content="For Time timer for workouts - complete as fast as possible"
        />
        <meta property="og:title" content="For Time Timer" />
        <meta
          property="og:description"
          content="For Time timer for workouts - complete as fast as possible"
        />
        <meta
          property="og:url"
          content="https://yigit-cankurtaran.github.io/workout-timer-nextjs/timers/for-time"
        />
        <meta property="og:type" content="website" />
      </Head>

      <StructuredData
        type="WebPage"
        name="For Time Timer"
        description="For Time workout timer to track how quickly you can complete a workout"
        url="https://yigit-cankurtaran.github.io/workout-timer-nextjs/timers/for-time"
        dateModified={new Date().toISOString().split("T")[0]}
      />

      <StructuredData
        type="HowTo"
        name="How to Use the For Time Timer"
        description="Follow these steps to set up and use the For Time workout timer"
        url="https://yigit-cankurtaran.github.io/workout-timer-nextjs/timers/for-time"
        steps={[
          "Enter your time cap in seconds (default is 300 seconds)",
          "Click the Set button to confirm your settings",
          "Press Start to begin your workout",
          "Complete your workout as quickly as possible",
          "The timer will count up from zero",
          "Press Stop when you've completed all the required work",
          "Your final time will be displayed",
        ]}
        totalTime="PT10M"
      />

      <Toaster />

      {!valuesSet ? (
        <div className="apple-card p-8 w-full mt-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            For Time Timer Setup
          </h1>
          <div className="space-y-6">
            <div className="apple-input-group">
              <label htmlFor="seconds" className="apple-label">
                Time Cap (seconds)
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

export default ForTime;
