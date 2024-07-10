// mocking helmet because of an error
jest.mock("react-helmet-async", () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => children,
  HelmetProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// mocking toast to fix the "2 set" issue due to the toast message
jest.mock("@/stuff/CustomToast", () => ({
  SuccessToast: jest.fn(() => null),
  ErrorToast: jest.fn(() => null),
}));

// mocking the window functionality for the matchMedia
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false, // You can customize this to match specific queries for your tests
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Hiit from "@/pages/timers/hiit";
// next 2 fix the toBeInTheDocument issue
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";

describe("HIIT Timer", () => {
  test("set button sets the proper value", async () => {
    const { getByText } = render(<Hiit />);
    // using a function to provide more flexible matcher
    const setButton = getByText(/set/i);
    // regex, i means case insensitive
    fireEvent.click(setButton);

    // text that only appears when the values are set
    // waitFor to handle conditional rendering
    await waitFor(() => {
      expect(getByText(/start/i)).toBeInTheDocument();
      expect(getByText(/edit/i)).toBeInTheDocument();
    });
  });
  test("start button starts the timer", async () => {
    const { getByText, findByText } = render(<Hiit />);

    const setButton = getByText(/set/i);
    fireEvent.click(setButton);

    // waiting for the start button to appear
    const startButton = await findByText(/start/i);
    fireEvent.click(startButton);

    // checking for the new buttons that appear after the timer starts
    // these are the buttons that appear after the timer starts
    await findByText(/stop/i);
    await findByText(/edit/i);
  });
  test("stop button stops the timer", async () => {
    const { getByText, findByText } = render(<Hiit />);

    const setButton = getByText(/set/i);
    fireEvent.click(setButton);

    const startButton = await findByText(/start/i);
    fireEvent.click(startButton);

    const stopButton = await findByText(/stop/i);
    fireEvent.click(stopButton);

    // checking for the new buttons that appear after the timer stops
    await findByText(/start/i);
    await findByText(/edit/i);
  });
  test("edit button allows to edit the timer", async () => {
    const { getByText, findByText } = render(<Hiit />);

    const setButton = getByText(/set/i);
    fireEvent.click(setButton);

    const startButton = await findByText(/start/i);
    fireEvent.click(startButton);

    const editButton = await findByText(/edit/i);
    fireEvent.click(editButton);

    // checking for the new buttons that appear after the timer stops
    await findByText(/set/i);
  });
  test("invalid minute value setting stays in the same screen", async () => {
    const { getByText, findByText } = render(<Hiit />);

    // get the inputs
    const roundsInput = getByText(/rounds/i)
      .nextElementSibling as HTMLInputElement;

    // set the input value to an invalid value
    fireEvent.change(roundsInput, { target: { value: "0" } });

    // set the value
    const setButton = getByText(/set/i);
    fireEvent.click(setButton);

    // check that it stays on the same page
    await findByText(/rounds/i);
    await findByText(/set/i);
  });
});
