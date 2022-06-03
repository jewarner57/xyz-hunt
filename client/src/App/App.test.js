import React from "react";
import App from "./App";

import { render, screen } from "@testing-library/react";

test("Title is present", () => {
  render(<App />)
  screen.getByText("XYZ Hunt Generator")
});

test("Form labels are present", () => {
  render(<App />)
  screen.getByText("Location (Lat Lng)")
  screen.getByText("Radius (Miles)")
});