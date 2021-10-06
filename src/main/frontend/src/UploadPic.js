import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./App.css";

function UploadPic() {
  const [userProfileId, setUserProfileId] = useState("");
  const [file, setFile] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    console.log(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, isDragAccept } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: "image/jpeg,image.jpg,image/png",
    });

  const dispatchFile = () => {
    if (userProfileId.length < 3 || file === null) {
      alert(
        "id or key should be atleast 3 characters and image should not be empty"
      );
      return;
    }
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
        alert("image uploaded with id " + userProfileId);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <input
        type="text"
        placeholder="id or key"
        onChange={(e) => setUserProfileId(e.target.value)}
      />
      <div {...getRootProps()} className="container">
        <input {...getInputProps()} />
        {isDragActive && isDragAccept ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>
            Drag 'n' drop profile image here, or click to select profile
            image(supported formats : jpeg,jpg,png)
          </p>
        )}
      </div>
      <p>{file?.name}</p>

      <button className="button_a" onClick={dispatchFile}>
        submit
      </button>
    </div>
  );
}

export default UploadPic;
