import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container">
      {/* <h1 className="mt-3 text-lg sm:text-xl lg:text-3xl font-semibold">
        Create Flashcard
      </h1> */}
      <div className="w-full mx-auto mt-2 sm:mt-4 flex text-lg sm:text-xl font-semibold navbar-link-color transition-all ease-in-out duration-300">
        <button className="mr-5 hover:text-red-500 ">
          <NavLink to={"/"} className="py-1 pr-2">
            Create New
          </NavLink>
        </button>
        <div className="hover:text-red-500">
          <NavLink to={"/my-flashcards"} className="py-1">
            My Flashcards
          </NavLink>
        </div>
      </div>
      <hr className="mt-[2px] sm:mt-[4px] h-[2px] bg-gray-400" />
    </div>
  );
};

export default Navbar;
