import {
  GROUP_ID_TO_DOWNLOAD,
  CARD_ID_TO_DOWNLOAD,
} from "../constant/actionTypes";

// Action creator for setting the groupId of the card to be downloaded
export const setGroupIdToDownload = (groupId) => {
  return {
    type: GROUP_ID_TO_DOWNLOAD,
    payload: groupId,
  };
};

// Action creator for setting the cardId to be downloaded
export const setCardIdToDownload = (cardId) => {
  return {
    type: CARD_ID_TO_DOWNLOAD,
    payload: cardId,
  };
};
