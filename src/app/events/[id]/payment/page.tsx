"use client"
import { ArrowDownRightFromCircle, ChevronRight, HandCoins } from "lucide-react";

import "../../../../components/home/style.css";
import DashboardHeader from "../../../../components/layout/dashboardHeader";
import { useEffect, useState } from "react";
import LandingPageCouple from "@/components/home/LandingPageCouple";
import { useParams } from "next/navigation";

const paymentsData =[
  {
    "name": "From Shah Associates",
    "date": "20 Jan 2024 at 10:00 PM",
    "amount": "$3,456.00",
    type : "incoming"
  },
  {
    "name": "From Stellar Innovations",
    "date": "30 Jul 2024 at 10:00 AM",
    "amount": "$2,894.30",
    type:"outgoing"
  },
  {
    "name": "From Quantum Technologies",
    "date": "14 Aug 2024 at 04:50 PM",
    "amount": "$3,556.20",
    type:"outgoing"
  },
  {
    "name": "From Harper Enterprises",
    "date": "15 Feb 2024 at 09:30 AM",
    "amount": "$4,789.00",
    type : "incoming"
  },
  {
    "name": "From Greenfield Corp",
    "date": "03 Mar 2024 at 01:15 PM",
    "amount": "$2,345.50",
    type : "incoming"
  },
  {
    "name": "From Blue Sky LLC",
    "date": "27 Apr 2024 at 11:45 AM",
    "amount": "$5,123.75",
    type : "incoming"
  },
  {
    "name": "From Mountain Ridge Inc",
    "date": "11 May 2024 at 02:30 PM",
    "amount": "$3,678.90",
    type:"outgoing"
  },
  {
    "name": "From Sunrise Solutions",
    "date": "20 Jun 2024 at 08:00 PM",
    "amount": "$4,987.65",
    type:"outgoing"
  },
 
  {
    "name": "From Dynamic Ventures",
    "date": "09 Sep 2024 at 07:10 AM",
    "amount": "$4,321.40",
    type:"outgoing"
  },
  {
    "name": "From Apex Solutions",
    "date": "18 Oct 2024 at 06:25 PM",
    "amount": "$5,789.00",
    type:"outgoing"
  }
]


const Payment = () => {
    const {id} = useParams();
 

  return (
    
    <LandingPageCouple eventID={id || ""} title="Payments">
      <div className=" overflow-auto px-6 py-6 bg-[#F8ECDE] text-black text-center relative">
        <div className="text-2xl font-bold text-center">All Payments</div>
        <ul className="py-6 grid grid-cols-1  self-center">
          {paymentsData.map((payment, index) => (
            
            <li
              key={index}
              className="flex flex-row justify-start gap-3 items-center w-full min-h-[40px] border-b px-0 py-5 border-b-[#DF9D63] cursor-pointer hover:bg-[#eac09b] transition-all duration-300 ease-out"
            >
              <div className={`p-2 ${payment.type === "incoming" ? "bg-green-600" : "bg-red-500"} rounded-lg`}>
              {payment.type === "incoming" ? (<HandCoins className="w-5 h-5 "/>) : <ArrowDownRightFromCircle className="w-5 h-5  "/>}</div>
              <div className="flex flex-row justify-between items-center gap-4 w-full">
                <div className="text-left">
                <p className="text-xs font-medium self-start">
                  {payment.name}
                </p>
                <p className="text-[9px] font-normal text-gray-500">{payment.date}</p>
                </div>
                <p className="text-sm font-bold text-right flex-1 float-right">{payment.amount}</p>
              </div>
            </li>
          ))}
        </ul>

        </div></LandingPageCouple>
      
    
  );
};

export default Payment;
