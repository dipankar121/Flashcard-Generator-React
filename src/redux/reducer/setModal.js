import { OPEN_MODAL, CLOSE_MODAL } from "../constant/actionTypes";

const setModalReducer = (state = false, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return true; //setting modal state to open
    case CLOSE_MODAL:
      return false; //setting modal state to close
    default:
      return state;
  }
};

export default setModalReducer;
