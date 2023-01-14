import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <h1 className=" h-10 flex items-center justify-start pl-4 md:pl-9 py-2 sm:py-7 text-xl sm:text-[26px] shadow-lg bg-white">
        <Link to={"/"}>
          <strong>
            FLASHCARD <span className="text-[#fa0606]">GENERATOR</span>
          </strong>
        </Link>
      </h1>
    </div>
  );
};

export default Header;
