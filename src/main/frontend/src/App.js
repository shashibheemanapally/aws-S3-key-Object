import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./App.css";
import UploadPic from "./UploadPic";
import DownloadPic from "./DownloadPic";

function App() {
  return (
    <div className="App">
      <UploadPic />
      <hr />
      <DownloadPic />
    </div>
  );
}

export default App;
