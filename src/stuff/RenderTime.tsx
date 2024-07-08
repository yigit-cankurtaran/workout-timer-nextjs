import formatTime from "../helpers/formatTime";

export default function RenderTime({
  remainingTime,
}: {
  remainingTime: number;
}) {
  if (remainingTime === 0) {
    return <p>You&apos;re done!</p>;
  }
  return (
    <div>
      <h1 className="font-bold text-3xl">{formatTime(remainingTime)}</h1>
    </div>
  );
}
// rendertime is a render prop
// it takes the remainingTime as a prop
// it's built into the react-countdown-circle-timer component
// the component keeps track of the countdown state and passes it to the render prop every time it renders
