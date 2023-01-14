import React from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

const ToggleButton = ({ cardIndex, newData, previousButton, nextButton }) => {
  return (
    <div className="flex -mt-12 lg:-mt-5 gap-8 items-center justify-center">
      <button>
        <AiOutlineLeft
          size={24}
          data-testid="previous"
          className="my-4 hover:cursor-pointer hover:scale-125 hover:text-white hover:bg-red-600 rounded-md ease-in-out duration-200"
          onClick={() => {
            previousButton();
          }}
        />
      </button>
      <div data-testid="num" className="lg:text-2xl">
        {cardIndex + 1}/{newData[0].cardList.length}
      </div>
      <button>
        <AiOutlineRight
          size={24}
          data-testid="next"
          className="my-4 hover:cursor-pointer hover:scale-125 hover:text-white hover:bg-red-600 rounded-md ease-in-out duration-200"
          onClick={() => {
            nextButton();
          }}
        />
      </button>
    </div>
  );
};

export default ToggleButton;
