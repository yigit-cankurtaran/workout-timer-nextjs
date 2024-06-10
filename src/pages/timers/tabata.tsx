import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import RenderTime from "../../components/RenderTime";

function tabata() {
  const [valuesSet, setValuesSet] = useState(false);
  const [seconds, setSeconds] = useState(20);
  const [restSeconds, setRestSeconds] = useState(10);
  const [isResting, setIsResting] = useState(false);
  //   isnt this just restRunning?
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
      {!valuesSet && (
        <div>
          <label>minutes</label>
          <input
            type="number"
            value={minutesInput}
            onChange={(e) => setMinutesInput(e.target.value)}
          />
          <label>rounds</label>
          <input
            type="number"
            value={rounds}
            // if either this or the minutes have a problem change one
            onChange={(e) => setRounds(parseInt(e.target.value))}
          />
          <label>length</label>
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value))}
          />
          <label>rest length</label>
          <input
            type="number"
            value={restSeconds}
            onChange={(e) => setRestSeconds(parseInt(e.target.value))}
          />

          <button
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
      <button onClick={workoutStarted ? stopWorkout : startWorkout}>
        {workoutStarted ? "stop" : "start"}
      </button>
      {valuesSet && (
        <button onClick={() => setValuesSet(false)}>edit values</button>
      )}
      {/* the logic here might need some work. check it. */}
    </div>
  );
}

export default tabata;
