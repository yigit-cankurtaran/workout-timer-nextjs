import useSound from "use-sound";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import RenderTime from "./RenderTime";
import { useEffect, useRef } from "react";

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
  const beepSound = "../assets/sounds/beep.mp3";
  const dingSound = "../assets/sounds/ding.mp3";
  const [playBeep] = useSound(beepSound);
  const [playDing] = useSound(dingSound);

  const lastRemainingTimeRef = useRef<number>(seconds);

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
        {({ remainingTime }) => {
          // using remainingTime from the children of the CountdownCircleTimer component
          useEffect(() => {
            if (
              remainingTime <= 3 &&
              remainingTime > 0 &&
              remainingTime !== lastRemainingTimeRef.current
              // check if the remaining time is less than or equal to 3
              // and if it changed from the last time it was checked
            ) {
              playBeep();
              // if true play the beep sound
            }
            lastRemainingTimeRef.current = remainingTime;
            // update the ref with the current remaining time
          }, [remainingTime, playBeep]);
          return <RenderTime remainingTime={remainingTime} />;
        }}
      </CountdownCircleTimer>
    </div>
  );
}
