import React, { useState, useEffect } from "react";
import Head from "next/head";
import valueSetting from "@/helpers/valueSetting";
import WorkoutDisplay from "@/stuff/WorkoutDisplay";
import WorkoutComplete from "@/stuff/WorkoutComplete";
import EmomTimer from "@/stuff/EmomTimer";
import ControlButtons from "@/stuff/ControlButtons";
import { Toaster } from "react-hot-toast";
import SetButton from "@/stuff/SetButton";
import { ErrorToast, SuccessToast } from "@/stuff/CustomToast";

function Emom() {
  const [valuesSet, setValuesSet] = useState(false);
  const [strSeconds, setStrSeconds] = useState("60");
  const seconds = parseInt(strSeconds);
  const [strRounds, setStrRounds] = useState("10");
  const intRounds = parseInt(strRounds);
  const [rounds, setRounds] = useState(intRounds);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workRunning, setWorkRunning] = useState(false);
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
  }

  function handleValueSetting() {
    if (valueSetting(setValueError, seconds, 0, intRounds)) {
      setValuesSet(true);
      SuccessToast("Values set!");
    } else ErrorToast("All values must be valid");
  }

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <Head>
        <title>EMOM Timer</title>
        <meta
          name="description"
          content="Every Minute On the Minute (EMOM) timer for workouts"
        />
        <meta property="og:title" content="EMOM Timer" />
        <meta
          property="og:description"
          content="Every Minute On the Minute (EMOM) timer for workouts"
        />
        <meta
          property="og:url"
          content="https://yigit-cankurtaran.github.io/workout-timer-nextjs/timers/emom"
        />
      </Head>
      <Toaster />

      {!valuesSet ? (
        <div className="apple-card p-8 w-full mt-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            EMOM Timer Setup
          </h1>
          <div className="space-y-6">
            <div className="apple-input-group">
              <label htmlFor="seconds" className="apple-label">
                Interval Duration (seconds)
              </label>
              <input
                type="number"
                id="seconds"
                value={strSeconds}
                onChange={(e) => setStrSeconds(e.target.value)}
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
          <WorkoutDisplay workoutStarted={workoutStarted} rounds={rounds} />

          {workRunning && rounds > 0 && (
            <EmomTimer
              seconds={seconds}
              rounds={rounds}
              setWorkoutCompleted={setWorkoutCompleted}
              stopWorkout={stopWorkout}
              setRounds={setRounds}
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

export default Emom;
