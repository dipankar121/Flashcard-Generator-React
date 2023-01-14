import flashCardReducer from "./flashCard";
import downloadCardReducer from "./downloadCard";
import printCardReducer from "./printCard";
import setModalReducer from "./setModal";
import { combineReducers } from "redux";

// Combining all of the reducers into a single reducer function
const rootReducer = combineReducers({
  flashCard: flashCardReducer,
  downloadCard: downloadCardReducer,
  printCard: printCardReducer,
  setModal: setModalReducer,
});

export default rootReducer;
