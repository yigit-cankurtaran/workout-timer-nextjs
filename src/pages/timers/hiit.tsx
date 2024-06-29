import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import RenderTime from "../../components/RenderTime";
import valueSetting from "@/hooks/valueSetting";

function tabata() {
  const [valuesSet, setValuesSet] = useState(false);
  const [seconds, setSeconds] = useState(20);
  const [restSeconds, setRestSeconds] = useState(10);
  const [rounds, setRounds] = useState(8);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workRunning, setWorkRunning] = useState(false);
  const [restRunning, setRestRunning] = useState(false);

  function startWorkout() {
    console.log("workout started");
    setWorkoutStarted(true);
    setWorkRunning(true);
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
            <p className="font-bold p-2">work</p>
            <input
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(Number(e.target.value))}
              className="text-center bg-slate-900 text-gray-100 border-4 border-gray-100 p-2 rounded-lg"
            />
            <p className="font-bold p-2">rest</p>
            <input
              type="number"
              value={restSeconds}
              onChange={(e) => setRestSeconds(Number(e.target.value))}
              className="text-center bg-slate-900 text-gray-100 border-4 border-gray-100 p-2 rounded-lg"
            />
            <p className="font-bold p-2">rounds</p>
            <input
              type="number"
              value={rounds}
              onChange={(e) => setRounds(Number(e.target.value))}
              // TODO: leading 0 doesn't look good, fix this later on
              className="text-center bg-slate-900 text-gray-100 border-4 border-gray-100 p-2 rounded-lg"
            />
          </div>

          <button
            className="text-red-400 hover:text-red-600 p-2 m-2 bg-gray-800 rounded-lg w-32 h-10 self-center"
            onClick={() => {
              if (valueSetting(seconds, restSeconds, rounds)) {
                setValuesSet(true);
                console.log("values set");
              }
            }}
          >
            set
          </button>
        </div>
      )}

      <div className="flex flex-col items-center justify-center">
        {workoutStarted && rounds > 0 && (
          <div className="text-center">
            <h1>{workRunning ? "work" : "rest"}</h1>
            <p>rounds: {rounds}</p>
          </div>
        )}
        {workRunning && rounds > 0 && (
          <div>
            <CountdownCircleTimer
              isPlaying
              duration={seconds}
              colors={["#004777", "#F7B801", "#A30000"]}
              colorsTime={[seconds, 0]}
              onComplete={() => {
                console.log("timer ended by itself");
                setWorkRunning(false);
                setRestRunning(true);
                setRounds(rounds - 1);
              }}
            >
              {RenderTime}
            </CountdownCircleTimer>
          </div>
        )}
        {restRunning && rounds > 0 && (
          <div>
            <CountdownCircleTimer
              isPlaying
              duration={restSeconds}
              colors={["#92C9E8", "#FFF4CC", "#F2A9A9"]}
              colorsTime={[restSeconds, 0]}
              onComplete={() => {
                console.log("rest timer ended by itself");
                setRestRunning(false);
                setWorkRunning(true);
              }}
            >
              {RenderTime}
            </CountdownCircleTimer>
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
        </div>
      )}
    </div>
  );
}

export default tabata;
