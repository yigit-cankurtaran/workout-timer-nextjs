import React from "react";

type WorkoutCompleteProps = {
  workoutCompleted: boolean;
};

export default function WorkoutComplete({
  workoutCompleted,
}: WorkoutCompleteProps) {
  if (workoutCompleted) {
    return (
      <div className="apple-card p-6 text-center my-6 max-w-md mx-auto">
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full mb-3 bg-[#34c759]/10 text-[#34c759]">
          <span className="font-semibold text-sm">COMPLETED</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">Workout Complete! 🎉</h2>
        <p className="text-[#86868b] dark:text-[#86868b]">
          Great job! You've completed your workout.
        </p>
      </div>
    );
  }
  return null;
}
