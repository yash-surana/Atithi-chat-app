"use client"
import { ListFilter, Search } from "lucide-react";
import { Input } from "../ui/input";
import ThemeSwitch from "./theme-switch";
import Conversation from "./conversation";
import { UserButton } from "@clerk/nextjs";

import UserListDialog from "./user-list-dialog";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect } from "react";
import { useConversationStore } from "@/store/chat-store";
import './style.css';
import { IonIcon } from '@ionic/react'; // Import IonIcon from @ionic/react

const LeftPanel = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const conversations = useQuery(api.conversations.getMyConversations, isAuthenticated ? undefined : "skip");

    const { selectedConversation, setSelectedConversation } = useConversationStore();
	
    useEffect(() => {
        const conversationIds = conversations?.map((conversation) => conversation._id);
        if (selectedConversation && conversationIds && !conversationIds.includes(selectedConversation._id)) {
            setSelectedConversation(null);
        }
    }, [conversations, selectedConversation, setSelectedConversation]);
	
    if (isLoading) return null;

    return (
        <div style={{width:"375px",position:"relative",top:"0",left:"0",backgroundColor:"#EDE2D5"}}>
            <div className='fixed' style={{width:"375px"}}>
                {/* Header */}
                <div className='flex justify-between p-3 items-center' style={{backgroundColor:"#EDE2D5"}}>
                    <UserButton />
                    <div className='flex items-center gap-3'>
                        {isAuthenticated && <UserListDialog />}
                        <ThemeSwitch />
                    </div>
                </div>
                <div className='p-3 flex items-center'>
                    {/* Search */}
                    <div className='relative h-10 mx-3 flex-1' >
                        <Search
                            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10'
                            size={17}
                        />
                        <Input
                            type='text'
                            placeholder='Search'
                            className='pl-10 py-2 text-sm w-full placeholder-gray focus-visible:ring-transparent'
                            style={{backgroundColor:"#EDE2D5",border:"solid 1px #A8876F",borderRadius:"12px",color:"#B2947D"}}
                        />
                    </div>
                </div>
            </div>
            

            {/* Portfolio section */}
            <article className="portfolio" data-page="portfolio">          
                <section className="projects">
                    <ul className="filter-list">
                        <li className="filter-item">
                            <button data-filter-btn>Vendors</button>
                        </li>
                        <li className="filter-item">
                            <button data-filter-btn>Guests</button>
                        </li>
                        <li className="filter-item">
                            <button data-filter-btn>Groups</button>
                        </li>
                    </ul>
            
                    <div className="filter-select-box">
                        <button className="filter-select" data-select>
                            <div className="select-value" data-selecct-value>Select category</div>
                            <div className="select-icon">
                                <IonIcon name="chevron-down" /> 
                            </div>
                        </button>
                        <ul className="select-list">
                            <li className="select-item">
                                <button data-select-item>Vendors</button>
                            </li>
                            <li className="select-item">
                                <button data-select-item>Guests</button>
                            </li>
                            <li className="select-item">
                                <button data-select-item>Groups</button>
                            </li>
                        </ul>
                    </div>
            
                    <ul className="project-list">
                        {/* chats based on the role of loginer */}                        
						<li className="project-item" data-filter-item data-category="Vendors">
                           
                        </li>
						<li className="project-item" data-filter-item data-category="Guests">
                           
                        </li>
						<li className="project-item" data-filter-item data-category="Groups">
                           
                        </li>
                    </ul>
                </section>
            </article>

            {/* Chat List */}
            <div className="flex flex-col gap-0 max-h-[80%] overflow-scroll" style={{marginTop:"26%",color:"brown",scrollbarWidth:"none",msOverflowStyle: "none",height:"610px"}}>
                {/* Conversations will go here*/}
                {conversations?.map((conversation) => (
                    <Conversation key={conversation._id} conversation={conversation} />
                ))}

                {conversations?.length === 0 && (
                    <>
                        <p className='text-center text-gray-500 text-sm mt-3'>No conversations yet</p>
                        <p className='text-center text-gray-500 text-sm mt-3 '>
                           Hurry Up start planning 😊
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default LeftPanel;
