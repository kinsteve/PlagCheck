import React, { useState,useEffect } from 'react'
import { Helmet } from 'react-helmet'
import '../styles/url.css'
import Header from '../components/Header'
import axios from 'axios';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const Url = (props) => {
  const [url, setUrl] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState('');
  const [access_token , setAccess_token] = useState('');
  
const ngrokURL = "https://e256-2405-201-6810-891b-6daf-74c-499f-4cb7.ngrok-free.app";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim() !== '') {
      setSubmittedUrl(url);
      setUrl('');
    }
  };
  
  const handleScan=async()=>{
    
  }
  
  const handleURLscan=async()=>{
    try {
      console.log(access_token);
      const scanId = uuidv4();
      // const URL=`http://localhost:5000/api/v1/scan/url/` + scanId;
      const URL=`${ngrokURL}/api/v1/scan/url/` + scanId;
      const body={
        url : submittedUrl,
        properties: {
          sandbox: true,
          webhooks:{
              status:`${ngrokURL}/copyleaks/{STATUS}/${scanId}`
              // status:`http://localhost:5000/copyleaks/status/${scanId}`
            }
          }
        }
        const headers={
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${access_token}`,
        }
        const {data}= await axios.put(URL, body, { headers });
        console.log(data);
      } catch (error) {
        console.log("Error in frontend" , error.message);
      }
    }
    
    useEffect(() => {
      
      (async()=>{
        try {
          // const {data} = await axios.post(`http://localhost:5000/api/v1/login`
          const {data} = await axios.post(`${ngrokURL}/api/v1/login`
          ,{
            email: process.env.REACT_APP_EMAIL,
            key:   process.env.REACT_APP_COPYLEAK_API_KEY 
          })
          setAccess_token(data);
        } catch (error) {
          console.log(error.message);
        }
      })();
      
      // Establish a Socket.IO connection
      const socket = io("http://localhost:5000");
      socket.on('scanResult', (data) => {
        console.log('Received scan result:', data.scanResult);
        // setScanResult(data.scanResult); // Update the state with the scan result
      });
  
      // Clean up the socket connection when the component unmounts
      return () => {
        socket.disconnect();
      };
        }, []);
        
        
        return (
    <div className="url-container">
      <Helmet>
        <title>url - Shallow Frequent Swan</title>
        <meta property="og:title" content="url - Shallow Frequent Swan" />
      </Helmet>
      <Header />
      <div className='container2'>
        <img
          src="/3425201_59903.svg"
          alt="image"
          className='bannerImage'
        />
        <div className="container3">
          <h2 className="url-scanner__heading">Enter URL to Scan</h2>
          <form className="url-scanner__form" onSubmit={handleSubmit}>
            <div className="url-scanner__input-wrapper">
              <i className="url-scanner__input-icon fas fa-link"></i>
              <input
                type="text"
                className="url-scanner__input"
                placeholder="https://"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button type="submit" className="url-scanner__button">
                +
              </button>
            </div>
          </form>
          {submittedUrl && (
            <div className="url-scanner__submitted-url">
              <i className="url-scanner__submitted-url-icon fas fa-link"></i>
              <span>{submittedUrl}</span>
            </div>
          )}
          <button
          type="button"
          className='btn'
          onClick={handleURLscan}
          >
          SCAN
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default Url
