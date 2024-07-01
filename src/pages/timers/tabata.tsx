import React, { useState, useEffect } from "react";
// need to use useEffect for the rounds value
import valueSetting from "@/hooks/valueSetting";
import WorkTimer from "@/components/worktimer";
import RestTimer from "@/components/resttimer";
import ControlButtons from "@/components/controlbuttons";

function tabata() {
  const [valuesSet, setValuesSet] = useState(false);
  const [minutesInput, setMinutesInput] = useState("4");
  const intMins = parseInt(minutesInput);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workRunning, setWorkRunning] = useState(false);
  const [restRunning, setRestRunning] = useState(false);
  const [rounds, setRounds] = useState(8);
  const [seconds, setSeconds] = useState(20);
  const [restSeconds, setRestSeconds] = useState(10);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);

  useEffect(() => {
    const intMins = parseInt(minutesInput);
    if (intMins > 0) {
      setRounds(intMins * 2);
      // this keeps the value we left off at
    }
  }, [minutesInput]);
  // 2 rounds per minute
  // 20 seconds work, 10 seconds rest

  function startWorkout() {
    console.log("workout started");
    setWorkoutStarted(true);
    setWorkoutCompleted(false);
    setWorkRunning(true);
  }

  function stopWorkout() {
    console.log("workout stopped");
    setWorkoutStarted(false);
    if (workRunning) setWorkRunning(false);
    if (restRunning) setRestRunning(false);

    // this is to reset the rounds to the original value
    setMinutesInput("4");
    setRounds(8);
    // just in case
    setSeconds(20);
    setRestSeconds(10);
  }

  return (
    <div className="flex flex-col justify-center bg-slate-900 min-h-screen text-gray-100">
      {!valuesSet && (
        <div className="flex flex-col">
          <div className="flex p-4 flex-col items-center ">
            <p id="minutes" className="p-2 font-bold">
              minutes
            </p>
            <input
              type="number"
              id="minutesInput"
              value={minutesInput}
              onChange={(e) => setMinutesInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (valueSetting(intMins)) {
                    setValuesSet(true);
                  }
                }
              }}
              className="text-center bg-slate-900 text-gray-100 border-4 border-gray-100 p-2 rounded-lg"
            />
          </div>
          <button
            onClick={() => {
              if (valueSetting(intMins)) {
                setValuesSet(true);
                console.log("minutes: " + minutesInput);
                console.log("rounds: " + rounds);
                console.log("seconds: " + seconds);
                console.log("restSeconds: " + restSeconds);
              }
            }}
            className="text-red-400 hover:text-red-600 p-2 m-2 bg-gray-800 rounded-lg w-32 h-10 self-center"
          >
            set
          </button>
        </div>
      )}

      <div className="flex flex-col items-center justify-center">
        {workoutStarted && (
          <div>
            <h1 className="text-center">{workRunning ? "work" : "rest"}</h1>
            <p>rounds: {rounds}</p>
          </div>
        )}
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

export default tabata;
