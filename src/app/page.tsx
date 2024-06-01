"use client";
import { useConvexAuth, useQuery, useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import HomeScreen from "@/components/page-parents/home-screen";
import Image from "next/image";
import OrganizerImg from "/public/illustrations/indianCouple.svg";
import VendorImg from "/public/illustrations/vendor.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const user = useQuery(api.users.getMe, isAuthenticated ? undefined : "skip");
  const updateUserRole = useMutation(api.users.updateRole);
  const updateVendorType = useMutation(api.users.updateVendorType);

  useEffect(() => {
    if (user) {
      setLoggedInUser(user);
      window.localStorage.setItem("loggedinUser", JSON.stringify(user));
    }
  }, [user]);

  const handleRoleChange = async (role) => {
    try {
      console.log("Changing role to:", role);
      const updatedUser = await updateUserRole({ userId: loggedInUser._id, role });
      console.log("Role updated:", updatedUser);
      setLoggedInUser(updatedUser);
      window.localStorage.setItem("loggedinUser", JSON.stringify(updatedUser));
      if (role === "vendor") {
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleVendorTypeChange = async (type) => {
    try {
      console.log("Changing vendor type to:", type);
      await handleRoleChange("vendor");
      const updatedUser = await updateVendorType({ userId: loggedInUser._id, vendorType: type });
      console.log("Vendor type updated:", updatedUser);
      setLoggedInUser(updatedUser);
      window.localStorage.setItem("loggedinUser", JSON.stringify(updatedUser));
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error updating vendor type:", error);
    }
  };

  if (isLoading) return null;

  if (loggedInUser) {
    if (!loggedInUser.isonboarding) {
      if ((loggedInUser.role === "vendor" && loggedInUser.vendorType===undefined) || loggedInUser.role === "user") {
        return (
          <main
            className="flex flex-col items-center justify-center min-h-screen p-4 text-black px-10 py-16"
            style={{ backgroundColor: "#f8ecde" }}
          >
            <h3 className="text-2xl font-bold mb-10 ">Choose your role</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-lg w-full">
              <div
                className="card flex flex-col items-center p-6 border-2 border-gray-900 shadow rounded-lg cursor-pointer"
                onClick={() => handleRoleChange("user")}
              >
                <Image src={OrganizerImg} alt="User" className="w-36 h-36 mb-8" />
                <p
                  className="text-black font-bold py-2 px-4 rounded mb-4 w-full text-center"
                  style={{ backgroundColor: "#DF9D63" }}
                >
                  User
                </p>
                <p className="text-center text-sm">Host events or join events as Guests</p>
              </div>
              <div
                className="card flex flex-col items-center p-6 shadow rounded-lg cursor-pointer border-2 border-gray-900"
                onClick={() => setIsDialogOpen(true)}
              >
                <Image src={VendorImg} alt="Vendor" className="w-36 h-36 mb-8" />
                <p
                  className="text-black font-bold py-2 px-4 rounded mb-4 w-full text-center"
                  style={{ backgroundColor: "#DF9D63" }}
                >
                  Vendor
                </p>
                <p className="text-center text-sm">Vendors provide services and track payments</p>
              </div>
            </div>

            <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <Dialog.Overlay className="fixed inset-0 bg-gray-800 opacity-80" />
              <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-max ">
                <Dialog.Close asChild>
                  <button className="text-gray-500 hover:text-gray-700 transition-all duration-300 ease-out float-right">
                    <X className="w-6 h-6" />
                  </button>
                </Dialog.Close>
                <Dialog.Title className="text-lg font-bold mb-4 ">
                  Select Vendor Type
                </Dialog.Title>
                <div className="flex flex-col space-y-2">
                  {["Photographer", "Caterer", "DJ", "Security", "Hotel Services"].map((type) => (
                    <button
                      key={type}
                      className="text-black font-bold py-2 px-4 rounded w-full text-center border-2 hover:bg-[rgb(255,245,245)]"
                      style={{ borderColor: "#DF9D63" }}
                      onClick={() => handleVendorTypeChange(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </Dialog.Content>
            </Dialog.Root>
          </main>
        );
      }
    } else {
      return <HomeScreen role={loggedInUser.role} />;
    }
  }

  return null;
}
