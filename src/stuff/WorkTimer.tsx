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
  const basePath =
    process.env.NODE_ENV === "production" ? "/workout-timer-nextjs" : "";
  const dingSound = `${basePath}/assets/sounds/workding.mp3`;
  // brackets because we're destructuring the return value of useSound
  const [playDing] = useSound(dingSound);

  return (
    <div className="flex justify-center items-center my-6">
      <CountdownCircleTimer
        isPlaying
        duration={seconds}
        colors={["#34c759", "#0071e3", "#ff9500", "#ff3b30"]}
        colorsTime={[seconds, seconds * 0.66, seconds * 0.33, 0]}
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
        strokeWidth={12}
        size={240}
        trailColor="#e5e5ea"
      >
        {RenderTime}
      </CountdownCircleTimer>
    </div>
  );
}
