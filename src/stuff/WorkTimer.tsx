import React from "react";
import useSound from "use-sound";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import RenderTime from "./RenderTime";

type WorkTimerProps = {
  seconds: number;
  rounds: number;
  setWorkoutCompleted: (value: boolean) => void;
  setWorkRunning: (value: boolean) => void;
  setRestRunning: (value: boolean) => void;
  setRounds: (value: number) => void;
  stopWorkout: () => void;
};

export default function WorkTimer({
  seconds,
  rounds,
  setWorkoutCompleted,
  stopWorkout,
  setWorkRunning,
  setRestRunning,
  setRounds,
}: WorkTimerProps) {
  const dingSound = "../assets/sounds/workding.mp3";
  // brackets because we're destructuring the return value of useSound
  const [playDing] = useSound(dingSound);

  return (
    <div>
      <CountdownCircleTimer
        isPlaying
        duration={seconds}
        colors={["#004777", "#F7B801", "#A30000"]}
        colorsTime={[seconds, 0]}
        onComplete={() => {
          if (rounds - 1 === 0) {
            console.log("workout completed");
            setWorkoutCompleted(true);
            playDing();
            // might change it to a celebratory sound later
            stopWorkout();
          } else {
            setWorkRunning(false);
            setRestRunning(true);
            setRounds(rounds - 1);
            playDing();
            // plays ding sound after each round
          }
        }}
        strokeWidth={20}
        size={256}
      >
        {RenderTime}
      </CountdownCircleTimer>
    </div>
  );
}
