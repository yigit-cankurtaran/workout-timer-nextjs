import React, { useState, useEffect } from "react";
import Head from "next/head";
import WorkTimer from "@/stuff/WorkTimer";
import RestTimer from "@/stuff/RestTimer";
import valueSetting from "@/helpers/valueSetting";
import WorkoutDisplay from "@/stuff/WorkoutDisplay";
import WorkoutComplete from "@/stuff/WorkoutComplete";
import ControlButtons from "@/stuff/ControlButtons";
import { Toaster } from "react-hot-toast";
import SetButton from "@/stuff/SetButton";
import { ErrorToast, SuccessToast } from "@/stuff/CustomToast";

function Emom() {
  const [valuesSet, setValuesSet] = useState(false);
  const [minutesInput, setMinutesInput] = useState("10");
  const intMins = parseInt(minutesInput);
  const [rounds, setRounds] = useState(intMins);
  const [strWork, setStrWork] = useState("45");
  const workSeconds = parseInt(strWork);
  const [strRest, setStrRest] = useState("15");
  const restSeconds = parseInt(strRest);
  // we receive input as string
  // we later parse it into int
  // if we receive input as int we get leading 0s
  // this is how i fix leading 0s
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workRunning, setWorkRunning] = useState(false);
  const [restRunning, setRestRunning] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [valueError, setValueError] = useState(false);

  // resetting rounds
  useEffect(() => {
    const intMins = parseInt(minutesInput);
    if (intMins > 0) {
      setRounds(intMins);
    }
  }, [minutesInput]);

  function startWorkout() {
    console.log("workout started");
    setWorkoutStarted(true);
    setWorkRunning(true);
    setWorkoutCompleted(false);
  }

  function stopWorkout() {
    console.log("workout stopped");
    setWorkoutStarted(false);
    setWorkRunning(false);
    setRestRunning(false);
  }

  function handleValueSetting() {
    if (valueSetting(setValueError, workSeconds, restSeconds, intMins)) {
      setValuesSet(true);
      SuccessToast("Values set!");
    } else ErrorToast("All values must be valid");
  }

  useEffect(() => {
    if (rounds === 0 && workoutStarted) {
      console.log("workout completed");
      setWorkoutCompleted(true);
      stopWorkout();
    }
  }, [rounds, workoutStarted]);
  // using useEffect instead of relying on the workTimer
  // check later if we really need this

  return (
    <div className="flex bg-slate-900 text-gray-100 flex-col flex-grow h-screen justify-center items-center">
      <Head>
        <title>EMOM Timer</title>
        <meta
          name="description"
          content="Every minute on the minute (EMOM) timer for workouts"
        />
        <meta property="og:title" content="EMOM Timer" />
        <meta
          property="og:description"
          content="Every minute on the minute (EMOM) timer for workouts"
        />
        <meta
          property="og:url"
          content="https://yigit-cankurtaran.github.io/workout-timer-nextjs/timers/emom"
        />
      </Head>
      <Toaster />
      {/* inputs */}
      {!valuesSet && (
        <div className="flex flex-col">
          <div className="flex p-4 flex-col items-center">
            <p className="p-2 text-xl font-extrabold">minutes</p>
            <input
              type="number"
              value={minutesInput}
              onChange={(e) => setMinutesInput(e.target.value)}
              className="text-center text-lg font-semibold bg-slate-900 text-gray-100 border-4 border-gray-300 p-4 rounded-lg w-64"
            />
            <p className="p-2 text-xl font-extrabold">work seconds</p>
            <input
              type="number"
              value={strWork}
              onChange={(e) => setStrWork(e.target.value)}
              className="text-center text-lg font-semibold bg-slate-900 text-gray-100 border-4 border-gray-300 p-4 rounded-lg w-64"
            />
            <p className="p-2 text-xl font-extrabold">rest seconds</p>
            <input
              type="number"
              value={strRest}
              onChange={(e) => setStrRest(e.target.value)}
              className="text-center text-lg font-semibold bg-slate-900 text-gray-100 border-4 border-gray-300 p-4 rounded-lg w-64"
            />
          </div>

          <SetButton handleValueSetting={handleValueSetting} />
        </div>
      )}

      {/* workout display */}
      <div className="flex flex-col items-center justify-center">
        <WorkoutDisplay
          workoutStarted={workoutStarted}
          workRunning={workRunning}
          rounds={rounds}
        />
        {/* work timer */}
        {workRunning && rounds > 0 && (
          <WorkTimer
            seconds={workSeconds}
            rounds={rounds}
            setWorkoutCompleted={setWorkoutCompleted}
            setWorkRunning={setWorkRunning}
            setRestRunning={setRestRunning}
            setRounds={setRounds}
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

export default Emom;
