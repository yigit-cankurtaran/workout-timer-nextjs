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

function Tabata() {
  const [valuesSet, setValuesSet] = useState(false);
  const [strSeconds, setStrSeconds] = useState("20");
  const seconds = parseInt(strSeconds);
  const [strRest, setStrRest] = useState("10");
  const restSeconds = parseInt(strRest);
  const [strRounds, setStrRounds] = useState("8");
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
        <title>Tabata Timer</title>
        <meta
          name="description"
          content="Tabata workout timer with 20 seconds of work and 10 seconds of rest"
        />
        <meta property="og:title" content="Tabata Timer" />
        <meta
          property="og:description"
          content="Tabata workout timer with 20 seconds of work and 10 seconds of rest"
        />
        <meta
          property="og:url"
          content="https://yigit-cankurtaran.github.io/workout-timer-nextjs/timers/tabata"
        />
        <meta property="og:type" content="website" />
      </Head>

      <StructuredData
        type="WebPage"
        name="Tabata Timer"
        description="Tabata workout timer with customizable work and rest intervals"
        url="https://yigit-cankurtaran.github.io/workout-timer-nextjs/timers/tabata"
        dateModified={new Date().toISOString().split("T")[0]}
      />

      <StructuredData
        type="SportsActivity"
        name="Tabata Workout"
        description="Tabata is a high-intensity interval training that consists of 8 rounds of 20-second exercises followed by 10 seconds of rest"
        url="https://yigit-cankurtaran.github.io/workout-timer-nextjs/timers/tabata"
        activityType="ExerciseAction"
        sportsActivityLocation="Home"
      />

      <Toaster />

      {!valuesSet ? (
        <div className="apple-card p-8 w-full mt-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            Tabata Timer Setup
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

export default Tabata;
