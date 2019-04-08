import React from "react";
import Paper from "../paper/Paper";

const BidPanelCard = ({ auth, caretakerId }) => {
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
  const hostPanel = () => {
    return <></>;
  };
  const renderUserPanel = () => {
    if (user.role === "petowner") return ownerPanel;
    else if (caretakerId === user.id) return hostPanel;
    else if (user.role === "caretaker") return caretakerPanel;
    else return visitorPanel;
  };

  return <Paper>{renderUserPanel()}</Paper>;
};

export default BidPanelCard;
