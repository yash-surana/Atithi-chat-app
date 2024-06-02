"use client";

import { useParams } from 'next/navigation';
import { Pencil, Trash } from 'lucide-react';
import LandingPageCouple from '@/components/home/LandingPageCouple';
import Avvvatars from 'avvvatars-react';
import toast, { Toaster } from 'react-hot-toast';
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import VendorUpload from '@/components/home/add-vendor';

const Vendors = () => {
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
  }, []);

  const vendors = [
    { name: "Anil Kumar", email: "anil.kumar@example.com", type: "Photographer", status: "Confirmed" },
    { name: "Meera Gupta", email: "meera.gupta@example.com", type: "DJ", status: "Pending" },
    { name: "Ravi Patel", email: "ravi.patel@example.com", type: "Caterer", status: "Confirmed" },
    { name: "Sunita Rao", email: "sunita.rao@example.com", type: "Decorator", status: "Pending" },
    { name: "Rajesh Mehta", email: "rajesh.mehta@example.com", type: "Photographer", status: "Confirmed" },
    { name: "Neha Singh", email: "neha.singh@example.com", type: "Florist", status: "Pending" },
  ];

  const showToast = (message) => toast(message);

  const VendorsDashboard = () => {
    const [showAddVendorModal, setShowAddVendorModal] = useState(false);
    return (
      <div className="h-full min-h-screen pt-[20%] pb-[50px] px-6 text-black">
        <h1 className="text-2xl font-bold mb-4">Vendors</h1>
        <p className="mb-8">Here you can manage your vendors</p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#F7EDE2]">
            <thead>
              <tr className="bg-[#F3D2C1]">
                <th className="py-2 px-4 border-b border-gray-200">User</th>
                <th className="py-2 px-4 border-b border-gray-200">Name</th>
                <th className="py-2 px-4 border-b border-gray-200">Email</th>
                <th className="py-2 px-4 border-b border-gray-200">Vendor Type</th>
                <th className="py-2 px-4 border-b border-gray-200">Status</th>
                <th className="py-2 px-4 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={index} className="bg-[#f3e4d3]">
                  <td className="py-2 px-4 border-b border-gray-200">
                    <Avvvatars value={vendor.email} borderColor="#000000" size={40} />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">{vendor.name}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{vendor.email}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{vendor.type}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{vendor.status}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <div className="flex space-x-2">
                      <button onClick={() => showToast('Coming soon!')}>
                        <Pencil className="w-5 h-5 text-black" />
                      </button>
                      <button onClick={() => showToast('Coming soon!')}>
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
          <button className="bg-[#b00020] text-white font-bold py-2 px-4 rounded w-full mb-4 hover:bg-[#9b001a] h-full" onClick={() => setShowAddVendorModal(true)}>Upload CSV</button>
          <button className="bg-white text-black font-bold py-2 px-4 rounded w-full border-2 border-[#b00020] hover:bg-[#f9f5f2] h-full" onClick={() => toast.success('This feature is going to be available very soon!')}>Update Vendor List</button>
        </div>
        {showAddVendorModal &&  
          <Dialog.Root open>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-50 text-black" />
              <Dialog.Content className="bg-[#f8ecde] p-6 rounded shadow-lg w-full max-w-md mx-auto mt-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black overflow-auto">
                <VendorUpload eventId={id || ""} onClose={() => setShowAddVendorModal(false)} loggedUser={loggedUser} handleFormNext={() => setShowAddVendorModal(false)} />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        }
        <Toaster />
      </div>
    );
  };

  return (
    <LandingPageCouple eventID={id} title={"Vendor"}>
      <VendorsDashboard />
    </LandingPageCouple>
  );
};

export default Vendors;
