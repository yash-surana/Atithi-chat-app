import React, { useState } from "react";
import AddEvent from "./add-event";
import toast from "react-hot-toast";

const AddOrJoinEvent = ({ loggedUser, text }) => {
  const [showPopup, setShowPopup] = useState(false);
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <>
      <div className="w-full max-w-md my-20">
        <p className="text-base font-normal mb-4 hover:underline hover:font-medium">
          {text ? text : "Want to create or join a new event?"}
        </p>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {showPopup && loggedUser && (
        <AddEvent onClose={handleClosePopup} loggedUser={loggedUser} />
      )}
    </>
  );
};

export default AddOrJoinEvent;
