import React from "react";

type WorkoutDisplayProps = {
  workoutStarted: boolean;
  workRunning?: boolean;
  rounds?: number;
  //   ? means that the prop is optional
};

export default function WorkoutDisplay({
  workoutStarted,
  workRunning,
  rounds = 0,
  //   setting as 0 to avoid undefined error
}: WorkoutDisplayProps) {
  if (!workoutStarted) return null;

  return (
    <div className="apple-card p-6 text-center mb-6 max-w-md mx-auto w-full">
      <div
        className={`inline-flex items-center justify-center px-4 py-2 rounded-full mb-3 ${
          workRunning !== undefined
            ? workRunning
              ? "bg-[#34c759]/10 text-[#34c759]"
              : "bg-[#ff9500]/10 text-[#ff9500]"
            : "bg-[#34c759]/10 text-[#34c759]"
        }`}
      >
        <span className="font-semibold text-sm">
          {workRunning !== undefined ? (workRunning ? "WORK" : "REST") : "WORK"}
        </span>
      </div>

      <h1 className="text-3xl font-bold mb-2">
        {workRunning !== undefined
          ? workRunning
            ? "Work Phase 💪🏻"
            : "Rest Phase 💨"
          : "Work Phase 💪🏻"}
      </h1>

      {rounds > 0 && (
        <div className="mt-4 flex items-center justify-center">
          <div className="bg-[#1d1d1f]/10 dark:bg-white/10 px-4 py-2 rounded-full">
            <p className="font-medium">
              <span className="text-[#86868b] dark:text-[#86868b] mr-2">
                Rounds:
              </span>
              <span>{rounds}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
