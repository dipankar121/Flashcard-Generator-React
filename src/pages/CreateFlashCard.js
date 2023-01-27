import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { addNewFlashCard } from "../redux/action/flashCard";

import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { FaEdit, FaTrashAlt, FaUpload } from "react-icons/fa";
import emptyListIcon from "../images/out-of-stock.png";

const CreateFlashCard = () => {
  const groupImageRef = useRef(); //this ref is given so that on clicking the upload image button, the input field with this group ref gets trigerred.

  const termRefs = useRef([]); //This ref is used to store the reference of all the terms field of cards we add intop an array, which can be used later to focus on. Source: YouTube => How to create an array of React refs by (Ihatetomatoes)
  termRefs.current = [];

  const dispatch = useDispatch();
  const reader = new FileReader(); //Creating a new instance of FileReader to read the Images which will be uploaded.

  const addTotermRef = (el) => {
    // Pushing reference of term field into a array on adding new card. Source: YouTube => How to create an array of React refs (by Ihatetomatoes)
    if (el && !termRefs.current.includes(el)) {
      termRefs.current.push(el);
    }
  };

  return (
    <Formik
      // This sets the Initial Values of form input for the Formik, which will change according to the user Input
      initialValues={{
        groupId: "",
        groupName: "",
        groupDescription: "",
        groupImage: "",
        cardList: [
          {
            cardId: uuidv4(),
            cardName: "",
            cardDescription: "",
            cardImage: "",
          },
        ],
      }}
      // Validation of the Formik form. Source: Formik Documentation
      validationSchema={Yup.object().shape({
        groupId: Yup.string(),
        groupName: Yup.string()
          .max(20, "Maximum length exceeds(20 characters)")
          .min(3, "Too Short")
          .required("Required"),
        groupDescription: Yup.string()
          .max(200, "Maximum length exceeds(200 characters)")
          .min(5, "Too Short")
          .required("Required"),

        cardList: Yup.array().of(
          Yup.object().shape({
            cardId: Yup.string(),
            cardName: Yup.string()
              .max(20, "Maximum length exceeds(20 characters)")
              .min(3, "Too Short")
              .required("Required"),
            cardDescription: Yup.string()
              .max(200, "Maximum length exceeds(200 characters)")
              .min(5, "Too Short")
              .required("Required"),
          })
        ),
      })}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        //Source: StackOverflow => Formik: Why setTimeOut in onSubmit?
        //Without setTimeout() its is showing some misbehaviour
        setTimeout(() => {
          if (values.cardList.length === 0) {
            // alert("cant");
            toast.warn("Please Add Atleast 1 Card"); // Making sure that a user enters atleast one card
            setSubmitting(false);
          } else {
            values.groupId = uuidv4(); //Adding GroupId at the time of submit just to make sure that everytime it generates a new id
            dispatch(addNewFlashCard(values));
            toast.success("Flascard Added Successfully");
            resetForm();
            setSubmitting(false);
          }
        }, 200);
      }}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form>
          {/* FLASHCARD GROUP SECTION */}
          <div className="bg-white shadow-md mt-5 px-4 sm:px-5 py-2 sm:py-3">
            <div className="sm:relative sm:flex sm:space-x-2">
              <div className="flex flex-col sm:w-[52%] lg:w-[38%]">
                <label
                  htmlFor="groupName"
                  className="text-lg font-semibold mt-2 mb-1 sm:mt-3 sm:mb-1"
                >
                  Create Group*
                </label>
                <Field
                  name="groupName"
                  placeholder="Group Name..."
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 transition-all ease-in-out duration-700"
                />
                <ErrorMessage
                  component={"p"}
                  className="text-sm text-red-500"
                  name="groupName"
                />
              </div>
              {values.groupImage ? (
                <div className="relative mt-2 sm:mt-0">
                  <img
                    src={values.groupImage}
                    alt="groupImage"
                    className="w-full sm:w-40 rounded-lg"
                  />
                  <button onClick={() => setFieldValue("groupImage", "")}>
                    <AiOutlineClose
                      size={20}
                      className="absolute bg-[#fa0606] text-white rounded-md top-1 right-1 sm:-right-2 sm:-top-2"
                    />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => groupImageRef.current.click()}
                  className="sm:absolute sm:left-[52%] lg:left-[38%] flex justify-center items-center mt-2 sm:mt-[44px] px-4 py-2 sm:py-2 bg-gray-50 border  border-gray-300 text-blue-700 font-semibold rounded-lg space-x-2 hover:bg-blue-700 hover:text-white ease-in-out duration-200"
                >
                  <FaUpload />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    ref={groupImageRef}
                    onChange={(event) => {
                      // Making sure that the user giving a valid image
                      const image = event.target.files[0];
                      if (!image.name.match(/\.(jpg|jpeg|png|gif|jfif)$/)) {
                        toast.warn("Please Add Valid Image"); // Making sure that a user enters valid image
                      } else {
                        reader.readAsDataURL(image);

                        reader.onload = () => {
                          F;
                          // Code for uploading Image
                          setFieldValue("groupImage", reader.result);
                        };
                      }
                    }}
                    hidden
                  />
                </button>
              )}
            </div>
            <div className="my-3 sm:mt-4">
              <label
                htmlFor="groupDescription"
                className="text-lg font-semibold mb-1 sm:mt-3 sm:mb-1 flex flex-col"
              >
                Description*
              </label>
              <Field
                name="groupDescription"
                placeholder="Enter Description Here..."
                as="textarea"
                rows={4}
                className=" w-full sm:w-[90%] lg:w-[65%] bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500  text-gray-900 text-md rounded-lg p-2 resize-none transition-all ease-in-out duration-700"
              />
              <ErrorMessage
                component={"p"}
                className="text-sm text-red-500 -mt-1"
                name="groupDescription"
              />
            </div>
          </div>

          {/* FLASHCARD INDIVIDUAL CARD SECTION */}

          <div className="bg-white shadow-md mt-5 px-4 sm:px-5 py-4 sm:py-5">
            <FieldArray name="cardList">
              {(arrayHelper) => {
                return (
                  <>
                    {values.cardList && values.cardList.length > 0 ? (
                      values.cardList.map((card, index) => (
                        <div
                          className="flex flex-col sm:flex-row lg:items-start sm:gap-2 lg:gap-5 relative lg:relative  py-2 mb-5"
                          key={index}
                        >
                          <div className=" lg:pt-2">
                            <span className="bg-[#fa0606] flex items-center justify-center text-white text-xl font-bold p-3 sm:h-9 sm:w-9 h-8 w-8 sm:rounded-md rounded-md">
                              {index + 1}
                            </span>
                          </div>
                          <div className="w-full lg:w-[90%] sm:grid sm:grid-cols-12 sm:gap-2">
                            <div className="sm:col-span-5 lg:col-span-4 mt-2 sm:mt-0">
                              <div>
                                <label
                                  htmlFor={`cardList.${index}.cardName`}
                                  className="text-lg font-semibold"
                                >
                                  Enter Term*
                                </label>
                                <Field name={`cardList.${index}.cardName`}>
                                  {({ field }) => (
                                    <input
                                      placeholder="Enter Term..."
                                      type="text"
                                      {...field} //The field object contains props that should be applied to the input element, such as value and onChange.
                                      ref={addTotermRef}
                                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 resize-none mt-1 sm:mb-0 sm:mt-0 transition-all ease-in-out duration-700"
                                    />
                                  )}
                                </Field>
                                <ErrorMessage
                                  component={"p"}
                                  className="text-sm text-red-500 transition-all ease-in-out duration-300"
                                  name={`cardList.${index}.cardName`}
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-7 lg:col-span-5 mt-2 sm:mt-0">
                              <div>
                                <label
                                  htmlFor={`cardList.${index}.cardDescription`}
                                  className="text-lg font-semibold my-3"
                                >
                                  Definition*
                                </label>
                                <Field
                                  name={`cardList.${index}.cardDescription`}
                                  placeholder="Enter Definition Here..."
                                  as="textarea"
                                  rows={1}
                                  type="text"
                                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 resize-none mt-1 sm:mb-0 sm:mt-0 focus:h-32"
                                  style={{
                                    height: "42px",
                                    transition: "height 0.3s ease-in-out",
                                    focus: "ring-blue-500 border-blue-500",
                                  }}
                                  onFocus={(e) =>
                                    (e.target.style.height = "128px")
                                  }
                                  onBlur={(e) =>
                                    (e.target.style.height = "42px")
                                  }
                                />
                                <ErrorMessage
                                  component={"p"}
                                  className="text-sm text-red-500"
                                  name={`cardList.${index}.cardDescription`}
                                />
                              </div>
                            </div>
                            {values.cardList[index].cardImage ? (
                              <div className="sm:col-span-4 lg:col-span-3 w-full mt-2 sm:mt-0 sm:relative lg:relative">
                                <div className="relative">
                                  <img
                                    src={card.cardImage}
                                    alt="groupImg"
                                    className="sm::h-22 w-full lg:w-8/12 xl:w-8/12 2xl:w-6/12 rounded-lg"
                                  />
                                  <button
                                    className="absolute -top-0 -left-0"
                                    onClick={() =>
                                      setFieldValue(
                                        `cardList.${index}.cardImage`,
                                        ""
                                      )
                                    }
                                  >
                                    <AiOutlineClose
                                      size={20}
                                      className="bg-[#fa0606] text-white rounded-md"
                                    />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="sm:col-span-4 lg:col-span-3 w-full mt-3 sm:mt-0">
                                <button
                                  type="button"
                                  className="flex justify-center items-center lg:mt-[28px]  bg-gray-50 border  border-gray-300 text-blue-700 font-semibold rounded-lg hover:bg-blue-700 hover:text-white ease-in-out duration-200"
                                >
                                  <label
                                    htmlFor={`cardList.${index}.cardImage`}
                                    className="hover:cursor-pointer px-5 py-2"
                                  >
                                    <span className="flex items-center justify-center gap-2">
                                      <FaUpload />
                                      Select Image
                                    </span>
                                  </label>
                                  <input
                                    type="file"
                                    id={`cardList.${index}.cardImage`}
                                    name={`cardList.${index}.cardImage`}
                                    hidden
                                    onChange={(event) => {
                                      // Making sure that the user giving a valid image
                                      const cardImg = event.target.files[0];
                                      if (
                                        !cardImg.name.match(
                                          /\.(jpg|jpeg|png|gif|jfif|tif|tiff)$/
                                        )
                                      ) {
                                        toast.warn("Please Add A Valid Image"); // Making sure that a user enters valid image
                                      } else {
                                        reader.readAsDataURL(cardImg);

                                        reader.onload = () => {
                                          setFieldValue(
                                            `cardList.${index}.cardImage`,
                                            reader.result
                                          );
                                        };
                                      }
                                    }}
                                  />
                                </button>
                              </div>
                            )}
                          </div>
                          <div className="flex lg:flex-col mt-3 sm:mt-0 absolute top-0 right-0 gap-5 sm:gap-5 lg:gap-0 lg:absolute lg:right-3 lg:top-5">
                            <span className="flex items-center justify-center text-sm  rounded-md lg:mb-5">
                              {/* For deleting a specific Card */}
                              <FaTrashAlt
                                data-testid="delete"
                                size={20}
                                className="text-[#fa0606] hover:cursor-pointer hover:scale-125 ease-in-out duration-150"
                                onClick={() => arrayHelper.remove(index)}
                              />
                            </span>
                            <span className="flex items-center justify-center text-sm  rounded-md">
                              {/* For Focusing on a specific input field */}
                              <FaEdit
                                id={index}
                                onClick={() => {
                                  termRefs.current[index].focus();
                                }}
                                size={20}
                                className="text-blue-700 hover:cursor-pointer hover:scale-125 ease-in-out duration-150"
                              />
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      // Making sure that the user enters atleast 1 card
                      <div className="text-xl font-semibold flex items-center justify-center gap-5">
                        <img src={emptyListIcon} alt="" className="h-[50px]" />
                        <p>Empty, Please add atleast one card...</p>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        //  This button will add a new group of inputs to the Form
                        arrayHelper.push({
                          cardId: uuidv4(),
                          cardName: "",
                          cardDescription: "",
                          cardImage: "",
                        })
                      }
                      className="flex justify-center items-center lg:mt-[28px] bg-gray-50
                      border border-gray-300 text-blue-700 font-semibold
                      rounded-lg py-2 px-4 hover:bg-blue-700 hover:text-white
                      ease-in-out duration-200"
                    >
                      {/* ADD MORE SECTION BUTTON */}
                      <AiOutlinePlus size={20} />
                      <span>Add More</span>
                    </button>
                  </>
                );
              }}
            </FieldArray>
          </div>
          <div className="flex justify-center w-full">
            {/* SUBMIT BUTTON */}
            <button
              disabled={isSubmitting}
              type="submit"
              className={`py-1.5 px-8 my-8 font-medium text-lg bg-[#fa0606]  text-white shadow-md hover:scale-110 ease-in-out duration-150 cursor-pointer rounded-md `}
            >
              Create
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateFlashCard;
