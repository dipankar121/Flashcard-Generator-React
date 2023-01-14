import { ADD_FLASHCARD, REMOVE_FLASHCARD } from "../constant/actionTypes";

// Action creator for adding a new flashcard
export const addNewFlashCard = (flashcard) => {
  return {
    type: ADD_FLASHCARD,
    payload: flashcard,
  };
};

// Action creator for removing a flashcard
export const removeFlashCard = (flashcardID) => {
  return {
    type: REMOVE_FLASHCARD,
    payload: flashcardID,
  };
};
