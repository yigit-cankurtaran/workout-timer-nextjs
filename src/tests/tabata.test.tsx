import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Tabata from "@/pages/timers/tabata";
// import error on this for some reason smh
// TODO: check and fix this
import test from "node:test";
// next 2 fix the toBeInTheDocument issue
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";

describe("Tabata Timer", () => {
  test("startWorkout sets the correct states", () => {
    const { getByText } = render(<Tabata />);
    const startButton = getByText(/start/i);
    // regex, i means case insensitive
    fireEvent.click(startButton);

    // text that only appears when the workout is running
    expect(getByText(/work/i)).toBeInTheDocument();
  });
  //  add more tests here
});
