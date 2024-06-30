import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import RenderTime from "../../components/RenderTime";
import minutesToSeconds from "@/hooks/minutesToSeconds";
import valueSetting from "@/hooks/valueSetting";
import WorkoutDisplay from "@/components/settingdisplay";

function amrap() {
  const [valuesSet, setValuesSet] = useState(false);
  const [minutesInput, setMinutesInput] = useState("10");
  const intMins = parseInt(minutesInput);
  // using this to make it easier to set the values
  const [seconds, setSeconds] = useState(minutesToSeconds(intMins));
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workRunning, setWorkRunning] = useState(false);
  const [restRunning, setRestRunning] = useState(false);
  // TODO: think about implementing a pause in this timer.
  // TODO: maybe a rep counter for the user to keep track of their rounds
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
    <div className="flex flex-col justify-center min-h-screen bg-slate-900 text-gray-100">
      {/* if values aren't set bring up the setting part */}
      {!valuesSet && (
        <div className="flex flex-col">
          <div className="flex p-4 flex-col items-center ">
            <p className="font-bold p-4">minutes:</p>
            <input
              type="number"
              value={minutesInput}
              onChange={(e) => setMinutesInput(e.target.value)}
              // makes the input send with an enter
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (valueSetting(intMins)) {
                    setValuesSet(true);
                    setSeconds(minutesToSeconds(intMins));
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
                setSeconds(minutesToSeconds(intMins));
              }
            }}
            className="text-red-400 hover:text-red-600 p-2 m-2 bg-gray-800 rounded-lg w-32 h-10 self-center"
          >
            set
          </button>
        </div>
      )}

      <div className="flex flex-col items-center justify-center">
        <WorkoutDisplay workoutStarted={workoutStarted} />
        {workRunning && (
          <CountdownCircleTimer
            isPlaying
            duration={seconds}
            colors={["#004777", "#F7B801", "#A30000"]}
            colorsTime={[seconds, 0]}
            onComplete={() => {
              console.log("timer ended by itself");
              setWorkRunning(false);
              setRestRunning(true);
              setWorkoutStarted(false);
              setWorkoutCompleted(true);
            }}
          >
            {RenderTime}
          </CountdownCircleTimer>
        )}
        {workoutCompleted && (
          <div className="text-center mt-4">
            <h2 className="text-lg font-semibold">
              Congrats! Workout complete!
            </h2>
          </div>
        )}
      </div>
      {valuesSet && (
        <div className="flex flex-col justify-center items-center">
          <button
            className="text-red-400 hover:text-red-600 p-2 m-2 bg-gray-800 rounded-lg w-32 h-10 self-center"
            onClick={workoutStarted ? stopWorkout : startWorkout}
          >
            {workoutStarted ? "stop" : "start"}
          </button>
          <button
            className="text-red-400 hover:text-red-600 p-2 m-2 bg-gray-800 rounded-lg w-32 h-10 self-center"
            onClick={() => setValuesSet(false)}
          >
            edit values
          </button>
          {/* we can still edit values here while the timer runs check the logic */}
        </div>
      )}
    </div>
  );
}

export default amrap;
