import React, { useState, useEffect, useCallback, useMemo } from "react";
import Head from "next/head";
import valueSetting from "@/helpers/valueSetting";
import WorkTimer from "@/stuff/WorkTimer";
import RestTimer from "@/stuff/RestTimer";
import ControlButtons from "@/stuff/ControlButtons";
import { Toaster } from "react-hot-toast";
import SetButton from "@/stuff/SetButton";
import { ErrorToast, SuccessToast } from "@/stuff/CustomToast";
import WorkoutDisplay from "@/stuff/WorkoutDisplay";
import WorkoutComplete from "@/stuff/WorkoutComplete";

function Tabata() {
  const [valuesSet, setValuesSet] = useState(false);
  const [minutesInput, setMinutesInput] = useState("4");
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workRunning, setWorkRunning] = useState(false);
  const [restRunning, setRestRunning] = useState(false);
  const [rounds, setRounds] = useState(8);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);

  const intMins = useMemo(() => parseInt(minutesInput), [minutesInput]);
  const seconds = useMemo(() => 20, []); // Tabata work interval is always 20 seconds
  const restSeconds = useMemo(() => 10, []); // Tabata rest interval is always 10 seconds

  useEffect(() => {
    if (intMins > 0) {
      setRounds(intMins * 2);
    }
  }, [intMins]);

  const startWorkout = useCallback(() => {
    setWorkoutStarted(true);
    setWorkoutCompleted(false);
    setWorkRunning(true);
  }, []);

  const stopWorkout = useCallback(() => {
    setWorkoutStarted(false);
    setWorkRunning(false);
    setRestRunning(false);
    setMinutesInput("4");
    setRounds(intMins * 2);
  }, [intMins]);

  const handleValueSetting = useCallback(() => {
    if (valueSetting(() => {}, intMins)) {
      setValuesSet(true);
      SuccessToast("Values set!");
    } else ErrorToast("Please enter a valid number");
  }, [intMins]);

  return (
    <div className="flex flex-col justify-center bg-slate-900 min-h-screen text-gray-100">
      <Head>
        <title>Tabata Timer</title>
        <meta
          name="description"
          content="Tabata timer for high intensity interval training (HIIT)"
        />
        <meta property="og:title" content="Tabata Timer" />
        <meta
          property="og:description"
          content="Tabata timer for high intensity interval training (HIIT)"
        />
        <meta
          property="og:url"
          content="https://yigit-cankurtaran.github.io/workout-timer-nextjs/timers/tabata"
        />
      </Head>
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
        {restRunning && (
          <RestTimer
            restSeconds={restSeconds}
            setRestRunning={setRestRunning}
            setWorkRunning={setWorkRunning}
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
    </div>
  );
}

export default React.memo(Tabata);
