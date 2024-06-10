import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import RenderTime from "../../components/RenderTime";

function tabata() {
  const [seconds, setSeconds] = useState(20);
  const [isResting, setIsResting] = useState(false);
  const [rounds, setRounds] = useState(8);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workRunning, setWorkRunning] = useState(false);
  const [restRunning, setRestRunning] = useState(false);
  const [minutesInput, setMinutesInput] = useState("4");
  //   idk why that one is a string but it might make sense later

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
    <div>
      <div>{workoutStarted && <h1>{workRunning ? "work" : "rest"}</h1>}</div>
      {workRunning && (
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
            duration={10}
            //   placeholder for later
            colors={["#92C9E8", "#FFF4CC", "#F2A9A9"]}
            colorsTime={[10, 0]}
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
      <button onClick={workoutStarted ? stopWorkout : startWorkout}>
        {workoutStarted ? "stop" : "start"}
      </button>
    </div>
  );
}

export default tabata;
