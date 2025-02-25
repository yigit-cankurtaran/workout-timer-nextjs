import React, { useState, useEffect } from "react";
import Head from "next/head";
import valueSetting from "@/helpers/valueSetting";
import WorkoutDisplay from "@/stuff/WorkoutDisplay";
import WorkoutComplete from "@/stuff/WorkoutComplete";
import WorkTimer from "@/stuff/WorkTimer";
import RestTimer from "@/stuff/RestTimer";
import ControlButtons from "@/stuff/ControlButtons";
import { Toaster } from "react-hot-toast";
import SetButton from "@/stuff/SetButton";
import { ErrorToast, SuccessToast } from "@/stuff/CustomToast";
import StructuredData from "@/stuff/StructuredData";

function Hiit() {
  const [valuesSet, setValuesSet] = useState(false);
  const [strSeconds, setStrSeconds] = useState("20");
  const seconds = parseInt(strSeconds);
  const [strRest, setStrRest] = useState("10");
  const restSeconds = parseInt(strRest);
  // the usual string to int to delete leading zero
  const [strRounds, setStrRounds] = useState("8");
  // rounds leads to a problem in that, fix it later on
  const intRounds = parseInt(strRounds);
  const [rounds, setRounds] = useState(intRounds);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workRunning, setWorkRunning] = useState(false);
  const [restRunning, setRestRunning] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [valueError, setValueError] = useState(false);

  // resetting rounds
  useEffect(() => {
    const intRounds = parseInt(strRounds);
    if (intRounds > 0) {
      setRounds(intRounds);
    }
  }, [strRounds]);

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
    if (valueSetting(setValueError, seconds, restSeconds, intRounds)) {
      setValuesSet(true);
      SuccessToast("Values set!");
    } else ErrorToast("All values must be valid");
  }

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <Head>
        <title>HIIT Timer</title>
        <meta
          name="description"
          content="High Intensity Interval Training (HIIT) timer for workouts"
        />
        <meta property="og:title" content="HIIT Timer" />
        <meta
          property="og:description"
          content="High Intensity Interval Training (HIIT) timer for workouts"
        />
        <meta
          property="og:url"
          content="https://yigit-cankurtaran.github.io/workout-timer-nextjs/timers/hiit"
        />
        <meta property="og:type" content="website" />
      </Head>

      <StructuredData
        type="WebPage"
        name="HIIT Timer"
        description="High Intensity Interval Training (HIIT) timer for workouts with customizable work and rest intervals"
        url="https://yigit-cankurtaran.github.io/workout-timer-nextjs/timers/hiit"
        dateModified={new Date().toISOString().split("T")[0]}
      />

      <StructuredData
        type="HowTo"
        name="How to Use the HIIT Timer"
        description="Follow these steps to set up and use the HIIT workout timer"
        url="https://yigit-cankurtaran.github.io/workout-timer-nextjs/timers/hiit"
        steps={[
          "Enter your desired work duration in seconds",
          "Enter your desired rest duration in seconds",
          "Enter the number of rounds you want to complete",
          "Click the Set button to confirm your settings",
          "Press Start to begin your workout",
          "Complete the work intervals at high intensity",
          "Rest during the rest intervals",
          "Continue until all rounds are completed",
        ]}
        totalTime="PT30M"
      />

      <Toaster />

      {!valuesSet ? (
        <div className="apple-card p-8 w-full mt-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            HIIT Timer Setup
          </h1>
          <div className="space-y-6">
            <div className="apple-input-group">
              <label htmlFor="work" className="apple-label">
                Work Duration (seconds)
              </label>
              <input
                type="number"
                id="work"
                value={strSeconds}
                onChange={(e) => setStrSeconds(e.target.value)}
                className="text-center font-medium"
              />
            </div>

            <div className="apple-input-group">
              <label htmlFor="rest" className="apple-label">
                Rest Duration (seconds)
              </label>
              <input
                type="number"
                id="rest"
                value={strRest}
                onChange={(e) => setStrRest(e.target.value)}
                className="text-center font-medium"
              />
            </div>

            <div className="apple-input-group">
              <label htmlFor="rounds" className="apple-label">
                Number of Rounds
              </label>
              <input
                type="number"
                id="rounds"
                value={strRounds}
                onChange={(e) => setStrRounds(e.target.value)}
                className="text-center font-medium"
              />
            </div>

            <SetButton handleValueSetting={handleValueSetting} />
          </div>
        </div>
      ) : (
        <div className="w-full mt-8">
          <WorkoutDisplay
            workoutStarted={workoutStarted}
            workRunning={workRunning}
            rounds={rounds}
          />

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

          {restRunning && rounds > 0 && (
            <RestTimer
              restSeconds={restSeconds}
              setRestRunning={setRestRunning}
              setWorkRunning={setWorkRunning}
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

export default Hiit;
