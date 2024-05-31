import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import AddEvent from "../home/add-event";
import toast from "react-hot-toast";
import { useQuery } from "convex/react";
import { api } from '../../../convex/_generated/api';
import LandingPageCouple from "../home/LandingPageCouple";
import Avvvatars from 'avvvatars-react'
import { ChevronRight } from "lucide-react";
import DashboardHeader from "../layout/dashboardHeader"
import SocialImg from "/public/illustrations/social.svg"
import Image from "next/image";

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
  const [showPopup, setShowPopup] = useState(false);
  const [loggedUser, setLoggedUser] = useState<{ _id: string } | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("loggedinUser") || '{}');
    setLoggedUser(user);
  }, []);
  const router = useRouter();

  const userId = loggedUser ? loggedUser._id : null;
  const events = useQuery(api.users.getEventsById, { userId });

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-full overflow-auto px-10 py-16 bg-[#f9f5f2] text-black text-center relative">
      <DashboardHeader title="Home" />
      
      {!events || events.length === 0 ? (
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

      {role === "user" && (
        <div className="w-full max-w-xs mt-10">
          <p className="text-base font-normal mb-4 hover:underline hover:font-medium">Want to create or join a new event?</p>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <button
            className="bg-[#b00020] text-white font-bold py-2 px-4 rounded w-full mb-4 hover:bg-[#9b001a] h-full"
            onClick={() => setShowPopup(true)}
          >
            Add Event
          </button>
          <button
            className="bg-white text-black font-bold py-2 px-4 rounded w-full border-2 border-[#b00020] hover:bg-[#f9f5f2] h-full"
            onClick={() => toast.success("Guest access coming soon!")}
          >
            Join Event
          </button>
          </section>
        </div>
      )}

      {showPopup && loggedUser && (
        <AddEvent onClose={handleClosePopup} loggedUser={loggedUser} />
      )}
    </div>
  );
};

// Dynamically import the component to ensure `useRouter` is used client-side only
export default dynamic(() => Promise.resolve(HomeScreen), { ssr: false });
