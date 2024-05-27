"use client";
import { useConvexAuth, useQuery, useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import HomeScreen from "@/components/page-parents/home-screen";

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
				<main className='m-5'>
					<div className='flex overflow-y-hidden h-[calc(100vh-50px)] max-w-[1700px] mx-auto '>
						<h3>Choose role</h3>
						<div className='flex flex-col items-center justify-center'>
							<div className='card'>
								<button
									onClick={() => handleRoleChange("user")}
									className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
								>
									User
								</button>
								<p className='text-center mt-2'>User can add or join events</p>
							</div>
							<div className='card'>
								<button
									onClick={() => handleRoleChange("vendor")}
									className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4'
								>
									Vendor
								</button>
								<p className='text-center mt-2'>Vendors provide services and track payments</p>
							</div>
						</div>
					</div>
				</main>
			);
		} else {
			return <HomeScreen role={loggedInUser.role} />
				
		}
	}

	return null;
}
