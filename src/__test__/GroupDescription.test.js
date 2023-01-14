import React from "react";
import { render, screen } from "@testing-library/react";
import GroupDescription from "../components/GroupDescription";

const testData = [
  {
    groupName: "Group 1",
    groupDescription: "This is a group description",
    groupImage: "http://example.com/group1.jpg",
  },
];

describe(GroupDescription, () => {
  it("should display the group name", () => {
    render(<GroupDescription newData={testData} />);
    const groupName = screen.getByText("Group 1");
    expect(groupName).toBeInTheDocument();
  });

  it("should display the group description", () => {
    render(<GroupDescription newData={testData} />);
    const groupDescription = screen.getByText("This is a group description");
    expect(groupDescription).toBeInTheDocument();
  });

  it("should display the group image if present", () => {
    render(<GroupDescription newData={testData} />);
    const groupImage = screen.getByTestId("group-image");
    expect(groupImage).toBeInTheDocument();
    expect(groupImage).toHaveAttribute("src", "http://example.com/group1.jpg");
  });

  it("should display the default image if no group image is present", () => {
    const noGroupImageData = [
      {
        groupName: "Group 2",
        groupDescription: "This is another group description",
      },
    ];
    render(<GroupDescription newData={noGroupImageData} />);
    const defaultImage = screen.getByTestId("default-image");
    expect(defaultImage).toBeInTheDocument();
  });
});
