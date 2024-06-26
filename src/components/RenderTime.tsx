import formatTime from "../hooks/formatTime";

export default function RenderTime({
  remainingTime,
}: {
  remainingTime: number;
}) {
  if (remainingTime === 0) {
    return <p>You're done!</p>;
  }
  return (
    <div>
      <h1>{formatTime(remainingTime)}</h1>
      {/* doesn't seem to work?? will check out */}
    </div>
  );
}
// rendertime is a render prop
// it takes the remainingTime as a prop
// it's built into the react-countdown-circle-timer component
// the component keeps track of the countdown state and passes it to the render prop every time it renders
