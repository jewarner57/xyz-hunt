import React from "react";
import List from "./List";

import { render, screen } from "@testing-library/react";

const placeList = [
  { letter: "a", name: "A place", lat: "40", lon: "50", address: "An address" },
  { letter: "b", name: "Breakfast Place", lat: "20", lon: "30", address: "Another address" },
]

test("List displays location names", () => {
  render(<List placeList={placeList} />)

  expect(screen.getAllByText(placeList[0].name)).toBeTruthy()
  expect(screen.getAllByText(placeList[1].name)).toBeTruthy()

  expect(screen.getAllByText("A:")).toBeTruthy()
  expect(screen.getAllByText("B:")).toBeTruthy()
});


test("List displays correct links", () => {
  render(<List placeList={placeList} />)

  expect(screen.getByText(placeList[0].address).href).toBe(`https://maps.google.com/?ll=${placeList[0].lat},${placeList[0].lng}`)
  expect(screen.getByText(placeList[1].address).href).toBe(`https://maps.google.com/?ll=${placeList[1].lat},${placeList[1].lng}`)
});