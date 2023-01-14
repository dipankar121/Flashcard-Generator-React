import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ToggleButton from "../components/ToggleButton";

// Mocking data for the toggle button component
const mockNewData = [
  {
    cardList: [{}, {}, {}, {}],
  },
];

describe("ToggleButton", () => {
  it("should render the correct number of cards and card index", () => {
    const { getByTestId } = render(
      <ToggleButton
        cardIndex={0}
        newData={mockNewData}
        previousButton={() => {}}
        nextButton={() => {}}
      />
    );
    expect(getByTestId("num").textContent).toBe("1/4");
  });

  it("should call the previousButton function when the previous button is clicked", () => {
    const mockPreviousButton = jest.fn();
    const { getByTestId } = render(
      <ToggleButton
        cardIndex={3}
        newData={mockNewData}
        previousButton={mockPreviousButton}
        nextButton={() => {}}
      />
    );
    fireEvent.click(getByTestId("previous"));
    expect(mockPreviousButton).toHaveBeenCalledTimes(1);
  });

  it("should call the nextButton function when the next button is clicked", () => {
    const mockNextButton = jest.fn();
    const { getByTestId } = render(
      <ToggleButton
        cardIndex={3}
        newData={mockNewData}
        previousButton={() => {}}
        nextButton={mockNextButton}
      />
    );
    fireEvent.click(getByTestId("next"));
    expect(mockNextButton).toHaveBeenCalledTimes(1);
  });
});
