import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import valueSetting from "@/helpers/valueSetting";
import WorkoutDisplay from "@/components/WorkoutDisplay";
import WorkoutComplete from "@/components/WorkoutComplete";
import WorkTimer from "@/components/WorkTimer";
import RestTimer from "@/components/RestTimer";
import ControlButtons from "@/components/ControlButtons";
import { Toaster } from "react-hot-toast";
import SetButton from "@/components/SetButton";
import { errorToast, successToast } from "@/components/CustomToast";

function hiit() {
  const [valuesSet, setValuesSet] = useState(false);
  const [seconds, setSeconds] = useState(20);
  const [restSeconds, setRestSeconds] = useState(10);
  const [rounds, setRounds] = useState(8);
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
    if (valueSetting(setValueError, seconds, restSeconds, rounds)) {
      setValuesSet(true);
      successToast("Values set!");
    } else errorToast("All values must be valid");
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
              value={seconds}
              onChange={(e) => setSeconds(Number(e.target.value))}
              className="text-center text-lg font-semibold bg-slate-900 text-gray-100 border-4 border-gray-300 p-4 rounded-lg w-64"
            />
            <p className="p-2 text-xl font-extrabold">rest</p>
            <input
              type="number"
              value={restSeconds}
              onChange={(e) => setRestSeconds(Number(e.target.value))}
              className="text-center text-lg font-semibold bg-slate-900 text-gray-100 border-4 border-gray-300 p-4 rounded-lg w-64"
            />
            <p className="p-2 text-xl font-extrabold">rounds</p>
            <input
              type="number"
              value={rounds}
              onChange={(e) => setRounds(Number(e.target.value))}
              // TODO: leading 0 doesn't look good, fix this later on
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

export default hiit;
