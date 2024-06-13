import Topbar from "components/Topbar";
import React from "react";

const ParentDashboard = () => {
  return (
    <>
      <Topbar heading={"Dashboard"} />
      <div className="container py-5">My Dashboard</div>
    </>
  );
};

export default ParentDashboard;