import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import RenderTime from "../../components/RenderTime";

function amrap() {
  const [valuesSet, setValuesSet] = useState(false);
  const [minutesInput, setMinutesInput] = useState(10);
  const [seconds, setSeconds] = useState(minutesInput * 60);
  //   isnt this just restRunning?
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workRunning, setWorkRunning] = useState(false);
  const [restRunning, setRestRunning] = useState(false);
  //   idk why that one is a string but it might make sense later
  //   will we even use this? rounds is the same thing

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

  //   implement checks for inputs
  // implement proper rounds

  return (
    <div>
      {/* if values aren't set bring up the setting part */}
      {!valuesSet && (
        <div>
          <label>minutes</label>
          <input
            type="number"
            value={minutesInput}
            onChange={(e) => setMinutesInput(parseInt(e.target.value))}
            // onChange might be a problem
          />

          <button
            onClick={() => {
              setValuesSet(true);
              console.log("minutes: " + minutesInput);
              console.log("seconds: " + seconds);
            }}
          >
            set
          </button>
        </div>
      )}

      <div>
        {workoutStarted && (
          <div>
            <h1>{workRunning ? "work" : "rest"}</h1>
          </div>
        )}
      </div>
      {/* displays work or rest, whichever the user is doing */}
      {workRunning && (
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
            }}
          >
            {RenderTime}
          </CountdownCircleTimer>
        </div>
      )}
      {valuesSet && (
        <div>
          <button onClick={workoutStarted ? stopWorkout : startWorkout}>
            {workoutStarted ? "stop" : "start"}
          </button>
          <button onClick={() => setValuesSet(false)}>edit values</button>
          {/* we can still edit values here while the timer runs check the logic */}
        </div>
      )}
    </div>
  );
}

export default amrap;
