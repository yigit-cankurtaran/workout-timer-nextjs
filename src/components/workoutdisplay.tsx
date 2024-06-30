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
    <div className="text-center">
      <h1>
        {/* if workRunning exists change between work and rest, else it's just work */}
        {workRunning !== undefined ? (workRunning ? "work" : "rest") : "work"}
      </h1>
      {rounds > 0 && <p>rounds: {rounds}</p>}
    </div>
  );
}
