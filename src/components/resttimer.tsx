import { CountdownCircleTimer } from "react-countdown-circle-timer";
import RenderTime from "./RenderTime";

type RestTimerProps = {
  restSeconds: number;
  setRestRunning: (value: boolean) => void;
  setWorkRunning: (value: boolean) => void;
};

export default function RestTimer({
  restSeconds,
  setRestRunning,
  setWorkRunning,
}: RestTimerProps) {
  return (
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
  );
}
