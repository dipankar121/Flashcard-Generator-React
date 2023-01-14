import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import store from "../store/store";
import CreateFlashCard from "../pages/CreateFlashCard";
import user from "@testing-library/user-event";
import { toast } from "react-toastify";

jest.mock("react-toastify");

describe("CreateFlashCard", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <CreateFlashCard />
      </Provider>
    );
  });

  it("should reset the form after the previous form is submitted", async () => {
    const groupName = screen.getByPlaceholderText(/group name\.\.\./i);
    user.type(groupName, "Group Name");

    const groupDescription = screen.getByPlaceholderText(
      /enter description here\.\.\./i
    );
    user.type(groupDescription, "This is a test description");

    const cardName = screen.getByPlaceholderText(/enter term\.\.\./i);
    user.type(cardName, "Card Name");

    const cardDescription = screen.getByPlaceholderText(
      /enter definition here\.\.\./i
    );
    user.type(cardDescription, "This is a card description");

    const createButton = screen.getByRole("button", {
      name: /create/i,
    });
    user.click(createButton);
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Flascard Added Successfully");
      expect(groupName).toHaveTextContent("");
      expect(groupDescription).toHaveTextContent("");
      expect(cardName).toHaveTextContent("");
      expect(cardDescription).toHaveTextContent("");
    });
  });

  it("should add one card inputs when add more button is clicked", async () => {
    const addButton = screen.getByRole("button", {
      name: /add more/i,
    });
    user.click(addButton);
    await waitFor(() => {
      expect(screen.getAllByPlaceholderText(/enter term\.\.\./i)).toHaveLength(
        2
      );
      expect(
        screen.getAllByPlaceholderText(/enter definition here\.\.\./i)
      ).toHaveLength(2);
    });
  });

  it("should display required when the input fields are empty", async () => {
    const groupName = screen.getByPlaceholderText(/group name\.\.\./i);
    user.type(groupName, "");

    const groupDescription = screen.getByPlaceholderText(
      /enter description here\.\.\./i
    );
    user.type(groupDescription, "");

    const cardName = screen.getByPlaceholderText(/enter term\.\.\./i);
    user.type(cardName, "");

    const cardDescription = screen.getByPlaceholderText(
      /enter definition here\.\.\./i
    );
    user.type(cardDescription, "");

    const createButton = screen.getByRole("button", {
      name: /create/i,
    });
    user.click(createButton);
    await waitFor(() => {
      expect(screen.getAllByText(/required/i)).toHaveLength(4);
    });
  });

  it("should show the message to add card when no card is present", async () => {
    const deleteButton = screen.getByTestId("delete");
    user.click(deleteButton);
    await waitFor(() => {
      expect(
        screen.getByText(/empty, please add atleast one card\.\.\./i)
      ).toBeInTheDocument();
    });
  });
});
