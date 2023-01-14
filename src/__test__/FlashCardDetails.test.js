import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import FlashCardDetails from "../pages/FlashCardDetails";
import rootReducers from "../redux/reducer/index";

describe(FlashCardDetails, () => {
  const renderWithRedux = (
    component,
    { initialState, store = createStore(rootReducers, initialState) } = []
  ) => {
    return {
      ...render(
        <BrowserRouter>
          <Provider store={store}>{component}</Provider>
        </BrowserRouter>
      ),
      store,
    };
  };
  beforeEach(() => {
    renderWithRedux(<FlashCardDetails />, {
      initialState: {
        flashCard: [
          {
            groupName: "Test Group 1",
            groupDescription: "This is a test group for testing purposes",
            groupImage: "",
            cardList: [
              {
                cardId: "1",
                cardName: "Test Card 1",
                cardDescription: "This is a test card for testing purposes",
                cardImage: "",
              },
            ],
          },
        ],
      },
    });
  });
  it("should display the group name and group description", async () => {
    expect(screen.getByText(/Test Group 1/i)).toBeInTheDocument();
    expect(
      screen.getByText(/This is a test group for testing purposes/i)
    ).toBeInTheDocument();
  });

  it("should display the 3 buttons", () => {
    expect(screen.getByRole("button", { name: /share/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /download/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /print/i })).toBeInTheDocument();
  });
});
