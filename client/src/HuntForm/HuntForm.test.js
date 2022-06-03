import React from "react";
import HuntForm from "./HuntForm";

import { render, screen, fireEvent } from "@testing-library/react";

test("Geolocation button calls geolocation api.", () => {
  const mockLat = 51.7
  const mockLon = 45.3

  const mockGeolocation = {
    getCurrentPosition: jest.fn()
      .mockImplementationOnce((success) => Promise.resolve(success({
        coords: {
          latitude: mockLat,
          longitude: mockLon
        }
      })))
  };
  global.navigator.geolocation = mockGeolocation;  

  render(<HuntForm />)

  const button = screen.getByTitle("locate")

  // Trigger geolocation
  fireEvent.click(button);

  const locationInput = screen.getByPlaceholderText("Lat Lng")
  expect(locationInput.value).toBe(`${mockLat} ${mockLon}`)
});