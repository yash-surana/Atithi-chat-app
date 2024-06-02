"use client";
import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/layout/dashboardHeader";
import DietaryPref from "../../components/home/dietarypref";
import Dj from "../../components/home/dj";
import Photographer from "../../components/home/Photographer";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const Services = () => {
  const [loggedUser, setLoggedUser] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = window.localStorage.getItem("loggedinUser");
      if (storedUser !== null) {
        setLoggedUser(JSON.parse(storedUser));
      }
    }
  }, []);

  return (
    <>
      <DashboardHeader title={loggedUser?.vendorType || "Photographer"} />
      {loggedUser.vendorType === "DJ" && <Dj />}
      {loggedUser.vendorType === "Photographer" && <Photographer />}
      {loggedUser.vendorType == "Caterer" && (
        <div className='h-full min-h-screen bg-[#F8ECDE]'>
        <DietaryPref />
      </div>
      )}
      <div className="flex flex-row justify-evenly items-center bottom-nav">
        <a href="/" className="ptp">
          <div className="icon">
            <svg
              width="20"
              height="17"
              viewBox="0 0 23 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 17.5002H20.5V10.7502L20.7194 10.9696C20.8604 11.1103 21.0515 11.1893 21.2507 11.1891C21.4499 11.189 21.6408 11.1097 21.7816 10.9687C21.9223 10.8277 22.0013 10.6366 22.0011 10.4374C22.0009 10.2382 21.9216 10.0472 21.7806 9.90649L12.5603 0.688992C12.279 0.4079 11.8977 0.25 11.5 0.25C11.1023 0.25 10.721 0.4079 10.4397 0.688992L1.21938 9.90649C1.07877 10.0472 0.999827 10.238 0.999914 10.437C1 10.6359 1.07911 10.8267 1.21984 10.9673C1.36057 11.1079 1.5514 11.1868 1.75033 11.1867C1.94927 11.1866 2.14002 11.1075 2.28062 10.9668L2.5 10.7502V17.5002H1C0.801088 17.5002 0.610322 17.5793 0.46967 17.7199C0.329018 17.8606 0.25 18.0513 0.25 18.2502C0.25 18.4492 0.329018 18.6399 0.46967 18.7806C0.610322 18.9212 0.801088 19.0002 1 19.0002H22C22.1989 19.0002 22.3897 18.9212 22.5303 18.7806C22.671 18.6399 22.75 18.4492 22.75 18.2502C22.75 18.0513 22.671 17.8606 22.5303 17.7199C22.3897 17.5793 22.1989 17.5002 22 17.5002ZM4 9.25024L11.5 1.75024L19 9.25024V17.5002H14.5V12.2502C14.5 12.0513 14.421 11.8606 14.2803 11.7199C14.1397 11.5793 13.9489 11.5002 13.75 11.5002H9.25C9.05109 11.5002 8.86032 11.5793 8.71967 11.7199C8.57902 11.8606 8.5 12.0513 8.5 12.2502V17.5002H4V9.25024ZM13 17.5002H10V13.0002H13V17.5002Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="text">Home</div>
        </a>
        <a href="/channels" className="ptp">
          <div className="icon">
            <img src="/icons/ChatsCircle.svg" alt="Chat" className="w-5 h-5" />
          </div>
          <div className="text">Channels</div>
        </a>
        <a href="/payment" className="ptp">
          <div className="icon">
            <img src="/icons/payment.svg" alt="Payment" className="w-5 h-5" />
          </div>
          <div className="text">Payments</div>
        </a>
        <a href="/service" className="ptp">
          <div className="icon">
            <img
              src="/icons/Camera.svg"
              alt="Photographer"
              className="w-5 h-5"
            />
          </div>
          <div className="text">{loggedUser?.vendorType || "Photographer"}</div>
        </a>
      </div>
    </>
  );
};

export default Services;
