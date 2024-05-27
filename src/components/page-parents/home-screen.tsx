import React, { useState, useEffect } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useRouter } from 'next/navigation';

interface HomeScreenProps {
  role: 'user' | 'vendor';
}

const HomeScreen: React.FC<HomeScreenProps> = ({ role }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: ''
  });
  const createEvent = useMutation(api.events.createEvent);
  const [loggedUser, setLoggedUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("loggedinUser"));
    setLoggedUser(user);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loggedUser) {
      console.error('User not logged in');
      return;
    }

    try {
      const newEventId = await createEvent({
        name: formData.name,
        description: formData.description,
        startDate: new Date(formData.startDate).toISOString(), // Ensure ISO string format
        endDate: new Date(formData.endDate).toISOString(),     // Ensure ISO string format
        host: loggedUser?._id, // Ensure this is available
      });

      console.log(newEventId, "New Event ID");

      // Ensure router is ready before redirecting
      if (router.isReady) {
        router.push(`/events/${newEventId}`);
      }
      setShowPopup(false);
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f9f5f2] text-black p-6 text-center">
      <h3 className="text-xl font-semibold mb-6">Home</h3>
      <img 
        src="/path/to/your/image.png" 
        alt="No events illustration" 
        className="w-36 h-36 mb-6"
      />
      <p className="mb-6">No events here. Add or join an event to get started.</p>
      {role === 'user' && (
        <div className="w-full max-w-xs">
          <button
            className="bg-[#b00020] text-black font-bold py-2 px-4 rounded w-full mb-4 hover:bg-[#9b001a]"
            onClick={() => setShowPopup(true)}
          >
            Add Event
          </button>
          <button className="bg-white text-black font-bold py-2 px-4 rounded w-full border-2 border-[#b00020] hover:bg-[#f9f5f2]">
            Join Event
          </button>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center text-black">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-2xl mb-4">Create Event</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-left mb-1">Event Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded p-2  bg-gray-100"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-left mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border rounded p-2 bg-gray-100"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-left mb-1">Start Date & Time</label>
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
                <label className="block text-left mb-1">End Date & Time</label>
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
                  onClick={() => setShowPopup(false)}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
