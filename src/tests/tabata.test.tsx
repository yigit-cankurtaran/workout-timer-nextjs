jest.mock("react-helmet-async", () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => children,
  HelmetProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// mocking toast to fix 2 set errors
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
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  findByText,
  findAllByTitle,
} from "@testing-library/react";
import Tabata from "@/pages/timers/tabata";
// import error on this for some reason smh
// TODO: check and fix this
// next 2 fix the toBeInTheDocument issue
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";

describe("Tabata Timer", () => {
  test("set button sets the proper value", async () => {
    const { getByText } = render(<Tabata />);
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
    const { getByText, findByText } = render(<Tabata />);

    const setButton = getByText(/set/i);
    fireEvent.click(setButton);

    // waiting for the start button to appear
    const startButton = await findByText(/start/i);
    fireEvent.click(startButton);

    // checking for the new buttons that appear after the timer starts
    await findByText(/stop/i);
    await findByText(/edit/i);
  });
});
