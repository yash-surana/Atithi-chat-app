import React from "react";

const DashboardHeader = ({ title }) => {
  return (
    <nav className="bg-[#DF9D63] p-4">
      <h3 className="text-xl font-semibold mb-6 text-center">
        {title || "Dashboard"}
      </h3>
    </nav>
  );
};

export default DashboardHeader;
