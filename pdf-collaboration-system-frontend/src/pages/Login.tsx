import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import { IMAGES } from "../assets/Images";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute, registerRoute } from "../utils/APIRoutes";
import { AuthContext } from "../utils/Authorization";
import { Loader } from "../components/Loader";

export const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  
 const { setToken } = useContext(AuthContext);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const isVerified = handleValidation();
    if (isVerified) {
      await axios
        .post(loginRoute, {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          console.log(res.data)
          if (res.data!= null) {
           setToken(res.data.access_token);
            setLoading(false);
              toast.success("LOGIN SUCCESSFUL", {
              position: "top-right",
              autoClose: 5000,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            });
            navigate("/upload");
          } else {
            setLoading(false);
            toast.error("LOGIN FAILED, INVALID CREDENTIALS", {
              position: "top-right",
              autoClose: 5000,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error("LOGIN FAILED, INVALID CREDENTIALS", {
            position: "top-right",
            autoClose: 5000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        });
    }
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { email, password } = values;
    if (email === "") {
      setLoading(false);
      toast.error("Email cannot be empty", toastOptions as Object);
      return false;
    } else if (password.length < 5) {
      setLoading(false);
      toast.error(
        "password should be atleast 5 characters long",
        toastOptions as Object
      );
      return false;
    }
    return true;
  };

  const handleChange = (event: any) => {
    setValues({ ...values, [event?.target.name]: event?.target.value });
  };

  return (
    <>
    {loading && <Loader/>}
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="chatAppName">
            <img src={IMAGES.logoImage} alt="" />
            <h1>PDF Share</h1>
          </div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            New here? <Link to="/register">Register Now</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
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
  .chatAppName {
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
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;
