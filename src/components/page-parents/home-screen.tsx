import React, { useState, useEffect } from "react";
import { useRouter } fruseMutationvigation";
import AddEvent from "../home/add-event";
import toast from "react-hot-toast";

interface HomeScreenProps {
  role: "user" | "vendor";
}

const HomeScreen: React.FC<HomeScreenProps> = ({ role }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("loggedinUser"));
    setLoggedUser(user);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f9f5f2] text-black p-6 text-center relative">
      <h3 className="text-xl font-semibold mb-6">Home</h3>
      <img
        src="/path/to/your/image.png"
        alt="No events illustration"
        className="w-36 h-36 mb-6"
      />
      <p className="mb-6">
        No events here. Add or join an event to get started.
      </p>
      {role === "user" && (
        <div className="w-full max-w-xs">
          <button
            className="bg-[#b00020] text-black font-bold py-2 px-4 rounded w-full mb-4 hover:bg-[#9b001a]"
            onClick={() => setShowPopup(true)}
          >
            Add Event
          </button>
          <button className="bg-white text-black font-bold py-2 px-4 rounded w-full border-2 border-[#b00020] hover:bg-[#f9f5f2]" onClick={()=> toast.error("Guest access coming soon!")}>
            Join Event
          </button>
        </div>
      )}

      {showPopup && loggedUser && (
        <AddEvent onClose={handleClosePopup} loggedUser={loggedUser} />
      )}
    </div>
  );
};

export default HomeScreen;
