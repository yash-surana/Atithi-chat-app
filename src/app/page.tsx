"use client";
import { useConvexAuth, useQuery, useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import HomeScreen from "@/components/page-parents/home-screen";
import Image from "next/image";
import OrganizerImg from "/public/illustrations/indianCouple.svg"
import VendorImg from "/public/illustrations/vendor.svg"
export default function Home() {
	const { isAuthenticated, isLoading } = useConvexAuth();
	const [loggedInUser, setLoggedInUser] = useState(null);
    const user = useQuery(api.users.getMe, isAuthenticated ? undefined : "skip");
    const updateUserRole = useMutation(api.users.updateRole);

	useEffect(() => {
		if (user) {
			setLoggedInUser(user);
			window.localStorage.setItem("loggedinUser", JSON.stringify(user));
		}
    }, [user]);

	const handleRoleChange = (role) => {
		updateUserRole({ userId: loggedInUser._id, role })
			.then((updatedUser) => {
				setLoggedInUser(updatedUser);
				window.localStorage.setItem("loggedinUser", JSON.stringify(updatedUser));
			})
			.catch((error) => {
				console.error("Error updating role:", error);
			});
	};

    if (isLoading) return null;

	if (loggedInUser) {
		if (!loggedInUser.isonboarding) {
			return (
				<main className="flex flex-col items-center justify-center min-h-screen p-4 text-black px-10 py-16" style={{ backgroundColor: '#f8ecde' }}>
					<h3 className="text-2xl font-bold mb-10 ">Choose your role</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-lg w-full">
						<div className="card flex flex-col items-center p-6 border-2 border-gray-900 shadow rounded-lg cursor-pointer " onClick={() => handleRoleChange("organizer")}>
							<Image src={OrganizerImg} alt="Organizer" className="w-36 h-36 mb-8" />
							<p
								
								className="text-black font-bold py-2 px-4 rounded mb-4 w-full text-center"
								style={{ backgroundColor: '#DF9D63' }}
							>
								User
							</p>
							<p className="text-center text-sm">Host events or join events as Guests</p>
						</div>
						<div className="card flex flex-col items-center p-6 shadow rounded-lg cursor-pointer border-2 border-gray-900" onClick={() => handleRoleChange("vendor")}>
							<Image src={VendorImg} alt="Vendor" className="w-36 h-36 mb-8"/>
							<p
								
								className="text-black font-bold py-2 px-4 rounded mb-4 w-full text-center"
								style={{ backgroundColor: '#DF9D63' }}
							>
								Vendor
							</p>
							<p className="text-center text-sm">Vendors provide services and track payments</p>
						</div>
					</div>
				</main>
			);
		} else {
			return <HomeScreen role={loggedInUser.role} />;
		}
	}

	return null;
}
