import React, { useState } from "react";
import "./App.css";
import "./UploadPic";
import imagePlaceHolder from "./images/profile_placeholder.jpg";

function DownloadPic() {
  const [userProfileId, setUserProfileId] = useState("");
  const [fileSource, setFileSource] = useState("");

  const getFile = () => {
    if (userProfileId.length < 3) {
      alert("id or key should be atleast 3 charecters");
      return;
    }

    setFileSource(
      `http://localhost:8080/api/v1/user-profile/${userProfileId}/image/download`
    );
  };
  return (
    <div>
      <input
        type="text"
        placeholder="id or key"
        onChange={(e) => setUserProfileId(e.target.value)}
      />
      <br />
      <button className="button_a" onClick={getFile}>
        Get Picture
      </button>
      <div>
        <img src={fileSource} alt="Type id or Key and click GET" />
      </div>
    </div>
  );
}

export default DownloadPic;
