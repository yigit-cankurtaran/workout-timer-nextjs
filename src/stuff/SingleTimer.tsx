import React from "react";
import useSound from "use-sound";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import RenderTime from "./RenderTime";

type SingleTimerProps = {
  seconds: number;
  setWorkoutCompleted: (value: boolean) => void;
  stopWorkout: () => void;
};

export default function SingleTimer({
  seconds,
  setWorkoutCompleted,
  stopWorkout,
}: SingleTimerProps) {
  const dingSound = "../assets/sounds/workding.mp3";
  const [playDing] = useSound(dingSound);

  return (
    <div className="flex justify-center items-center my-6">
      <CountdownCircleTimer
        isPlaying
        duration={seconds}
        colors={["#34c759", "#0071e3", "#ff9500", "#ff3b30"]}
        colorsTime={[seconds, seconds * 0.66, seconds * 0.33, 0]}
        onComplete={() => {
          console.log("workout completed");
          setWorkoutCompleted(true);
          playDing();
          stopWorkout();
          return { shouldRepeat: false };
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
