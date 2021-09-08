import { render, screen, cleanup } from "@testing-library/react";
import { BookingCalendar } from "../booking/BookingCalendar";
test("should show react-calender", () => {
  render(<BookingCalendar />);
  const bookingCalendarElement = screen.getByTestId("calendar");
  expect(bookingCalendarElement).toBeInTheDocument();
});
