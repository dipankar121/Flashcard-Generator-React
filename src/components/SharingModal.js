import React from "react";
import { MdContentCopy, MdOutlineClose } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  BsWhatsapp,
  BsFacebook,
  BsLinkedin,
  BsTwitter,
  BsGithub,
} from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setCloseModal } from "../redux/action";
import { useLocation } from "react-router-dom";

const SharingModal = () => {
  const dispatch = useDispatch();
  const currentUrl = useLocation().pathname;
  // console.log(currentUrl);
  const urlTocopy = `https://flashcard-generator-react.vercel.app/${currentUrl}`;

  return (
    <div data-testid="sharing-modal">
      <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center ease-in-out duration-700">
        <div className="bg-[#f8f1e7] w-[90%] sm:w-auto pl-5 py-4 pr-4 sm:py-6 sm:px-10 rounded-md">
          <div className="flex justify-between items-centerl">
            <h1 className="text-xl sm:text-2xl font-semibold">Share:</h1>
            <MdOutlineClose
              onClick={() => dispatch(setCloseModal())}
              size={30}
              className="rounded-md hover:cursor-pointer hover:text-white hover:bg-red-500 hover:scale-125 ease-in-out duration-150"
            />
          </div>
          <div className="flex justify-center items-center gap-2 sm:gap-4 mt-4 sm:mt-4">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <p className="text-xl font-semibold hidden sm:flex">Link:</p>
              <p className="sm:text-lg border-2 border-neutral-700 rounded-md px-2 sm:px-4 sm:py-1">
                {urlTocopy.length > 30 ? (
                  <p>{urlTocopy.slice(0, 30) + "..."}</p>
                ) : (
                  <p>{urlTocopy}</p>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <MdContentCopy
                onClick={() => {
                  toast.success("Copied To Clipboard");
                  return navigator.clipboard.writeText(
                    `https://dipankarflashcard.netlify.app${currentUrl}`
                  );
                }}
                size={30}
                className="hover:cursor-pointer hover:text-red-500 hover:scale-110 ease-in-out duration-150"
              />
              <FaShareAlt
                size={30}
                className="hover:cursor-pointer hover:text-red-500 hover:scale-110 ease-in-out duration-150"
              />
            </div>
          </div>
          <div className="mt-6 sm:mt-8 flex justify-evenly">
            <BsWhatsapp
              size={30}
              className="hover:cursor-pointer hover:text-red-500 hover:scale-110 ease-in-out duration-150"
            />
            <BsFacebook
              size={30}
              className="hover:cursor-pointer hover:text-red-500 hover:scale-110 ease-in-out duration-150"
            />
            <BsLinkedin
              size={30}
              className="hover:cursor-pointer hover:text-red-500 hover:scale-110 ease-in-out duration-150"
            />
            <BsTwitter
              size={30}
              className="hover:cursor-pointer hover:text-red-500 hover:scale-110 ease-in-out duration-150"
            />
            <BsGithub
              size={30}
              className="hover:cursor-pointer hover:text-red-500 hover:scale-110 ease-in-out duration-150"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharingModal;
