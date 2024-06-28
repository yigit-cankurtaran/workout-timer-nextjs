import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import RenderTime from "../../components/RenderTime";
import minutesToSeconds from "@/hooks/minutesToSeconds";

function tabata() {
  const [valuesSet, setValuesSet] = useState(false);
  const [seconds, setSeconds] = useState(20);
  const [restSeconds, setRestSeconds] = useState(10);
  const [rounds, setRounds] = useState(8);
  // TODO: make this so that it's tied to the rounds
  // for tabata
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workRunning, setWorkRunning] = useState(false);
  const [restRunning, setRestRunning] = useState(false);
  const [minutesInput, setMinutesInput] = useState("4");
  const intMins = parseInt(minutesInput);

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

  function valueSetting() {
    if (isNaN(intMins) || intMins <= 0) {
      alert("invalid input");
      // TODO: later replace with toast
      return;
    }

    setValuesSet(true);
    setSeconds(minutesToSeconds(intMins));
    console.log("minutes: " + minutesInput);
    console.log("seconds: " + seconds);
    // seconds prints the previous value but it works properly
  }

  // implement proper rounds

  return (
    <div className="flex flex-col justify-center min-h-screen bg-slate-900 text-gray-100">
      {/* if values aren't set bring up the setting part */}
      {!valuesSet && (
        <div className="flex flex-col">
          <div className="flex p-4 flex-col items-center ">
            <p className="font-bold p-2">minutes</p>
            <input
              type="number"
              value={minutesInput}
              onChange={(e) => setMinutesInput(e.target.value)}
              // onChange might be a problem
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     valueSetting();
              //   }
              // }}
              className="text-center bg-slate-900 text-gray-100 border-4 border-gray-100 p-2 rounded-lg"
            />
            <p className="font-bold p-2">rounds</p>
            <input
              type="number"
              value={rounds}
              // if either this or the minutes have a problem change one
              onChange={(e) => setRounds(parseInt(e.target.value))}
              className="text-center bg-slate-900 text-gray-100 border-4 border-gray-100 p-2 rounded-lg"
            />
            <p className="font-bold p-2">length</p>
            <input
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(parseInt(e.target.value))}
              className="text-center bg-slate-900 text-gray-100 border-4 border-gray-100 p-2 rounded-lg"
            />
            <p className="font-bold p-2">rest length</p>
            <input
              type="number"
              value={restSeconds}
              onChange={(e) => setRestSeconds(parseInt(e.target.value))}
              className="text-center bg-slate-900 text-gray-100 border-4 border-gray-100 p-2 rounded-lg"
            />
          </div>

          <button
            className="text-red-400 hover:text-red-600 p-2 m-2 bg-gray-800 rounded-lg w-32 h-10 self-center"
            onClick={() => {
              setValuesSet(true);
              console.log("minutes: " + minutesInput);
              console.log("rounds: " + rounds);
              console.log("seconds: " + seconds);
              console.log("restSeconds: " + restSeconds);
            }}
          >
            set
          </button>
        </div>
      )}

      <div className="flex flex-col items-center justify-center">
        {workoutStarted && (
          <div className="text-center">
            <h1>{workRunning ? "work" : "rest"}</h1>
            <p>rounds: {rounds}</p>
          </div>
        )}
        {/* displays work or rest, whichever the user is doing */}
        {workRunning && rounds > 0 && (
          // it doesn't stop when rounds is 0, check and fix
          // checking for it above and ending the workout might help
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
        {restRunning && (
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
