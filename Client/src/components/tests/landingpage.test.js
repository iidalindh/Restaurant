import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { LandingPage } from "../landingPage/LandingPage";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

test("should show Landingpage", () => {
  render(<LandingPage />);
  let heading = screen.getByText(/Södermalm/i);
  expect(heading).toBeInTheDocument();
});


describe("Go to bookinpage when button click", () => {
  it("Redirects to booking page, when Book Now button on landingpage is clicked", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
    const button = screen.getByTestId("book-now");

    fireEvent.click(button);
    expect(mockHistoryPush).toHaveBeenCalledWith("/booking");
  });
});
