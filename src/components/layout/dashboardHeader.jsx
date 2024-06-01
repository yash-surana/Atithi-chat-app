import React from "react";
import "../home/style.css";
const DashboardHeader = ({ title }) => {
  return (
    <nav className="header-2136205">
      {/*menu bar*/}
      <div
        className="button-container pos-abs"
        id="id-2136206"
        // onClick={openSidebar}
      >
        {" "}
        <div className="pos-abs menu-83146">
          <div className="pos-abs vector-10-83148">
            <div className="nodeBg-83148 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "></div>
          </div>
          <div className="pos-abs vector-7-83147">
            <div className="nodeBg-83147 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "></div>
          </div>
          <div className="pos-abs vector-9-83149">
            <div className="nodeBg-83149 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "></div>
          </div>
        </div>
      </div>
      <p className="head">{title || "Dashboard"}</p>
    </nav>
  );
};

export default DashboardHeader;
