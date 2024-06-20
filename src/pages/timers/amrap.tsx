import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import RenderTime from "../../components/RenderTime";
import minutesToSeconds from "@/hooks/minutesToSeconds";

function amrap() {
  const [valuesSet, setValuesSet] = useState(false);
  const [minutesInput, setMinutesInput] = useState("10");
  const intMins = parseInt(minutesInput);
  // using this to make it easier to set the values
  const [seconds, setSeconds] = useState(minutesToSeconds(intMins));
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workRunning, setWorkRunning] = useState(false);
  const [restRunning, setRestRunning] = useState(false);
  // TODO: think about implementing a pause here.
  // TODO: maybe a rep counter for the user to keep track of their rounds

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

  return (
    <div>
      {/* if values aren't set bring up the setting part */}
      {!valuesSet && (
        <div>
          <label>minutes</label>
          <input
            type="number"
            value={minutesInput}
            onChange={(e) => setMinutesInput(e.target.value)}
            // onChange might be a problem
          />

          <button onClick={valueSetting}>set</button>
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
