import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import { setCardRefToPrint } from "../redux/action";

import alternate from "../images/alternate.jpg";

const SingleCard = () => {
  // Get the flashcard data from the redux store
  const flashcards = useSelector((state) => state.flashCard);
  // Get the card ID from the URL params
  const cardID = useParams();
  // Get the current location object
  const location = useLocation();

  // Split the pathname of the current URL to get the group ID
  let completeUrlArray = location.pathname.split("/");
  // Get the second-to-last item in the array (which should be the group ID)
  let secondLastUrl = completeUrlArray[completeUrlArray.length - 2];

  // Find the flashcard group with the matching group ID
  let newData = flashcards.find(
    (flashcard) => flashcard.groupId === secondLastUrl
  );
  // Get the list of cards for the group
  let cardList = newData ? newData.cardList : [];

  // Find the index of the card with the matching card ID
  let requiredCardIndex = "";
  for (let i = 0; i < cardList.length; i++) {
    if (cardList[i].cardId === cardID.index) {
      requiredCardIndex = i;
    }
  }

  // Get the dispatch function to dispatch redux actions
  const dispatch = useDispatch();
  // Create a ref for the card element
  const cardToPrintRef = useRef();

  // Set the ref for the card element in the redux store when the component mounts
  useEffect(() => {
    dispatch(setCardRefToPrint(cardToPrintRef));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardToPrintRef]);

  return (
    <div
      ref={cardToPrintRef}
      className="bg-white shadow-lg p-4 flex flex-col sm:flex-row items-top justify-start sm:gap-10 lg:gap-4 xl:gap-4"
    >
      {cardList.length > 0 && cardList[requiredCardIndex] ? (
        cardList[requiredCardIndex].cardImage.length > 0 ? (
          <img
            src={cardList[requiredCardIndex].cardImage}
            alt="img"
            data-testid="card-image"
            className="w-full h-auto sm:w-[400px] sm:h-[300px] lg:w-[350px] xl:w-[50%] xl:h-[300px] object-cover"
          />
        ) : (
          <img
            src={alternate}
            alt="img"
            data-testid="card-image"
            className="w-full h-auto sm:w-[400px] sm:h-[300px] lg:w-[350px] xl:w-[50%] xl:h-[300px] object-cover"
          />
        )
      ) : null}
      <div className="xl:w-[50%]">
        {cardList.length > 0 && cardList[requiredCardIndex] ? (
          <>
            <h1
              data-testid="card-name"
              className="text-xl flex-wrap font-semibold mb-2 sm:mb-0 mt-2 sm:mt-0 lg:-mt-2"
            >
              {cardList[requiredCardIndex].cardName}
            </h1>
            <h1 className="lg:mt-2 flex-wrap">
              {cardList[requiredCardIndex].cardDescription}
            </h1>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SingleCard;
