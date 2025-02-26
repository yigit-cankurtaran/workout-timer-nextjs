import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import RenderTime from "./RenderTime";
import useSound from "use-sound";

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
  const basePath =
    process.env.NODE_ENV === "production" ? "/workout-timer-nextjs" : "";
  const restChime = `${basePath}/assets/sounds/restchime.mp3`;
  const [playRest] = useSound(restChime);

  return (
    <div className="flex justify-center items-center my-6">
      <CountdownCircleTimer
        isPlaying
        duration={restSeconds}
        colors={["#0071e3", "#5ac8fa", "#ff9500"]}
        colorsTime={[restSeconds, restSeconds * 0.5, 0]}
        onComplete={() => {
          console.log("rest timer ended by itself");
          playRest();
          setRestRunning(false);
          setWorkRunning(true);
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
