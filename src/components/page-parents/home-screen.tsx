import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import { useQuery } from "convex/react";
import { api } from '../../../convex/_generated/api';
import LandingPageCouple from "../home/LandingPageCouple";
import Avvvatars from 'avvvatars-react'
import { ChevronRight } from "lucide-react";
import DashboardHeader from "../layout/dashboardHeader"
import SocialImg from "/public/illustrations/social.svg"
import Image from "next/image";
import VendorHomeScreen from "../home/vendor-home";
import AddOrJoinEvent from "../home/add-or-join-event"

interface HomeScreenProps {
  role: "user" | "vendor";
}

interface Event {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  host: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ role }) => {
  const [loggedUser, setLoggedUser] = useState<{ _id: string } | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("loggedinUser") || '{}');
    setLoggedUser(user);
  }, []);
  const router = useRouter();

  const userId = loggedUser ? loggedUser._id : null;
  const events = useQuery(api.users.getEventsById, { userId });
 

  const renderHomeScreen = () => {
    switch(role) {
      case "user" : 
      return  <div className="flex flex-col items-center justify-center min-h-screen h-full overflow-auto px-10 py-10 bg-[#F8ECDE] text-black text-center relative">
        
      

      {(!events || events.length === 0) ? (
        <>
          <Image
            src={SocialImg}
            alt="No events illustration"
            className="w-48 h-48 mb-6"
          />
          <p className="mb-6">
            No events here. Add or join an event to get started.
          </p>
        </>
      ) : (
        <>
        <div className="text-2xl font-bold text-center">All events</div>
        <ul className="py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 self-center">
          {events.map((event) => (
          <li key={event._id} onClick={() => {setSelectedEventId(event._id);router.push(`events/${event._id}`)}} className="flex flex-row justify-start gap-6 items-center w-full min-h-[40px] border-b p-5 border-b-[#DF9D63] cursor-pointer hover:bg-[#eac09b] transition-all duration-300 ease-out">
            <Avvvatars  style="shape" value={event.name} borderColor="#000000" size={40}/>
            <div>
              <p className="text-base font-medium self-center">{event.name}</p>
            
            </div>
            <ChevronRight className="w-6 h-6 ml-auto"/>
          </li>
        ))}
        </ul>
        </>

      )}
      <AddOrJoinEvent  loggedUser={loggedUser}/>

      </div>

      case "vendor" :
return <VendorHomeScreen loggedUser={loggedUser} />
    }
  }

  return <div className="bg-[#F8ECDE]"><DashboardHeader title="Home" />
  {renderHomeScreen()}</div>
};

// Dynamically import the component to ensure `useRouter` is used client-side only
export default dynamic(() => Promise.resolve(HomeScreen), { ssr: false });
