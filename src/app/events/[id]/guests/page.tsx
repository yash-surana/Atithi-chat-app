"use client";

import { useParams } from 'next/navigation';
import { Pencil, Trash } from 'lucide-react';
import LandingPageCouple from '@/components/home/LandingPageCouple';
import Avvvatars from 'avvvatars-react';
import toast from 'react-hot-toast';
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import GuestUpload from '@/components/home/add-guest';

const Guests = () => {
  const params = useParams();
  const { id } = params;
  const [loggedUser, setLoggedUser] = useState({});
  useEffect(() => {
    if (window) {
      const storedUser = window.localStorage.getItem("loggedinUser");
      if (storedUser !== null) {
        setLoggedUser(JSON.parse(storedUser));
      }
    }
  }, [])

  const guests = [
    { name: "Amit Sharma", email: "amit.sharma@example.com", rsvp: "Yes", totalPeople : 4 },
    { name: "Priya Singh", email: "priya.singh@example.com", rsvp: "No", totalPeople : null},
    { name: "Rahul Verma", email: "rahul.verma@example.com", rsvp: "Yes", totalPeople : 2 },
    { name: "Sneha Patil", email: "sneha.patil@example.com", rsvp: "Pending", totalPeople : 3},
    { name: "Vikram Rao", email: "vikram.rao@example.com", rsvp: "Yes", totalPeople : 1 },
    { name: "Anjali Mehta", email: "anjali.mehta@example.com", rsvp: "No", totalPeople : null },
  ];

  const GuestsDashboard = () => {
    const [showAddGuestModal, setShowAddGuestModal] = useState(false)
    return (
      <div className="h-full min-h-screen pt-[20%] pb-[50px] px-6 text-black">
        <h1 className="text-2xl font-bold mb-4">Guests</h1>
        <p className="mb-8">Here you can manage your guests</p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#F7EDE2] ">
            <thead>
              <tr className="bg-[#F3D2C1]">
                <th className="py-2 px-4 border-b border-gray-200">User</th>
                <th className="py-2 px-4 border-b border-gray-200">Name</th>
                <th className="py-2 px-4 border-b border-gray-200">Email</th>
                <th className="py-2 px-4 border-b border-gray-200">RSVP</th>
                <th className="py-2 px-4 border-b border-gray-200">Total Guests</th>
                <th className="py-2 px-4 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest, index) => (
                <tr key={index} className="bg-[#f3e4d3]">
                  <td className="py-2 px-4 border-b border-gray-200">
                  <Avvvatars
                  value={guest.email}
                  borderColor="#000000"
                  size={40}
                />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">{guest.name}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{guest.email}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{guest.rsvp}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{guest.totalPeople || "-"}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <div className="flex space-x-2">
                      <button >
                        <Pencil className="w-5 h-5 text-black" />
                      </button>
                      <button>
                        <Trash className="w-5 h-5 text-black" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex justify-center flex-col md:flex-row flex-nowrap items-center gap-6">
          <button className="bg-[#b00020] text-white font-bold py-2 px-4 rounded w-full mb-4 hover:bg-[#9b001a] h-full" onClick={()=>setShowAddGuestModal(true)}>Upload CSV</button>
          <button className="bg-white text-black font-bold py-2 px-4 rounded w-full border-2 border-[#b00020] hover:bg-[#f9f5f2] h-full" onClick={()=>toast.success('This feature is going to be available very soon!')}
>Update Guest List</button>
        </div>
        {
          showAddGuestModal &&  
          <Dialog.Root open>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-50 text-black" />
            <Dialog.Content className="bg-[#f8ecde] p-6 rounded shadow-lg w-full max-w-md mx-auto mt-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black overflow-auto">
              <GuestUpload eventId={id || ""} onClose={() => setShowAddGuestModal(false)} loggedUser={loggedUser} handleFormNext={() => setShowAddGuestModal(false)} />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        }
      </div>
    );
  };


  return (
    <LandingPageCouple eventID={id}>
      <GuestsDashboard />
    </LandingPageCouple>
  );
};

export default Guests;
