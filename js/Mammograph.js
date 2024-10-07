import React, { useState } from 'react';
import { useDropzone } from "react-dropzone";
import upload from "./upload .png";
import { useNavigate } from 'react-router-dom';

export default function Mammograph() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    const validFiles = acceptedFiles.filter(file => {
      const validMimeTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validMimeTypes.includes(file.type)) {
        console.error(`Skipped "${file.name}" because it is not a valid MIME type.`);
        return false;
      }
      const validExtensions = ["jpeg", "jpg", "png", "gif"];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (!validExtensions.includes(fileExtension)) {
        console.error(`Skipped "${file.name}" because an invalid file extension was provided.`);
        return false;
      }
      return true;
    });
    setFiles(validFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/gif",
    multiple: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting files:", files);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });

    try {
      const response = await fetch('https://724b-196-150-237-3.ngrok-free.app/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response data:", data);

      if (data.prediction !== undefined) {
        if (data.prediction === 0) {
          navigate('/Negative');
        } 
        else if(data.prediction === 1) {
          navigate('/Positive');
        }
      else {
        window.alert('Un expected format');
      }
    }
    } catch (error) {
      console.error('Error while submitting files:', error);
    }
  };

  return (
    <form className="modelPage" onSubmit={handleSubmit}>
      <h2>Mammograph Analysis</h2>
      <div {...getRootProps()} className={`drag ${isDragActive ? "active" : ""}`}>
        <input {...getInputProps()} />
        <div className="modelPageContent">
          {isDragActive ? (
            <p>Drop the images here...</p>
          ) : (
            <div>
              {files.length === 0 && <img className="upload_img" src={upload} alt="upload" />}
              <p>
                Drag and Drop images or Browse
                <br />
              </p>
            </div>
          )}
          <p style={{ fontSize: "15px" }}>Supported formats: JPEG, PNG, JPG, GIF</p>
        </div>
        <div className="dropped-images">
          {files.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Uploaded Image ${index + 1}`}
              style={{ width: "400px", height: "190px", marginTop: "-80px", marginLeft: "30px" }}
            />
          ))}
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
