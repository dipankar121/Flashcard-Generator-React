import React from "react";
import alternate2 from "../images/alternate2.jpg";

const GroupDescription = ({ newData }) => {
  return (
    <div className="flex flex-col sm:flex-row bg-white shadow-lg p-4 gap-5">
      {/* Displaying group image if there is any group image provided or else showing an alternate image */}
      {newData[0].groupImage ? (
        <img
          src={newData[0].groupImage}
          alt="groupPhoto"
          data-testid="group-image"
          className="h-auto sm:w-[300px] sm:h-[220px] xl:w-[27%] object-contain"
        />
      ) : (
        <img
          src={alternate2}
          alt="defaultPhoto"
          data-testid="default-image"
          className="h-auto sm:w-[300px] sm:h-[220px] xl:w-[27%] object-cover"
        />
      )}

      <div className="-mt-3 sm:mt-0 xl:w-[70%]">
        {/* Displaying the group name */}
        <p className="text-xl flex-wrap sm:text-xl font-semibold mb-2  lg:-mt-2">
          {newData[0].groupName}
        </p>
        {/* Displaying the group description */}
        <p className="text-md flex-wrap">{newData[0].groupDescription}</p>
      </div>
    </div>
  );
};

export default GroupDescription;
