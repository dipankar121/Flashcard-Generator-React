import { CARD_ID_TO_PRINT } from "../constant/actionTypes";

// This reducer stores the ref of the card that needs to be printed
const printCardReducer = (state = [], action) => {
  switch (action.type) {
    case CARD_ID_TO_PRINT:
      return action.payload;
    default:
      return state;
  }
};

export default printCardReducer;
