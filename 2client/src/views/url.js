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
  const [scanStatus, setScanStatus] = useState('');
  const [isLoading , setisLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [scanId , setScanId] = useState('');
  
const ngrokURL = "https://ed5e-2409-40d2-3-cf96-5a6-9a74-a160-e09.ngrok-free.app";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidURL(url)) {
      setSubmittedUrl(url);
      setUrl('');
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid URL format. Please enter a valid URL.👎');
    }
    setScanStatus('');
  };

  const isValidURL = (url) => {
    const urlPattern =  /^(https?:\/\/[\w.-]{1,256}\.[a-zA-Z]{2,})/;
    return urlPattern.test(url);
  };
  
  const handleURLscan=async()=>{
    try {
      setisLoading(true);
      console.log(access_token);
      const id= uuidv4()
      setScanId(id);
      // const URL=`http://localhost:5000/api/v1/scan/url/` + scanId;
      console.log(id);
      const URL=`${ngrokURL}/api/v1/scan/url/` + id;
      const body={
        url : submittedUrl,
        properties: {
          sandbox: true,
          pdf:{
             create:true,
             title: 'ScanReport'
          },
          webhooks:{
              status:`${ngrokURL}/copyleaks/{STATUS}/${id}`
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
    
    const generatePdfReport=async()=>{
        try {
          const exportId = uuidv4();
          const body = {
            pdfReport: {
              verb: 'POST',
               headers: [['Authorization', `Bearer ${access_token}`]],
              endpoint: `${ngrokURL}/api/v1/export/export-id/pdf-report`, // Replace with actual endpoint
            },
            completionWebhook: `${ngrokURL}/api/v1/export/export-id/completed`, // Replace with actual endpoint
            maxRetries: 3,
          }
          const headers={
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
          }
          const response = await axios.post(`${ngrokURL}/api/v1/export/${scanId}/${exportId}`,body,{headers});
           console.log(response);
        } catch (error) {
           console.log("Problem in pdf frontend:",error)
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
      
      //Establish a Socket.IO connection
      const socket = io("http://localhost:5000");
      socket.on('scanResult', (data) => {
        console.log('Received scan result:', data.scanResult);
        setScanStatus(data.status)
        setisLoading(false);
        if(data.status==='error')
           setErrorMessage("URL doesn't exit . Try Again🥲")
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
        <title>PlagCheck_URL_Scan</title>
        <meta property="og:title" content="PlagCheck_URL_Scan" />
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
              <span>
                {submittedUrl.length > 50
                  ? submittedUrl.slice(0, 50) + "..."
                  : submittedUrl}
              </span>
            </div>
          )}
          <button
          type="button"
          className='btn'
          onClick={handleURLscan}
          disabled={submittedUrl==='' || scanStatus==='completed' }
          >
          {isLoading ? <div className="loader" /> : 'Scan'}
          </button>
          {scanStatus === 'completed' && (
            <div>
              <button
                type="button"
                className='pdfGenBtn'
                onClick={generatePdfReport}
              >
                Generate PDF Report
              </button>
            </div>
          )}
           {errorMessage && <p className="url-scanner__error">{errorMessage}</p>}
        </div>
      </div>
    </div>
  )
}

export default Url
