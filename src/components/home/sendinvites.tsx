import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const SendInvites = () => {
  const [emailContent, setEmailContent] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSendInvites = async () => {
    if (!emailContent || !file || !image) {
      toast.error("Please provide email content, attach a CSV file, and an image.");
      return;
    }

    const formData = new FormData();
    formData.append("emailContent", emailContent);
    formData.append("file", file);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/send-invites", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Emails sent successfully!");
    } catch (error) {
      toast.error("Failed to send emails.");
    }
  };

  return (
    <>
      <div className="inputtaking" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: '100%', height: "600px", gap: "3%" }}>
        <textarea 
          placeholder="Start Writing Invite" 
          style={{ height: "200px", width: "350px", backgroundColor: "#D3CABE", padding: "10%", color: "#861E27" }}
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
        />
        <div className="ret" style={{ display: "flex", flexDirection: "row" }}>
          <input type="file" accept="image/*" onChange={handleImageChange} style={{ backgroundColor: "#861E27" }} />
          <div className="tooltip" onMouseDown={() => { toast.success("Under Development launching soon") }} onTouchEnd={() => { toast.success("Under Development launching soon") }}>
            <img width="30" height="30" src="https://img.icons8.com/ios/50/861E27/chatgpt.png" alt="chatgpt" />
            <span className="tooltiptext">Write it by ChatGPT</span>
          </div>
        </div>
        <label htmlFor="csvFileInput" style={{ cursor: "pointer", backgroundColor: "#861E27", padding: "10px", borderRadius: "5px", color: "white" }}>
  Select CSV File
  <input id="csvFileInput" type="file" accept=".csv" onChange={handleFileChange} style={{ display: "none" }} />
</label>

        <button onClick={handleSendInvites} style={{ backgroundColor: "#861E27", padding: "2%", borderRadius: "12px", color: "white" }}>Send Invites to Guests via email</button>
      </div>
    </>
  );
};

export default SendInvites;
