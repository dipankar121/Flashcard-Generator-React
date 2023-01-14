import { OPEN_MODAL, CLOSE_MODAL } from "../constant/actionTypes";

// Action creator to open modal
export const setOpenModal = () => {
  return {
    type: OPEN_MODAL,
  };
};

// Action creator to close modal
export const setCloseModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};
