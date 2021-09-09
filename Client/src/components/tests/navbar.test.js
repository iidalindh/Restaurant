import { render, screen } from "@testing-library/react";
import { Navbar } from "../navbar/Navbar";

const links = [
  { text: "Boka bord", location: "/booking" },
  { text: "Meny", location: "/menu" },
  { text: "Kontakta oss", location: "/contact" },
];

test("should show Navbar", () => {
  render(<Navbar />);
  let p = screen.getByText(/Kontakta oss/i);
  expect(p).toBeInTheDocument();
});

test.each(links)("Check if Nav Bar have %s link.", (link) => {
  render(<Navbar />);
  const linkDom = screen.getByText(link.text);
  expect(linkDom).toHaveAttribute("href", link.location);
});
