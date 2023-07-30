import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import '../styles/free-text.css'
import Header from '../components/Header'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const FreeText = (props) => {

  const [editorContent, setEditorContent] = useState('');
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
  ];

  return (
    <div className="free-text-container">
      <Helmet>
        <title>freeText - Shallow Frequent Swan</title>
        <meta property="og:title" content="freeText - Shallow Frequent Swan" />
      </Helmet>
      <Header />
      
      
      <div className="free-text-container2">
       
        <ReactQuill
        value={editorContent}
        onChange={setEditorContent}
        modules={quillModules}
        formats={quillFormats}
        className='quill-area'
        /> 
      
 
        {/* <div className="free-text-container3"> */}
          <button type="button" className="free-text-button button">
            SCAN
          </button>
        {/* </div> */}
      </div> 
      
    </div>
  )
}

export default FreeText
