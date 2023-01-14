import { ADD_FLASHCARD, REMOVE_FLASHCARD } from "../constant/actionTypes";

// Initial state is set to the value of the flashcards which are already stored in local storage, or an empty array if there are none stored.
const initialState = localStorage.getItem("flashcards")
  ? JSON.parse(localStorage.getItem("flashcards"))
  : [];

const flashCardReducer = (state = initialState, action) => {
  switch (action.type) {
    // Adding a new flashcard to the state array and updating local storage
    case ADD_FLASHCARD:
      localStorage.setItem(
        "flashcards",
        JSON.stringify([...state, action.payload])
      );
      return [...state, action.payload];

    // Removing a flashcard from the state array and updating local storage
    case REMOVE_FLASHCARD:
      let newData = state.filter(
        (flashcard) => flashcard.groupId !== action.payload
      );
      localStorage.setItem("flashcards", JSON.stringify(newData));
      return newData;

    default:
      return state;
  }
};

export default flashCardReducer;
