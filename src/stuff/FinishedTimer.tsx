import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import RenderTime from "./RenderTime";

function FinishedTimer() {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={0}
      // duration is 0 to show the finished message
      colors={["#004777", "#F7B801", "#A30000"]}
      colorsTime={[0, 0]}
      onComplete={() => {
        console.log("timer ended by itself");
      }}
    >
      {RenderTime}
    </CountdownCircleTimer>
  );
}

export default FinishedTimer;
