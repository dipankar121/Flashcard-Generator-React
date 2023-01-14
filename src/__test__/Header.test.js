import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Header";

test("should render header with FLASHCARD GENERATOR as text", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  // Finding the element with the role of 'link'
  const element = screen.getByRole("link");
  // Checking that the element contains the text 'FLASHCARD GENERATOR'
  expect(element).toHaveTextContent(/flashcard generator/i);
});
