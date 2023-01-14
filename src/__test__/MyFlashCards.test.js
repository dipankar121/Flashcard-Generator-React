import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import rootReducer from "../redux/reducer/index";
import { toast } from "react-toastify";
import MyFlashCards from "../pages/MyFlashCards";

// Mocking the toast function
jest.mock("react-toastify");

afterEach(cleanup);

// Helper function for rendering a component with a mock Redux store
const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = []
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
describe(MyFlashCards, () => {
  it("should show default message, if there is no flashcard available", () => {
    // Rendering MyFlashCards component with empty Redux store
    renderWithRedux(<MyFlashCards />);

    // Checking that the default message, image, and Create Card button are present
    expect(screen.getByText(/nothing to show\.\.\./i)).toBeInTheDocument();
    expect(screen.getByAltText(/emptybox/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create card/i })
    ).toBeInTheDocument();
  });

  it("should show the flashcards if they are present", () => {
    // Rendering MyFlashCards component with flashcards present in the Redux store
    renderWithRedux(<MyFlashCards />, {
      initialState: {
        flashCard: [
          {
            groupName: "Test Group 1",
            groupDescription: "This is a test group for testing purposes",
            groupImage: "",
            cardList: [],
          },
        ],
      },
    });
    expect(screen.getByRole("img", { name: /img/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /view card/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Test Group 1")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test group for testing purposes")
    ).toBeInTheDocument();
    expect(screen.getByTestId("delete-icon")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("delete-icon"));
    expect(toast.success).toHaveBeenCalledWith("Flascard Removed Successfully");
  });
});
