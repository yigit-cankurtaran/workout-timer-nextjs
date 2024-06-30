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
            stopWorkout();
          } else {
            setWorkRunning(false);
            setRestRunning(true);
            setRounds(rounds - 1);
          }
        }}
      >
        {RenderTime}
      </CountdownCircleTimer>
    </div>
  );
}
