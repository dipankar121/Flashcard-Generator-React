import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CardList from "../components/CardList";

const testData = [
  {
    cardList: [
      {
        cardId: "123",
        cardName: "Card 1",
      },
      {
        cardId: "456",
        cardName: "Card 2",
      },
    ],
  },
];

describe(CardList, () => {
  it("should display a list of card names which are NavLink elements", () => {
    render(
      <MemoryRouter>
        <CardList newData={testData} />
      </MemoryRouter>
    );

    expect(screen.getByText(/cards:/i)).toBeInTheDocument();

    const navLink1 = screen.getByText("Card 1");
    expect(navLink1).toBeInTheDocument();

    const navLink2 = screen.getByText("Card 2");
    expect(navLink2).toBeInTheDocument();
  });
});
