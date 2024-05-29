// src/components/AddEvent.tsx
import React, { useState } from "react";
import { useMutation } from "convex/react";
import * as Dialog from "@radix-ui/react-dialog";
import { api } from "../../../convex/_generated/api";
import toast from "react-hot-toast";
import VendorUpload from "./add-vendor";
import GuestUpload from "./add-guest";
import { useRouter } from "next/navigation";

interface AddEventProps {
  onClose: () => void;
  loggedUser: any;
}

const initialFormData = {
  name: "",
  description: "",
  startDate: "",
  endDate: "",
};

const AddEvent: React.FC<AddEventProps> = ({ onClose, loggedUser }) => {
  const [popupShowed, setPopupShowed] = useState("addEvent");
  const [formData, setFormData] = useState(initialFormData);
  const [newEventId, setNewEventId] = useState<string | null>(null);
  const createEvent = useMutation(api.events.createEvent);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loggedUser) {
      console.error("User not logged in");
      return;
    }

    try {
      const newEvent = await createEvent({
        name: formData.name,
        description: formData.description,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        host: loggedUser?._id,
      });

      setNewEventId(newEvent);
      setPopupShowed("vendor");
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };
  const handleFormComplete = () => {
    setPopupShowed("complete"),
    toast.success("Event created successfully")
    router.push(`/events/${newEventId}`)
    onClose()
  }

  return (
    <>
      {popupShowed === "addEvent" && (
        <Dialog.Root open>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-50" />
            <Dialog.Content className="bg-white p-6 rounded shadow-lg text-black w-full max-w-md mx-auto mt-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Dialog.Title className="text-2xl text-black mb-4">Create Event</Dialog.Title>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-left mb-1">Event Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded p-2 bg-gray-100"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-left mb-1" style={{ color: 'black' }}>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border rounded p-2 bg-gray-100"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-left mb-1" style={{ color: 'black' }}>Start Date & Time</label>
                  <input
                    type="datetime-local"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full border rounded p-2 bg-gray-100"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-left mb-1" style={{ color: 'black' }}>End Date & Time</label>
                  <input
                    type="datetime-local"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full border rounded p-2 bg-gray-100"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2 hover:bg-gray-600"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#b00020] text-white font-bold py-2 px-4 rounded hover:bg-[#9b001a]"
                  >
                    Create
                  </button>
                </div>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
      {popupShowed === "vendor" && newEventId && (
        <Dialog.Root open>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-50 text-black" />
            <Dialog.Content className="bg-white p-6 rounded shadow-lg w-full md:max-w-xl mx-auto mt-0 md:mt-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black">
              <VendorUpload eventId={newEventId} onClose={() => setPopupShowed("addEvent")} loggedUser={loggedUser} handleFormNext={()=>setPopupShowed("guests")} />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
      {popupShowed === "guests" && newEventId && (
        <Dialog.Root open>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-50 text-black" />
            <Dialog.Content className="bg-white p-6 rounded shadow-lg w-full max-w-md mx-auto mt-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black">
              <GuestUpload eventId={newEventId} onClose={() => setPopupShowed("vendor")} loggedUser={loggedUser} handleFormNext={handleFormComplete} />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </>
  );
};

export default AddEvent;
