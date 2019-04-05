import React from "react";
import Paper from "../paper/Paper";

const BidPanelCard = ({ auth }) => {
  const { user } = auth;
  const visitorPanel = () => {
    return <></>;
  };
  const caretakerPanel = () => {
    return <></>;
  };
  const ownerPanel = () => {
    return <></>;
  };
  const renderUserPanel = () => {
    if (user.role === "petowner") return ownerPanel;
    else if (user.role === "caretaker") return caretakerPanel;
    else return visitorPanel;
  };

  return <Paper>{renderUserPanel()}</Paper>;
};

export default BidPanelCard;
