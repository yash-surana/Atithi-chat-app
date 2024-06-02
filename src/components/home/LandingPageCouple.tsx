"use client";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { api } from "../../../convex/_generated/api";

import SendInvites from "./sendinvites";
import PieChart from "./Piechart";
import "./style.css";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import LeftPanel from "./left-panel";
import RightPanel from "./right-panel";


const LandingPageCouple = ({eventID = "", children}) => {
  const [activePanel, setActivePanel] = useState('left');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const [showSendInvites, setShowSendInvites] = useState(false); // New state
  const [showatithigran,setatithtigram]=useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [opendashboard, setopendashboard] = useState(true);

  const openwhatsapp = () => {
    setShowWhatsapp(true);
    let ghr=document.getElementsByClassName("utu");
    for (let i = 0; i < ghr.length; i++) {
      (ghr[i] as HTMLElement).style.display = 'none';
  }
  };
  const opend = ()=>{
    setopendashboard(true);
    setShowWhatsapp(false);
  };

  const openIframe = (url) => {
    setIframeUrl(url);
    const iframeContainer = document.getElementById('iframe-container');
    if (iframeContainer) {
      iframeContainer.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  };

  const closeIframe = () => {
    setIframeUrl("");
    const iframeContainer = document.getElementById('iframe-container');
    if (iframeContainer) {
      iframeContainer.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  };

  

  
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    alert("clicked");
    setatithtigram(true);
    setopendashboard(false);
  };
  const handleSendInvitesClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setShowSendInvites(true); // Show SendInvites
    let cont=document.getElementsByClassName("ptoi");
    for (let i = 0; i < cont.length; i++) {
      (cont[i] as HTMLElement).style.display = 'none';
  }
  };
  
  return (
    <div className="parent-div">
      <div className={`dashboardv2-2136203 ${iframeUrl==="" ? "overflow-auto" : "overflow-hidden"}`} id="id-2136203">
        {/*sidebar code*/}
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} onSendInvitesClick={handleSendInvitesClick} eventID={eventID}/>
        {/*header starts*/}
        
        <section className="header-2136205" id="id-2136205">
          {/*menu bar*/}
          <div
            className="button-container pos-abs"
            id="id-2136206"
            onClick={openSidebar}
          >
            {" "}
            <div className="pos-abs menu-83146">
              <div className="pos-abs vector-10-83148">
                <div className="nodeBg-83148 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "></div>
              </div>
              <div className="pos-abs vector-7-83147">
                <div className="nodeBg-83147 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "></div>
              </div>
              <div className="pos-abs vector-9-83149">
                <div className="nodeBg-83149 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "></div>
              </div>
            </div>
          </div>
          {/*menubar code ends*/}
          <span className="head">Home</span>
        </section>
        {/*header ends*/}
        <div id="iframe-container" style={{ display: 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.8)', zIndex: 1000 }}>
          <span id="close-iframe" onClick={closeIframe} style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '24px', color: 'white', cursor: 'pointer' }}>×</span>
          <iframe id="iframe" src={iframeUrl} style={{ position: 'absolute', top: '50%', left: '50%', width: '80%', height: '80%', transform: 'translate(-50%, -50%)', border: 'none' }}></iframe>
        </div>
        <div className="utu">
{showSendInvites && <SendInvites/>}</div>
{showatithigran ?(
  <iframe src="https://atithigram.vercel.app/" frameBorder="0"></iframe>

):(<div></div>)}
        {showWhatsapp ? (
        <main style={{position:"relative"}}>       
          <LeftPanel/>
          <RightPanel/>        
        </main>
  
      ) : (
        
       children
        )}
        {/* dashboard-widgets ends */}
        <div className="bottom-nav">
          <a href="/" className="ptp" onClick={opend}>
            <div className="icon">
              <svg
                width="20"
                height="17"
                viewBox="0 0 23 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 17.5002H20.5V10.7502L20.7194 10.9696C20.8604 11.1103 21.0515 11.1893 21.2507 11.1891C21.4499 11.189 21.6408 11.1097 21.7816 10.9687C21.9223 10.8277 22.0013 10.6366 22.0011 10.4374C22.0009 10.2382 21.9216 10.0472 21.7806 9.90649L12.5603 0.688992C12.279 0.4079 11.8977 0.25 11.5 0.25C11.1023 0.25 10.721 0.4079 10.4397 0.688992L1.21938 9.90649C1.07877 10.0472 0.999827 10.238 0.999914 10.437C1 10.6359 1.07911 10.8267 1.21984 10.9673C1.36057 11.1079 1.5514 11.1868 1.75033 11.1867C1.94927 11.1866 2.14002 11.1075 2.28062 10.9668L2.5 10.7502V17.5002H1C0.801088 17.5002 0.610322 17.5793 0.46967 17.7199C0.329018 17.8606 0.25 18.0513 0.25 18.2502C0.25 18.4492 0.329018 18.6399 0.46967 18.7806C0.610322 18.9212 0.801088 19.0002 1 19.0002H22C22.1989 19.0002 22.3897 18.9212 22.5303 18.7806C22.671 18.6399 22.75 18.4492 22.75 18.2502C22.75 18.0513 22.671 17.8606 22.5303 17.7199C22.3897 17.5793 22.1989 17.5002 22 17.5002ZM4 9.25024L11.5 1.75024L19 9.25024V17.5002H14.5V12.2502C14.5 12.0513 14.421 11.8606 14.2803 11.7199C14.1397 11.5793 13.9489 11.5002 13.75 11.5002H9.25C9.05109 11.5002 8.86032 11.5793 8.71967 11.7199C8.57902 11.8606 8.5 12.0513 8.5 12.2502V17.5002H4V9.25024ZM13 17.5002H10V13.0002H13V17.5002Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="text">Home</div>
          </a>
          <a href="#" className="ptp" onClick={handleClick}>
            <div className="icon">
              <svg
                width="20"
                height="17"
                viewBox="0 0 20 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.47069 14.296C6.43069 14.296 5.51869 14.04 4.73469 13.528C3.96669 13 3.27869 12.304 2.67069 11.44C2.06269 10.56 1.47869 9.592 0.918688 8.536L1.83069 8.008C2.24669 8.76 2.67069 9.488 3.10269 10.192C3.55069 10.88 4.06269 11.448 4.63869 11.896C5.21469 12.328 5.91869 12.544 6.75069 12.544C7.27869 12.544 7.77469 12.432 8.23869 12.208C8.71869 11.968 9.11069 11.64 9.41469 11.224C9.71869 10.808 9.87069 10.32 9.87069 9.76C9.87069 9.168 9.67069 8.72 9.27069 8.416C8.88669 8.112 8.43069 7.96 7.90269 7.96C7.45469 7.96 6.99069 8.056 6.51069 8.248C6.03069 8.424 5.60669 8.6 5.23869 8.776L4.20669 7.024C4.63869 6.784 5.11069 6.568 5.62269 6.376C6.15069 6.184 6.68669 6.088 7.23069 6.088C7.31069 6.088 7.38269 6.088 7.44669 6.088C7.87869 5.816 8.20669 5.496 8.43069 5.128C8.65469 4.744 8.76669 4.36 8.76669 3.976C8.76669 3.56 8.63869 3.216 8.38269 2.944C8.12669 2.672 7.71869 2.536 7.15869 2.536C6.71069 2.536 6.13469 2.648 5.43069 2.872C4.72669 3.08 4.04669 3.392 3.39069 3.808L2.33469 2.008C3.03869 1.592 3.74269 1.288 4.44669 1.096C5.16669 0.903999 5.78269 0.808 6.29469 0.808C7.03069 0.808 7.65469 0.967999 8.16669 1.288C8.67869 1.592 9.09469 1.984 9.41469 2.464C9.73469 2.944 9.96669 3.44 10.1107 3.952C10.2707 4.448 10.3507 4.888 10.3507 5.272C10.3507 5.528 10.3107 5.8 10.2307 6.088C10.1507 6.376 9.95869 6.688 9.65469 7.024C9.75069 7.104 9.85469 7.216 9.96669 7.36C10.2387 7.664 10.5507 7.936 10.9027 8.176C11.2707 8.416 11.8067 8.536 12.5107 8.536C13.3907 8.536 14.1347 8.272 14.7427 7.744L14.7907 2.92H12.2227L11.4067 1.36V1.12H18.7987L19.6147 2.68V2.92H16.8067L16.8547 16.24H16.6147L14.6947 14.992L14.7187 10.168C14.5907 10.216 14.4547 10.248 14.3107 10.264C14.1667 10.28 14.0147 10.288 13.8547 10.288C13.4067 10.288 12.9587 10.208 12.5107 10.048C12.0787 9.888 11.7027 9.704 11.3827 9.496L11.2867 9.544C11.3827 9.768 11.4467 10 11.4787 10.24C11.5267 10.464 11.5507 10.68 11.5507 10.888C11.5507 11.544 11.3667 12.128 10.9987 12.64C10.6467 13.152 10.1667 13.56 9.55869 13.864C8.95069 14.152 8.25469 14.296 7.47069 14.296Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="text">Atithigram</div>
          </a>
          <a href="#" className="ptp" onClick={openwhatsapp}>
            <div className="icon">
              <svg
                width="20"
                height="17"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.2566 17.5087C22.7748 16.4338 23.0291 15.2508 22.9983 14.058C22.9675 12.8651 22.6525 11.6968 22.0795 10.6501C21.5066 9.60341 20.6921 8.70854 19.7038 8.03984C18.7155 7.37113 17.5819 6.94789 16.3972 6.80527C16.003 5.88873 15.4299 5.06007 14.7115 4.36779C13.993 3.67551 13.1436 3.13353 12.2131 2.7736C11.2826 2.41367 10.2896 2.24302 9.2923 2.27164C8.295 2.30026 7.31344 2.52758 6.40509 2.94028C5.49673 3.35298 4.67985 3.94277 4.00228 4.67511C3.32471 5.40745 2.80007 6.26762 2.45908 7.20525C2.11809 8.14288 1.9676 9.13912 2.01643 10.1356C2.06526 11.1321 2.31243 12.1089 2.74346 13.0087L2.0619 15.3253C1.98569 15.5839 1.9806 15.8582 2.04715 16.1195C2.1137 16.3808 2.24943 16.6193 2.44007 16.8099C2.63071 17.0005 2.86921 17.1363 3.13047 17.2028C3.39173 17.2694 3.6661 17.2643 3.92471 17.1881L6.24127 16.5065C6.98512 16.8639 7.78261 17.0967 8.6019 17.1956C8.99994 18.1282 9.58297 18.9704 10.3157 19.6713C11.0485 20.3723 11.9158 20.9173 12.8652 21.2735C13.8146 21.6297 14.8264 21.7897 15.8393 21.7438C16.8523 21.698 17.8455 21.4471 18.7588 21.0065L21.0753 21.6881C21.3339 21.7642 21.6081 21.7693 21.8692 21.7027C22.1304 21.6362 22.3688 21.5006 22.5594 21.3101C22.75 21.1196 22.8858 20.8812 22.9524 20.6201C23.0191 20.359 23.0141 20.0848 22.9381 19.8262L22.2566 17.5087ZM6.31252 14.9531C6.24085 14.9532 6.16955 14.9633 6.10065 14.9831L3.50002 15.75L4.26596 13.1475C4.32044 12.9594 4.29924 12.7576 4.2069 12.585C3.52844 11.3161 3.32853 9.84573 3.64362 8.44182C3.9587 7.03792 4.7678 5.79398 5.92341 4.93678C7.07902 4.07958 8.5042 3.66619 9.93914 3.77198C11.3741 3.87778 12.7232 4.4957 13.7406 5.5131C14.758 6.53051 15.376 7.87965 15.4817 9.31459C15.5875 10.7495 15.1742 12.1747 14.3169 13.3303C13.4597 14.4859 12.2158 15.295 10.8119 15.6101C9.40799 15.9252 7.9376 15.7253 6.66877 15.0468C6.55966 14.9864 6.43722 14.9542 6.31252 14.9531ZM20.7303 17.6465L21.5 20.25L18.8975 19.484C18.7095 19.4295 18.5076 19.4507 18.335 19.5431C16.9539 20.2805 15.3394 20.4494 13.8356 20.0137C12.3318 19.578 11.0576 18.5721 10.2847 17.2106C11.3116 17.1034 12.3053 16.7852 13.2034 16.2758C14.1016 15.7665 14.8847 15.077 15.5038 14.2507C16.1229 13.4244 16.5645 12.4791 16.801 11.4741C17.0375 10.469 17.0638 9.42593 16.8781 8.41027C17.7729 8.62117 18.6072 9.03485 19.3167 9.61936C20.0262 10.2039 20.5919 10.9436 20.9701 11.7814C21.3484 12.6193 21.529 13.5328 21.4982 14.4516C21.4673 15.3703 21.2258 16.2697 20.7922 17.0803C20.6989 17.2539 20.6776 17.4573 20.7332 17.6465H20.7303Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="text">Channels</div>
          </a>
          <a href="#" className="ptp" onMouseDown={()=>{toast.success("Update profile actions coming soon")}} onTouchEnd={()=>{toast.success("Update profile actions coming soon")}}>
            <div className="icon">
              <svg
                width="20"
                height="17"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 0.25C8.57164 0.25 6.68657 0.821828 5.08319 1.89317C3.47982 2.96452 2.23013 4.48726 1.49218 6.26884C0.754225 8.05042 0.561142 10.0108 0.937348 11.9021C1.31355 13.7934 2.24215 15.5307 3.60571 16.8943C4.96928 18.2579 6.70656 19.1865 8.59787 19.5627C10.4892 19.9389 12.4496 19.7458 14.2312 19.0078C16.0127 18.2699 17.5355 17.0202 18.6068 15.4168C19.6782 13.8134 20.25 11.9284 20.25 10C20.2473 7.41498 19.2192 4.93661 17.3913 3.10872C15.5634 1.28084 13.085 0.25273 10.5 0.25ZM5.445 16.5156C5.98757 15.6671 6.73501 14.9688 7.61843 14.4851C8.50185 14.0013 9.49283 13.7478 10.5 13.7478C11.5072 13.7478 12.4982 14.0013 13.3816 14.4851C14.265 14.9688 15.0124 15.6671 15.555 16.5156C14.1097 17.6397 12.331 18.2499 10.5 18.2499C8.66905 18.2499 6.89031 17.6397 5.445 16.5156ZM7.5 9.25C7.5 8.65666 7.67595 8.07664 8.0056 7.58329C8.33524 7.08994 8.80378 6.70542 9.35195 6.47836C9.90013 6.2513 10.5033 6.19189 11.0853 6.30764C11.6672 6.4234 12.2018 6.70912 12.6213 7.12868C13.0409 7.54824 13.3266 8.08279 13.4424 8.66473C13.5581 9.24667 13.4987 9.84987 13.2716 10.398C13.0446 10.9462 12.6601 11.4148 12.1667 11.7444C11.6734 12.0741 11.0933 12.25 10.5 12.25C9.70435 12.25 8.94129 11.9339 8.37868 11.3713C7.81607 10.8087 7.5 10.0456 7.5 9.25ZM16.665 15.4759C15.8285 14.2638 14.6524 13.3261 13.2844 12.7806C14.0192 12.2019 14.5554 11.4085 14.8184 10.5108C15.0815 9.6132 15.0582 8.6559 14.752 7.77207C14.4457 6.88825 13.8716 6.12183 13.1096 5.5794C12.3475 5.03696 11.4354 4.74548 10.5 4.74548C9.56462 4.74548 8.65248 5.03696 7.89044 5.5794C7.12839 6.12183 6.55432 6.88825 6.24805 7.77207C5.94179 8.6559 5.91855 9.6132 6.18157 10.5108C6.44459 11.4085 6.9808 12.2019 7.71563 12.7806C6.34765 13.3261 5.17147 14.2638 4.335 15.4759C3.27804 14.2873 2.5872 12.8185 2.34567 11.2464C2.10415 9.67427 2.32224 8.06584 2.97368 6.61478C3.62512 5.16372 4.68213 3.93192 6.01745 3.06769C7.35276 2.20346 8.90943 1.74367 10.5 1.74367C12.0906 1.74367 13.6473 2.20346 14.9826 3.06769C16.3179 3.93192 17.3749 5.16372 18.0263 6.61478C18.6778 8.06584 18.8959 9.67427 18.6543 11.2464C18.4128 12.8185 17.722 14.2873 16.665 15.4759Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="text">My Profile</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPageCouple;
