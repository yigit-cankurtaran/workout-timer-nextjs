import React from "react";
import formatTime from "../helpers/formatTime";

export default function RenderTime({
  remainingTime,
}: {
  remainingTime: number;
}) {
  if (remainingTime === 0) {
    return <p className="text-2xl font-semibold text-[#34c759]">Complete!</p>;
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold tracking-tight">
        {formatTime(remainingTime)}
      </h1>
      <p className="text-sm text-[#86868b] mt-1">seconds</p>
    </div>
  );
}
// rendertime is a render prop
// it takes the remainingTime as a prop
// it's built into the react-countdown-circle-timer component
// the component keeps track of the countdown state and passes it to the render prop every time it renders
