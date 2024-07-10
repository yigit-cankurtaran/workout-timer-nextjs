import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import valueSetting from "@/helpers/valueSetting";
import WorkoutDisplay from "@/stuff/WorkoutDisplay";
import WorkoutComplete from "@/stuff/WorkoutComplete";
import WorkTimer from "@/stuff/WorkTimer";
import RestTimer from "@/stuff/RestTimer";
import ControlButtons from "@/stuff/ControlButtons";
import { Toaster } from "react-hot-toast";
import SetButton from "@/stuff/SetButton";
import { ErrorToast, SuccessToast } from "@/stuff/CustomToast";

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
  // TODO: check the rounds on the other timers as well
  // if there are any issues fix before release

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
    <div className="flex flex-col justify-center min-h-screen bg-slate-900 text-gray-100">
      <Helmet prioritizeSeoTags>
        <title>HIIT Timer</title>
        <meta
          name="description"
          content="High Intensity Interval Training (HIIT) timer for workouts"
        />
      </Helmet>
      <Toaster />
      {!valuesSet && (
        <div className="flex flex-col">
          <div className="flex p-4 flex-col items-center">
            <p className="p-2 text-xl font-extrabold">work</p>
            <input
              type="number"
              value={strSeconds}
              onChange={(e) => setStrSeconds(e.target.value)}
              className="text-center text-lg font-semibold bg-slate-900 text-gray-100 border-4 border-gray-300 p-4 rounded-lg w-64"
            />
            <p className="p-2 text-xl font-extrabold">rest</p>
            <input
              type="number"
              value={restSeconds}
              onChange={(e) => setStrRest(e.target.value)}
              className="text-center text-lg font-semibold bg-slate-900 text-gray-100 border-4 border-gray-300 p-4 rounded-lg w-64"
            />
            <p className="p-2 text-xl font-extrabold">rounds</p>
            <input
              type="number"
              value={strRounds}
              onChange={(e) => setStrRounds(e.target.value)}
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

export default Hiit;
