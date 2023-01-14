import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import CreateFlashCard from "./pages/CreateFlashCard";
import MyFlashCards from "./pages/MyFlashCards";
import FlashCardDetails from "./pages/FlashCardDetails";
import SingleCard from "./components/SingleCard";

function App() {
  return (
    <>
      <div className="bg-[#f8f1e7] w-full min-h-screen scroll-smooth transition-all ease-in-out duration-200">
        <Header />
        <div className="container w-[90%] xl:w-[68%] mx-auto py-2">
          <Navbar />
          <Routes>
            <Route path="/" element={<CreateFlashCard />} exact />
            <Route path="/my-flashcards" element={<MyFlashCards />} exact />
            {/* FlashCardDetails component will be displayed when the path matches '/my-flashcards/:flashcardID' where ':flashcardID' keeps changing with every flashcard. */}
            <Route
              path={`/my-flashcards/:flashcardID`}
              element={<FlashCardDetails />}
            >
              {/* SingleCard component will be displayed when the path matches '/my-flashcards/:flashcardID/:index' where ':index' keeps changing with every single card. */}
              <Route path={":index"} element={<SingleCard />}></Route>
            </Route>
          </Routes>
        </div>
      </div>
      {/* ToastContainer for displaying toast notifications*/}
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />
    </>
  );
}

export default App;
