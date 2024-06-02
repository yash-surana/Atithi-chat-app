import React from "react";
import "../home/style.css";

const DashboardHeader = ({ title }) => {
  return (
    <div className="relative h-[6.65%]">
      <div
        className="opacity-100 flex flex-row overflow-hidden bg-[rgb(223, 157, 99)] p-4 justify-center items-center w-full z-50"
        style={{ backgroundColor: "rgb(223, 157, 99)" }}
      >
        {/*menu bar*/}
        <p className="text-black text-lg font-bold text-center">
          {title || "Dashboard"}
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;
