import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { removeFlashCard } from "../redux/action/flashCard";

import { FaTrashAlt } from "react-icons/fa";
import alternate2 from "../images/alternate2.jpg";
import emptyBox from "../images/empty-box.png";

const MyFlashCards = () => {
  const navigate = useNavigate();
  const flashCards = useSelector((state) => state.flashCard);
  // state.flashCard holds the flashcard data
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(6);
  // visible state variable holds the number of flashcards that should be visible at a time

  const seeAllCards = () => {
    // It sets the value of visible to the total number of flashcards
    setVisible(flashCards.length);
  };

  const seeLessCards = () => {
    // It sets the value of visible to the initial value of 6
    setVisible(6);
  };

  return (
    <div>
      {flashCards.length >= 1 ? (
        <div className="mt-16 sm:mt-20">
          <div className="grid grid-cols-1 max-w-[350px] mx-auto sm:max-w-none sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-8 sm:relative">
            {/* Map through the flashCards array and display the flashcards */}
            {flashCards.slice(0, visible).map((flashcard, index) => (
              <div
                key={index}
                className="mt-3 mb-6 md:mt-1 md:mb-14 lg:mt-1 lg:mb-12 px-2 bg-white h-[225px] sm:h-[245px] md:h-[220px] lg:h-[230px] xl:h-[240px] relative flex flex-col items-center justify-center text-center border-2 rounded-lg shadow-lg hover:shadow-none ease-in-out duration-200"
              >
                {/* Display the group image if it exists, otherwise display an alternate image */}
                {flashcard.groupImage ? (
                  <img
                    src={flashcard.groupImage}
                    alt="img"
                    className="w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] lg:w-[110px] lg:h-[110px] object-cover rounded-full absolute -top-12 sm:-top-14 lg:-top-14 "
                  />
                ) : (
                  <img
                    src={alternate2}
                    alt="img"
                    className="w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] lg:w-[110px] lg:h-[110px] object-cover rounded-full absolute -top-12 sm:-top-14 lg:-top-14 "
                  />
                )}
                {/* Display the group name */}
                <div className="absolute top-11 sm:top-10 sm:pt-1 lg:pt-4 px-2 font-semibold text-center text-lg">
                  {flashcard.groupName}
                </div>

                {/* Display the group description, shortening it if it's too long */}
                <div className="absolute top-20 sm:top-[75px] lg:top-[85px] px-4 xl:px-6 xl:pt-3 flex items-center justify-center text-center text-md">
                  {flashcard.groupDescription.length > 70
                    ? flashcard.groupDescription.slice(0, 70) + "..."
                    : flashcard.groupDescription}
                </div>

                {/* Display number of cards, shortening it if it's too long */}
                <div className="absolute top-[130px] sm:top-[135px] md:top-[115px] lg:top-[130px] xl:top-[148px] mt-2 font-semibold">
                  No. of Cards: {flashcard.cardList.length}
                </div>

                {/* This link component navigates to the specified path upon click */}
                <button
                  onClick={() =>
                    navigate(
                      `/my-flashcards/${flashcard.groupId}/${flashcard.cardList[0].cardId}`
                    )
                  }
                  className="absolute top-[165px] sm:top-[170px] md:top-[150px] lg:top-[165px] xl:top-[180px] border-2 border-red-500/100 rounded-md py-1 mt-2 px-6 text-red-500 font-semibold hover:text-white hover:bg-red-500 ease-in-out duration-200"
                >
                  View Card
                </button>

                {/* This button will delete the specific flashcard when clicked upon */}
                <button className="absolute top-2 md:top-2 right-2 sm:top-2">
                  <FaTrashAlt
                    size={20}
                    data-testid="delete-icon"
                    className="text-[#fa0606] hover:cursor-pointer hover:scale-125 ease-in-out duration-150"
                    onClick={() => {
                      dispatch(removeFlashCard(flashcard.groupId));
                      toast.success("Flascard Removed Successfully");
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end items-end">
            {/* Only show the "See More" button if there are more than 6 flashcards */}
            {flashCards.length <= 6 ? (
              ""
            ) : (
              <button>
                {/* If the number of visible cards is equal to the total number of flashcards, show the "See Less" button */}
                {visible === flashCards.length ? (
                  <div
                    onClick={seeLessCards}
                    className=" border-2 border-red-500/100 rounded-md py-1 mt-2 mb-5 px-6 text-red-500 font-semibold hover:text-white hover:bg-red-500 ease-in-out duration-200"
                  >
                    See Less
                  </div>
                ) : (
                  <div
                    onClick={seeAllCards}
                    className="mb-5 mt-5 sm:mt-3 border-2 border-red-500/100 rounded-md py-1  px-6 text-red-500 font-semibold hover:text-white hover:bg-red-500 ease-in-out duration-200"
                  >
                    See More
                  </div>
                )}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center flex flex-col items-center justify-center">
          {/* If there is no card present, show "Nothing To Show..." with a image */}
          <img
            src={emptyBox}
            alt="emptyBox"
            className="w-[270px] sm:w-[300px] md:w-[350px] lg:w-[450px] mt-20"
          />
          <p className="font-bold text-2xl mt-8">Nothing To Show...</p>
          <button
            onClick={() => navigate("/")}
            className="absolute top-[550px] sm:top-[650px] lg:top-[750px] border-2 border-red-500/100 rounded-md py-1 mt-2 px-6 text-red-500 font-semibold hover:text-white hover:bg-red-500 ease-in-out duration-200"
          >
            Create Card
          </button>
        </div>
      )}
    </div>
  );
};

export default MyFlashCards;
