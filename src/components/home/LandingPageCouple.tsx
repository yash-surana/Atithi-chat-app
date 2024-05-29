"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Image from 'next/image';
import { api } from "../../../convex/_generated/api";

import PieChart from "./Piechart";
import "./style.css";
import { useQuery } from "convex/react";
import ToDoList from "./ToDoList";
import welcomeimg from '../../../public/welcomeimg.png';
import { useParams } from "next/navigation";

const LandingPageCouple = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const openSidebar = () => setIsSidebarOpen(true);
    const closeSidebar = () => setIsSidebarOpen(false);

    const me = useQuery(api.users.getMe);
    const params = useParams();
    const { id } = params;
  
    const event = useQuery(api.events.getEventById, id ? { id } : "skip");
    const eventstartdate = event?.startDate;
    const eventenddate = event?.endDate;
    const formattedDate = new Date(event?.startDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });
  const data = [30,13,2];
  const labels = ['Confirmed', 'Pending', 'Declined'];
  
  console.log(formattedDate); 
    // Check if event start date is defined before performing calculations
    let daysDifference: number | undefined;
    if (eventstartdate) {
        const startDate = new Date(eventstartdate);
        const today = new Date();
        const timeDifference = startDate.getTime() - today.getTime();
        daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    }
  return (
    <div className="parent-div ">
      <div className="pos-abs dashboardv2-2136203" id="id-2136203">
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        {/* Header1 */}
        <section className="pos-abs header-2136205" id="id-2136205">         
          <div className="button-container pos-abs" id="id-2136206"onClick={openSidebar}>
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
          <div className="pos-abs dashboarddrop-2136207" id="id-2136207">
            <div className="pos-abs channels1-2136613" id="id-2136613" onClick={() => alert("opeh")}>
              <span className="channels1-2136613-0 ">{"Channels"}</span>
            </div>
            <div className="pos-abs home-2136208" id="id-2136208" >
              <span className="home-2136208-0 ">{"Home"}</span>
            </div>
          </div>
        </section>

        
        {/* dashboard-widgets1 */}
        <section className="pos-abs dashboardwidget-2136209" id="id-2136209">
          <div className="pos-abs welcomeframe-2136367" id="id-2136367">
            <div className="pos-abs img-2136368" id="id-2136368">
            <Image src={welcomeimg} alt="Create Event" />
            </div>
            <div className="pos-abs textframe-2136369" id="id-2136369">
              <div className="pos-abs welcome-jiya-2136370" id="id-2136370">
                <span className="welcome-jiya-2136370-0 ">
                  Welcome,<br/> {me?.name}
                </span>
              </div>
              <div className="pos-abs setup-your-prof-2136371" id="id-2136371">
                <span className="setup-your-prof-2136371-0 ">
                  Set-up your profile for more 
                   personalized experience.
                </span>
              </div>
            </div>
          </div>
          {/*event time and budget widget*/}
          <div className="pos-abs widgets-2136210" id="id-2136210">
            <div className="pos-abs widget1-2136211" id="id-2136211">
              <div className="pos-abs datetimeframe-2136212" id="id-2136212">
                <div className="pos-abs date-2136213" id="id-2136213">
                  <div className="pos-abs calendardots-2136215" id="id-2136215">
                    <div
                      className="pos-abs vector-I2136215_889921046"
                      id="id-I2136215_889921046"
                    >
                      <div
                        className="nodeBg-I2136215_889921046 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                        id="id-bg-I2136215_889921046"
                      ></div>
                    </div>
                  </div>
                  <div className="pos-abs c-060224-2136214" id="id-2136214">
                    <span className="c-060224-2136214-0 ">{formattedDate}</span>
                  </div>
                </div>
                <div className="pos-abs daystime-2136216" id="id-2136216">
                  <div className="pos-abs dayhighlight-2136217" id="id-2136217">
                    <div className="pos-abs c-12-2136218" id="id-2136218">
                      <span className="c-12-2136218-0 ">{daysDifference}</span>
                    </div>
                  </div>
                  <div className="pos-abs days-until-2136219" id="id-2136219">
                    <span className="days-until-2136219-0 ">
                      {"Days Until"}
                    </span>
                  </div>
                </div>
                <div className="pos-abs veerekiwedding-2136220" id="id-2136220">
                  <span className="veerekiwedding-2136220-0 ">
                    {"#"+event?.name}
                  </span>
                </div>
              </div>
            </div>
            <div className="pos-abs widget2-2136221" id="id-2136221">
              <div className="pos-abs budgetframe-2136222" id="id-2136222">
                <div className="pos-abs budgeticon-2136223" id="id-2136223">
                  <div
                    className="calculator-2136225-container pos-abs"
                    id="id-2136225"
                  >
                    <div className="pos-abs formatoutline-w-1114638">
                      <div className="pos-abs vector-1114639">
                        <div className="nodeBg-1114639 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "></div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="pos-abs budget-updates-2136224"
                    id="id-2136224"
                  >
                    <span className="budget-updates-2136224-0 ">
                      {"Budget Updates"}
                    </span>
                  </div>
                </div>
                <div className="pos-abs amount-2136226" id="id-2136226">
                  <div className="pos-abs percentage-2136227" id="id-2136227">
                    <div className="pos-abs c-34-2136228" id="id-2136228">
                      <span className="c-34-2136228-0 ">{"34%"}</span>
                    </div>
                    <div className="pos-abs spent-2136229" id="id-2136229">
                      <span className="spent-2136229-0 ">{"Spent"}</span>
                    </div>
                  </div>
                  <div
                    className="pos-abs c-12244-of-36194--2136230"
                    id="id-2136230"
                  >
                    <span className="c-12244-of-36194--2136230-0 ">
                      {"(12,244 of 36,194 USD)"}
                    </span>
                  </div>
                </div>
                <div
                  className="pos-abs last-transactio-2136231"
                  id="id-2136231"
                >
                  <span className="last-transactio-2136231-0 ">
                    {"Last Transaction:"}
                  </span>
                  <span className="last-transactio-2136231-1 "> </span>
                  <span className="last-transactio-2136231-2 ">
                    {"05/10/24"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ToDoList/>
          <div className="pos-abs paymentsdue-2136281" id="id-2136281">
            <div className="pos-abs payments-due-th-2136282" id="id-2136282">
              <span className="payments-due-th-2136282-0 ">
                {"Payments Due This Week ("}
              </span>
              <span className="payments-due-th-2136282-1 ">{"3"}</span>
              <span className="payments-due-th-2136282-2 ">{")"}</span>
            </div>
            <div className="pos-abs paymentreminder-2136283" id="id-2136283">
              <div className="pos-abs paymentwidget-2136284" id="id-2136284">
                <div className="pos-abs widgetframe-2136285" id="id-2136285">
                  <div
                    className="pos-abs checkpaymentupd-2136286"
                    id="id-2136286"
                  >
                    <div className="pos-abs paytext-2136288" id="id-2136288">
                      <div
                        className="pos-abs finalise-catere-2136289"
                        id="id-2136289"
                      >
                        <span className="finalise-catere-2136289-0 ">
                          {"Finalise Caterer"}
                        </span>
                      </div>
                      <div
                        className="pos-abs may-25-sunday-2136290"
                        id="id-2136290"
                      >
                        <span className="may-25-sunday-2136290-0 ">
                          {"May 25, Sunday"}
                        </span>
                      </div>
                    </div>
                    <div
                      className="pos-abs component-1-2136287"
                      id="id-2136287"
                    >
                      <div
                        className="pos-abs rectangle-6449-I2136287_120522"
                        id="id-I2136287_120522"
                      ></div>
                    </div>
                  </div>
                  <div
                    className="pos-abs callmsgnotify-2136291"
                    id="id-2136291"
                  >
                    <div className="pos-abs phone-2136292" id="id-2136292">
                      <div
                        className="pos-abs vector-I2136292_88996373"
                        id="id-I2136292_88996373"
                      >
                        <div
                          className="nodeBg-I2136292_88996373 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                          id="id-bg-I2136292_88996373"
                        ></div>
                      </div>
                    </div>
                    <div
                      className="pos-abs chatcircletext-2136293"
                      id="id-2136293"
                    >
                      <div
                        className="pos-abs vector-I2136293_88994660"
                        id="id-I2136293_88994660"
                      >
                        <div
                          className="nodeBg-I2136293_88994660 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                          id="id-bg-I2136293_88994660"
                        ></div>
                      </div>
                    </div>
                    <div
                      className="pos-abs bellringing-2136294"
                      id="id-2136294"
                    >
                      <div
                        className="pos-abs vector-I2136294_889942207"
                        id="id-I2136294_889942207"
                      >
                        <div
                          className="nodeBg-I2136294_889942207 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                          id="id-bg-I2136294_889942207"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pos-abs paymentwidget-2136295" id="id-2136295">
                <div className="pos-abs widgetframe-2136296" id="id-2136296">
                  <div
                    className="pos-abs checkpaymentupd-2136297"
                    id="id-2136297"
                  >
                    <div className="pos-abs paytext-2136299" id="id-2136299">
                      <div
                        className="pos-abs finalise-catere-2136300"
                        id="id-2136300"
                      >
                        <span className="finalise-catere-2136300-0 ">
                          {"Finalise Caterer"}
                        </span>
                      </div>
                      <div
                        className="pos-abs may-25-sunday-2136301"
                        id="id-2136301"
                      >
                        <span className="may-25-sunday-2136301-0 ">
                          {"May 25, Sunday"}
                        </span>
                      </div>
                    </div>
                    <div
                      className="pos-abs component-1-2136298"
                      id="id-2136298"
                    >
                      <div
                        className="pos-abs rectangle-6449-I2136298_120522"
                        id="id-I2136298_120522"
                      ></div>
                    </div>
                  </div>
                  <div
                    className="pos-abs callmsgnotify-2136302"
                    id="id-2136302"
                  >
                    <div className="pos-abs phone-2136303" id="id-2136303">
                      <div
                        className="pos-abs vector-I2136303_88996373"
                        id="id-I2136303_88996373"
                      >
                        <div
                          className="nodeBg-I2136303_88996373 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                          id="id-bg-I2136303_88996373"
                        ></div>
                      </div>
                    </div>
                    <div
                      className="pos-abs chatcircletext-2136304"
                      id="id-2136304"
                    >
                      <div
                        className="pos-abs vector-I2136304_88994660"
                        id="id-I2136304_88994660"
                      >
                        <div
                          className="nodeBg-I2136304_88994660 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                          id="id-bg-I2136304_88994660"
                        ></div>
                      </div>
                    </div>
                    <div
                      className="pos-abs bellringing-2136305"
                      id="id-2136305"
                    >
                      <div
                        className="pos-abs vector-I2136305_889942207"
                        id="id-I2136305_889942207"
                      >
                        <div
                          className="nodeBg-I2136305_889942207 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                          id="id-bg-I2136305_889942207"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pos-abs paymentwidget-2136306" id="id-2136306">
                <div className="pos-abs widgetframe-2136307" id="id-2136307">
                  <div
                    className="pos-abs checkpaymentupd-2136308"
                    id="id-2136308"
                  >
                    <div className="pos-abs paytext-2136310" id="id-2136310">
                      <div
                        className="pos-abs finalise-catere-2136311"
                        id="id-2136311"
                      >
                        <span className="finalise-catere-2136311-0 ">
                          {"Finalise Caterer"}
                        </span>
                      </div>
                      <div
                        className="pos-abs may-25-sunday-2136312"
                        id="id-2136312"
                      >
                        <span className="may-25-sunday-2136312-0 ">
                          {"May 25, Sunday"}
                        </span>
                      </div>
                    </div>
                    <div
                      className="pos-abs component-1-2136309"
                      id="id-2136309"
                    >
                      <div
                        className="pos-abs rectangle-6449-I2136309_120522"
                        id="id-I2136309_120522"
                      ></div>
                    </div>
                  </div>
                  <div
                    className="pos-abs callmsgnotify-2136313"
                    id="id-2136313"
                  >
                    <div className="pos-abs phone-2136314" id="id-2136314">
                      <div
                        className="pos-abs vector-I2136314_88996373"
                        id="id-I2136314_88996373"
                      >
                        <div
                          className="nodeBg-I2136314_88996373 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                          id="id-bg-I2136314_88996373"
                        ></div>
                      </div>
                    </div>
                    <div
                      className="pos-abs chatcircletext-2136315"
                      id="id-2136315"
                    >
                      <div
                        className="pos-abs vector-I2136315_88994660"
                        id="id-I2136315_88994660"
                      >
                        <div
                          className="nodeBg-I2136315_88994660 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                          id="id-bg-I2136315_88994660"
                        ></div>
                      </div>
                    </div>
                    <div
                      className="pos-abs bellringing-2136316"
                      id="id-2136316"
                    >
                      <div
                        className="pos-abs vector-I2136316_889942207"
                        id="id-I2136316_889942207"
                      >
                        <div
                          className="nodeBg-I2136316_889942207 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                          id="id-bg-I2136316_889942207"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pos-abs button-2136317" id="id-2136317">
              <div className="pos-abs view-all-paymen-2136318" id="id-2136318">
                <span className="view-all-paymen-2136318-0 ">
                  {"View All Payments"}
                </span>
              </div>
            </div>
          </div>
          <div className="pos-abs guestscard-2136319" id="id-2136319">
            <div className="pos-abs cardheader-2136320" id="id-2136320">
              <div className="pos-abs heading-2136321" id="id-2136321">
                <div
                  className="pos-abs countries-compa-2136324"
                  id="id-2136324"
                >
                  <span className="countries-compa-2136324-0 ">{"Guests"}</span>
                </div>
                <div className="pos-abs whhinfographic-2136322" id="id-2136322">
                  <div className="pos-abs vector-2136323" id="id-2136323">
                    <div
                      className="nodeBg-2136323 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                      id="id-bg-2136323"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pos-abs cardbody-2136325" id="id-2136325">
              <div className="pos-abs frame-106-2136326" id="id-2136326">
                <div className="pos-abs january-221-2136327" id="id-2136327">
                  <span className="january-221-2136327-0 ">
                    {"Total Guests"}
                  </span>
                </div>
                <div className="pos-abs c-548-2136328" id="id-2136328">
                  <span className="c-548-2136328-0 ">{event?.guests.length}</span>
                </div>
              </div>
            </div>            
             <div className="piediv"><PieChart data={data} labels={labels} /></div>
             <button  style={{marginLeft:"3%"}}className="todo-add-button">View Guest</button>
          </div>
        </section>
   
       
        {/* bottom-nav1 */}
        <section className="pos-abs bottomnav-2136372" id="id-2136372">
          <div className="pos-abs opt-2136373" id="id-2136373">
            <div className="pos-abs houseline-2136374" id="id-2136374">
              <div
                className="pos-abs vector-I2136374_127594"
                id="id-I2136374_127594"
              >
                <div
                  className="nodeBg-I2136374_127594 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                  id="id-bg-I2136374_127594"
                ></div>
              </div>
            </div>
            <div className="pos-abs home-2136375" id="id-2136375">
              <span className="home-2136375-0 ">{"Home"}</span>
            </div>
          </div>
          <div className="pos-abs opt-2136376" id="id-2136376">
            <div className="pos-abs aglogo-2136377" id="id-2136377">
              <div
                className="pos-abs div-I2136377_127663"
                id="id-I2136377_127663"
              >
                <span className="div-I2136377_127663-0 ">{"अ"}</span>
              </div>
            </div>
            <div className="pos-abs atithigram-2136378" id="id-2136378">
              <span className="atithigram-2136378-0 ">{"Atithigram"}</span>
            </div>
          </div>
          <div className="pos-abs opt-2136379" id="id-2136379">
            <div className="pos-abs chatscircle-2136380" id="id-2136380">
              <div
                className="pos-abs vector-I2136380_127591"
                id="id-I2136380_127591"
              >
                <div
                  className="nodeBg-I2136380_127591 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                  id="id-bg-I2136380_127591"
                ></div>
              </div>
            </div>
            <div className="pos-abs channels-2136381" id="id-2136381">
              <span className="channels-2136381-0 ">{"Channels"}</span>
            </div>
          </div>
          <div className="pos-abs opt-2136382" id="id-2136382">
            <div className="pos-abs usercircle-2136383" id="id-2136383">
              <div
                className="pos-abs vector-I2136383_127668"
                id="id-I2136383_127668"
              >
                <div
                  className="nodeBg-I2136383_127668 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                  id="id-bg-I2136383_127668"
                ></div>
              </div>
            </div>
            <div className="pos-abs my-profile-2136384" id="id-2136384">
              <span className="my-profile-2136384-0 ">{"My Profile"}</span>
            </div>
          </div>
        </section>
        {/* Home Indicator1 */}
        
      </div>
    </div>
  );
};


export default LandingPageCouple;