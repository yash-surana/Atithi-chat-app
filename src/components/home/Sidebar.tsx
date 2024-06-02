import React from 'react';
import './Sidebar.css'; // Import the CSS file for styling

interface SidebarProps {
    isOpen: boolean;
    closeSidebar: () => void;
    onSendInvitesClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void; // New prop
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar, onSendInvitesClick }) => {

    const openIframe = (url: string) => {
        const iframeContainer = document.getElementById('iframe-container');
        const iframe = document.getElementById('iframe') as HTMLIFrameElement;
        if (iframeContainer && iframe) {
            iframe.src = url;
            iframeContainer.style.display = 'block';
        }
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="closebtn" onClick={closeSidebar}>×</button>
            <a href="#" style={{ display: "flex", flexDirection: "row" }}>
                <img width="20" height="20" src="https://img.icons8.com/wired/64/FFFFFF/pencil.png" alt="pencil" />&nbsp;
                Create Event
            </a>
            <a href="#" style={{ display: "flex", flexDirection: "row" }}>
                <img width="20" height="20" src="https://img.icons8.com/dotty/80/FFFFFF/food-cart.png" alt="food-cart" />&nbsp;
                Add Vendors
            </a>
            <a href="#" style={{ display: "flex", flexDirection: "row" }}>
                <img width="20" height="20" src="https://img.icons8.com/dotty/80/FFFFFF/guest--.png" alt="guest--" />&nbsp;
                Guest List
            </a>
            <a href="#" style={{ display: "flex", flexDirection: "row" }}>
                <img width="20" height="20" src="https://img.icons8.com/wired/64/FFFFFF/workflow.png" alt="workflow" />&nbsp;
                Event Workflow
            </a>
            <a href="#" style={{ display: "flex", flexDirection: "row" }} onClick={onSendInvitesClick}>
                <img width="20" height="20" src="https://img.icons8.com/dotty/80/FFFFFF/online-paint-tool.png" alt="online-paint-tool" />&nbsp;
                Send E-Invites
            </a>
            <a href="#" style={{ display: "flex", flexDirection: "row" }}>
                <img width="20" height="20" src="https://img.icons8.com/ios/50/FFFFFF/multiple-pages-mode--v2.png" alt="multiple-pages-mode--v2" />&nbsp;
                Spatial Arrangement
            </a>
            <a href="#" style={{ display: "flex", flexDirection: "row" }} >
                <img width="20" height="20" src="https://img.icons8.com/dotty/80/FFFFFF/card-in-use.png" alt="card-in-use" />&nbsp;
                Payments
            </a>
            <a href="#" onClick={() => openIframe('https://poseperfect.streamlit.app/?embed=true')} style={{ display: "flex", flexDirection: "row" }}>
                <img width="20" height="20" src="https://img.icons8.com/dotty/80/FFFFFF/card-in-use.png" alt="card-in-use" />&nbsp;
                AI Pose Suggestion
            </a>
            <a href="#" onClick={() => openIframe('https://glambot.streamlit.app/?embed=true')} style={{ display: "flex", flexDirection: "row" }}>
                <img width="20" height="20" src="https://img.icons8.com/dotty/80/FFFFFF/card-in-use.png" alt="card-in-use" />&nbsp;
                AI Outfit Suggestion
            </a>
            <a href="#" style={{ display: "flex", flexDirection: "row" }}>
                <img width="20" height="20" src="https://img.icons8.com/dotty/80/FFFFFF/settings.png" alt="settings" />&nbsp;
                Settings
            </a>
        </div>
    );
};

export default Sidebar;
