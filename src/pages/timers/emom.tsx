import React, { useState } from "react";
import WorkTimer from "@/components/worktimer";
import RestTimer from "@/components/resttimer";
import valueSetting from "@/hooks/valueSetting";

// thinking about implementing this as counting down from a set time
// input fields: minutes, work seconds, rest seconds
// work seconds + rest seconds = 60
// maybe pick a every ... minutes option to multiply this
// work timer and rest timer for work seconds and rest seconds

function emom() {
  const [valuesSet, setValuesSet] = useState(false);
  const [minutesInput, setMinutesInput] = useState("10");
  const intMins = parseInt(minutesInput);
  const [workSeconds, setWorkSeconds] = useState(40);
  const [restSeconds, setRestSeconds] = useState(20);

  return (
    <div className="flex bg-slate-900 text-gray-100 flex-col flex-grow h-screen justify-center items-center">
      emom
    </div>
  );
}

export default emom;
