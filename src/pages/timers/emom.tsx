import React, { useState } from "react";
import WorkTimer from "@/components/worktimer";
import RestTimer from "@/components/resttimer";
import valueSetting from "@/hooks/valueSetting";
import WorkoutDisplay from "@/components/workoutdisplay";

// thinking about implementing this as counting down from a set time
// input fields: minutes, work seconds, rest seconds
// work seconds + rest seconds = 60
// maybe pick a every ... minutes option to multiply this
// work timer and rest timer for work seconds and rest seconds

function emom() {
  const [valuesSet, setValuesSet] = useState(false);
  const [minutesInput, setMinutesInput] = useState("10");
  const intMins = parseInt(minutesInput);
  const [workSeconds, setWorkSeconds] = useState(45);
  const [restSeconds, setRestSeconds] = useState(15);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workRunning, setWorkRunning] = useState(false);
  const [restRunning, setRestRunning] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);

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

  return (
    <div className="flex bg-slate-900 text-gray-100 flex-col flex-grow h-screen justify-center items-center">
      {/* inputs */}
      {!valuesSet && (
        <div className="flex flex-col">
          <div className="flex p-4 flex-col items-center">
            <p className="font-bold p-4">minutes:</p>
            <input
              type="number"
              value={minutesInput}
              onChange={(e) => setMinutesInput(e.target.value)}
              className="text-center bg-slate-900 text-gray-100 border-4 border-gray-100 p-2 rounded-lg"
            />
            <p className="font-bold p-2">work</p>
            <input
              type="number"
              value={workSeconds}
              onChange={(e) => setWorkSeconds(Number(e.target.value))}
              className="text-center bg-slate-900 text-gray-100 border-4 border-gray-100 p-2 rounded-lg"
            />
            <p className="font-bold p-2">rest</p>
            <input
              type="number"
              value={restSeconds}
              onChange={(e) => setRestSeconds(Number(e.target.value))}
              className="text-center bg-slate-900 text-gray-100 border-4 border-gray-100 p-2 rounded-lg"
            />
          </div>

          {/* setting button */}
          <button
            onClick={() => {
              if (valueSetting(workSeconds, restSeconds, intMins)) {
                setValuesSet(true);
              }
            }}
            className="text-red-400 hover:text-red-600 p-2 m-2 bg-gray-800 rounded-lg w-32 h-10 self-center"
          >
            set
          </button>
        </div>
      )}

      {/* workout display */}
      <div className="flex flex-col items-center justify-center">
        <WorkoutDisplay workoutStarted={workoutStarted} />
        {/* work timer */}
        {/* {workRunning && (
          <WorkTimer
            seconds={workSeconds}
            rounds={1}
            workoutCompleted={workoutCompleted}
            setWorkoutCompleted={setWorkoutCompleted}
            restRunning={restRunning}
            setRestRunning={setRestRunning}
          />
        )} */}
      </div>
    </div>
  );
}

export default emom;
