import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./App.css";

function UserProfiles() {
  const [userProfiles, setUserProfiles] = useState([]);
  const fetchUserProfiles = () => {
    axios.get("http://localhost:8080/api/v1/user-profile").then((result) => {
      console.log(result);
      setUserProfiles(result.data);
    });
  };
  useEffect(fetchUserProfiles, []);
  return userProfiles.map((userProfile, index) => {
    return (
      <div key={index}>
        <Dropzone {...userProfile} />
        {userProfile.userProfileId ? (
          <img
            src={`http://localhost:8080/api/v1/user-profile/${userProfile.userProfileId}/image/download`}
          />
        ) : null}
        <h1>{userProfile.username}</h1>
        <p>{userProfile.userProfileId}</p>
      </div>
    );
  });
}

function Dropzone({ userProfileId }) {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(
        `http://localhost:8080/api/v1/user-profile/${userProfileId}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart-form-data",
          },
        }
      )
      .then(() => {
        console.log("image uploaded");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here ...</p>
      ) : (
        <p>
          Drag 'n' drop profile image here, or click to select profile image
        </p>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <UserProfiles />
    </div>
  );
}

export default App;
