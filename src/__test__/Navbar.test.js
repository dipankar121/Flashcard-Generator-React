import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Navbar from "../components/Navbar";

test("should render Navbar with Create New and My Flashcards links", () => {
  // Rendering the Navbar component within a MemoryRouter
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // Getting the Create New link element and checking that it is in the document
  const createNewLink = screen.getByRole("link", { name: /create new/i });
  expect(createNewLink).toBeInTheDocument();

  // Getting the My Flashcards link element and checking that it is in the document
  const myFlashcardsLink = screen.getByRole("link", { name: /my flashcards/i });
  expect(myFlashcardsLink).toBeInTheDocument();
});
