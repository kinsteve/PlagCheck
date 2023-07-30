import React, { useState } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import { Helmet } from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/file.css'
import Header from '../components/Header'

const File = (props) => {
  const [fileName, setFileName] = useState('');

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const handleInputChange = (event) => {
    const files = event.target.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    if (files.length > 0) {
      setFileName(files[0].name);
    } else {
      setFileName('');
    }
  };
  
  return (
    <div className="file-container">
      <Helmet>
        <title>file - Shallow Frequent Swan</title>
        <meta property="og:title" content="file - Shallow Frequent Swan" />
      </Helmet>
      <Header />
      <Player
        src="https://lottie.host/1fed54ea-165b-47a4-af4e-1e88eee9513f/PF9LybMUwY.json"
        loop
        speed="1"
        autoplay
        background="transparent"
        className="file-lottie-node"
      ></Player>
      <div className="file-container2">
      <div
        className="file-drop-area"
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => event.preventDefault()}
        onDrop={handleDrop}
      >
        <input type="file" id="file-input" multiple onChange={handleInputChange} />
        <label htmlFor="file-input" className="file-input-label">
          {/* <i className="fas fa-cloud-upload-alt fa-3x"></i> */}
          <svg viewBox="0 0 1024 1024" className="icon10">
          <path d="M342 640l170-170 170 170-60 62-68-68v176h-84v-176l-68 66zM768 854v-470h-214v-214h-298v684h512zM598 86l256 256v512q0 34-26 59t-60 25h-512q-34 0-60-25t-26-59l2-684q0-34 25-59t59-25h342z"></path>
          </svg>
          <p>Drag and drop files here or click to select files</p>
        </label>
        <p id="file-name">{fileName}</p>
      </div>
      <button
          type="button"
          className='btn'
        >
          SCAN
      </button>
    </div>
    </div>
  )
}

export default File
