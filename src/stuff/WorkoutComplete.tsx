import React from "react";

type WorkoutCompleteProps = {
  workoutCompleted: boolean;
};

export default function WorkoutComplete({
  workoutCompleted,
}: WorkoutCompleteProps) {
  if (workoutCompleted) {
    return (
      <div className="text-center mt-4">
        <h2 className="text-lg font-semibold">Congrats! Workout complete!</h2>
      </div>
    );
  }
}
