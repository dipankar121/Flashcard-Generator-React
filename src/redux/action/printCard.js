import { CARD_ID_TO_PRINT } from "../constant/actionTypes";

//Action creator to set the card ID to be printed
export const setCardRefToPrint = (cardRef) => {
  return {
    type: CARD_ID_TO_PRINT,
    payload: cardRef,
  };
};
