import {
  GROUP_ID_TO_DOWNLOAD,
  CARD_ID_TO_DOWNLOAD,
} from "../constant/actionTypes";

const downloadCardReducer = (state = [], action) => {
  switch (action.type) {
    case GROUP_ID_TO_DOWNLOAD:
      // Action to set the groupId of the card to download
      return action.payload;
    case CARD_ID_TO_DOWNLOAD:
      // Action to set the cardId to download
      return action.payload;
    default:
      return state;
  }
};

export default downloadCardReducer;
