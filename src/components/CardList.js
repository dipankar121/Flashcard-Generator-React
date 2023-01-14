import React from "react";
import { NavLink } from "react-router-dom";

const CardList = ({ newData }) => {
  return (
    <div className="bg-white flex items-center flex-row lg:flex-col shadow-lg lg-w[17%] xl:w-[15%] lg:h-[330px] text-center overflow-x-scroll lg:overflow-y-scroll scrollbar-thumb-red-200 scrollbar-thin scrollbar-thumb-rounded scrollbar-corner-rounded hover:scrollbar-thumb-red-500 pb-2 ease-in-out duration-300">
      <p className="px-3 pt-2 pb-1 sticky left-0 lg:top-0 lg:w-full bg-white font-semibold text-lg">
        Flashcards:
      </p>
      {/* Mapping through the list of cards and displaying them */}
      {newData[0].cardList.map((card, index) => (
        <div key={index}>
          <NavLink to={`${card.cardId}`}>
            {/* Trimming the card name to a specific length if its long */}
            <p className="w-[95px] px-4 lg:pt-1 lg:pb-2 text-center text-md hover:font-semibold ease-in-out duration-200">
              {card.cardName.length > 7
                ? card.cardName.slice(0, 4) + "..."
                : card.cardName}
            </p>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default CardList;
