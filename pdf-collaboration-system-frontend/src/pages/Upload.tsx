import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import { IMAGES } from "../assets/Images";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute, uploadRoute } from "../utils/APIRoutes";
import { Loader } from "../components/Loader";
import { AuthContext } from "../utils/Authorization";

export const UploadPdf = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedLink, setUploadedLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: any) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
  };

  const { token } = useContext(AuthContext);
  console.log(token)
  
  const handleUpload = (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      console.log(token);
      axios
        .post(uploadRoute, formData, {
          headers: {
            authorization: `Bearer ${token}`
          },
        })
        .then((res) => {
          setLoading(false);
            console.log(res);
          setUploadedLink(res.data.fileUrl);
          toast.success("FILE UPLOAD SUCCESSFUL", {
            position: "top-right",
            autoClose: 5000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          toast.error("FILE UPLOAD FAILED", {
            position: "top-right",
            autoClose: 5000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        });
    }
    setLoading(false);
  };

  return (
    <>
        {loading && <Loader/>}
      <FormContainer>
        <form onSubmit={(event) => handleUpload(event)}>
          <div className="theAppName">
            <img src={IMAGES.logoImage} alt="" />
            <h1>PDF Share</h1>
          </div>
          <h1 className="uplaodFile" style={{ color: "white" }}>
            Select a file to share
          </h1>
          <input
            type="file"
            name="files"
            onChange={(e) => handleFileChange(e)}
            accept="pdf/*"
          />
          <button type="submit">Upload</button>
        </form>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ height: '50px', width: '1000px', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Invite Link: {uploadedLink}
      </div>
      </div>

      </FormContainer>
      <ToastContainer />
      
      {loading && <Loader />}
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .theAppName {
    display: flex;
    align-items: center;
    gap: 1 rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    borderradius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #9971f0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
  }
`;
