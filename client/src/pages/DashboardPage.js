import React from "react";
import { connect } from "react-redux";
import OwnerDashboardContainer from "../containers/OwnerDashboardContainer";
import CaretakerDashboardContainer from "../containers/CaretakerDashboardContainer";

// to add home page
const DashboardPage = ({ auth }) => {
  const { user } = auth;
  if (user.role === "petowner") return <OwnerDashboardContainer />;
  else return <CaretakerDashboardContainer />;
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(DashboardPage);
