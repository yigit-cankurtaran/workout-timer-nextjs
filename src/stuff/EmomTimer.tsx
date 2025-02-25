import React from "react";
import useSound from "use-sound";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import RenderTime from "./RenderTime";

type EmomTimerProps = {
  seconds: number;
  rounds: number;
  setWorkoutCompleted: (value: boolean) => void;
  setRounds: (value: number) => void;
  stopWorkout: () => void;
};

export default function EmomTimer({
  seconds,
  rounds,
  setWorkoutCompleted,
  stopWorkout,
  setRounds,
}: EmomTimerProps) {
  const dingSound = "../assets/sounds/workding.mp3";
  const [playDing] = useSound(dingSound);

  // Use a key to force the timer to re-render when a round completes
  const [key, setKey] = React.useState(0);

  return (
    <div className="flex justify-center items-center my-6">
      <CountdownCircleTimer
        key={key}
        isPlaying
        duration={seconds}
        colors={["#34c759", "#0071e3", "#ff9500", "#ff3b30"]}
        colorsTime={[seconds, seconds * 0.66, seconds * 0.33, 0]}
        onComplete={() => {
          playDing();

          if (rounds - 1 === 0) {
            console.log("workout completed");
            setWorkoutCompleted(true);
            stopWorkout();
            return { shouldRepeat: false };
          } else {
            setRounds(rounds - 1);
            setKey((prevKey) => prevKey + 1); // Change key to force re-render
            return { shouldRepeat: false };
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
