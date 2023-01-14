import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
// import { toast } from "react-toastify";

import SharingModal from "../components/SharingModal";
import { setCardIdToDownload } from "../redux/action";
import { setOpenModal } from "../redux/action";

import alternate from "../images/alternate.jpg";
import { BiArrowBack } from "react-icons/bi";
import { FaShareAlt, FaDownload, FaPrint } from "react-icons/fa";
import GroupDescription from "../components/GroupDescription";
import CardList from "../components/CardList";
import ToggleButton from "../components/ToggleButton";

const FlashCardDetails = () => {
  const flashcards = useSelector((state) => state.flashCard);
  const isModalOpen = useSelector((state) => state.setModal);
  const { flashcardID } = useParams(); // Destructuring the flashcard ID from the URL
  const navigate = useNavigate();
  const location = useLocation();

  // Filters the flashcards to get the flashcard with the matching ID
  let newData = flashcards.filter(
    (flashcard) => flashcard.groupId === flashcardID
  );

  // Mapping the card IDs of the selected flashcard
  let idArray = newData[0].cardList.map((card) => card.cardId);

  // Spliting the current URL by '/' to get the IDs into an array
  let completeUrlArray = location.pathname.split("/");

  // Getting the last element from the completeUrlArray (the current cardId)
  let LastUrl = completeUrlArray[completeUrlArray.length - 1];

  // Getting the second last element from the completeUrlArray (the current groupId)
  let SecondLastUrl = completeUrlArray[completeUrlArray.length - 2];

  // Getting the index of the current cardId by checking the index of LastUrl in idArray
  let cardIndex = idArray.indexOf(LastUrl);
  // console.log();

  // Function to navigate to the next card in the group
  const nextButton = () => {
    if (cardIndex >= idArray.length - 1) {
      // If the current card is the last card in the group, navigate to the first card
      navigate(`${idArray[0]}`);
    } else {
      // Navigate to the next card
      navigate(`${idArray[cardIndex + 1]}`);
    }
  };

  // Function to navigate to the previous card in the group
  const previousButton = () => {
    if (cardIndex <= 0) {
      // If the current card is the first card in the group, navigate to the last card
      navigate(`${idArray[idArray.length - 1]}`);
    } else {
      // Navigate to the previous card
      navigate(`${idArray[cardIndex - 1]}`);
    }
  };

  const dispatch = useDispatch();

  // Dispatching an action to set the current cardId as the Id of the card to be downloaded
  useEffect(() => {
    dispatch(setCardIdToDownload(LastUrl));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LastUrl]);

  // Filtering the flashcards to find the one with the matching groupId as the current card
  const groupToDownload = flashcards.filter(
    (flashcard) => flashcard.groupId === SecondLastUrl
  );

  let cardToDownload;
  if (Array.isArray(groupToDownload) && groupToDownload.length > 0) {
    // Find the card in the group with the matching cardId as the current card
    cardToDownload = groupToDownload[0].cardList.filter(
      (card) => card.cardId === LastUrl
    );
  }

  let downloadableCard;
  if (Array.isArray(cardToDownload) && cardToDownload.length > 0) {
    // Storing the current card in a variable to use it further
    downloadableCard = cardToDownload[0];
  }

  // Function to download the current card as a PDF
  const pdfDownload = () => {
    // Creating a new PDF document in portrait orientation, with size "a4"
    const pdf = new jsPDF("portrait", "pt", "a4");
    // If the current card has an image, add it to the PDF, else add a default image.
    downloadableCard.cardImage
      ? pdf.addImage(downloadableCard.cardImage, "PNG", 20, 20, 555, 300)
      : pdf.addImage(alternate, "PNG", 20, 20, 555, 350);
    // Setting the font size and add the card name to the PDF
    pdf.setFontSize(26);
    pdf.text(20, 400, downloadableCard.cardName);
    // Setting the font size and adding the card description to the PDF
    pdf.setFontSize(16);
    pdf.text(20, 430, downloadableCard.cardDescription, { maxWidth: 555 });
    // Saving the PDF with the card name as the file name
    pdf.save(`${downloadableCard.cardName}.pdf`);
    //Displaying a success message
    // toast.success("Flashcar Downloaded");
  };

  const printCard = useSelector((state) => state.printCard); // The printCard variable is from the redux store and represents the current element to be printed

  const printingCard = useReactToPrint({
    // The content prop specifies the element to be printed and is set to the current element stored in printCard
    content: () => printCard.current,
    // The documentTitle prop specifies the title of the printed document and is set to the cardName of the current card stored in downloadableCard
    documentTitle: downloadableCard ? downloadableCard.cardName : "default",
  });

  return (
    <>
      <div>
        <BiArrowBack
          size={20}
          className="mt-3 mb-2 hover:cursor-pointer hover:scale-125 hover:bg-red-600 rounded-sm hover:text-white ease-in-out duration-200"
          onClick={() => navigate("/my-flashcards")}
        />
        {/* Showing the group name and group description */}
        <GroupDescription newData={newData} />
        <div className="flex flex-col lg:flex-row justify-between my-8 gap-4 lg:gap-6 xl:gap-5">
          {/* Showing the list of all the cards present in the Flashcard */}
          <CardList newData={newData} />
          {/* Displaying the Card content */}
          <div className="w-full lg:w-[63%] xl:w-[70%]">
            <Outlet />
          </div>
          <div className="flex flex-row lg:flex-col w-[15%] lg:w-[20%] xl:w-[15%] gap-2 sm:gap-5 lg:gap-0">
            <button
              onClick={() => dispatch(setOpenModal())}
              className="bg-white mb-8 shadow-lg flex items-center justify-center gap-2 py-2 px-3 font-semibold text-red-600 text-lg rounded-md hover:text-white hover:bg-red-600 hover:shadow-none ease-in-out duration-300"
            >
              <FaShareAlt />
              <p className="hidden sm:flex lg:text-lg">Share</p>
            </button>
            <button
              onClick={pdfDownload}
              className="bg-white mb-8 shadow-lg flex items-center justify-center gap-2 py-2 px-3 font-semibold text-red-600 text-lg rounded-md hover:text-white hover:bg-red-600 hover:shadow-none ease-in-out duration-300"
            >
              <FaDownload />
              <p className="hidden sm:flex lg:text-lg">Download</p>
            </button>
            <button
              onClick={printingCard}
              className="bg-white mb-8 shadow-lg flex items-center justify-center gap-2 py-2 px-3 font-semibold text-red-600 text-lg rounded-md hover:text-white hover:bg-red-600 hover:shadow-none ease-in-out duration-300"
            >
              <FaPrint />
              <p className="hidden sm:flex lg:text-lg">Print</p>
            </button>
          </div>
        </div>
      </div>
      <ToggleButton
        cardIndex={cardIndex}
        newData={newData}
        previousButton={previousButton}
        nextButton={nextButton}
      />

      {isModalOpen ? <SharingModal /> : ""}
    </>
  );
};

export default FlashCardDetails;
