// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/api/users/login', { name ,email, password });
//       console.log( name ,email , password);
//       localStorage.setItem('token', res.data.token);
//       navigate('/dashboard');
//     } catch (error) {
//       console.error(error);
//       alert('Login failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
//       <div className="mb-4">
//         <label htmlFor="name" className="block text-gray-700">Name:</label>
//         <input
//           type="name"
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="form-input mt-1 block w-full rounded-md border-gray-300"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="email" className="block text-gray-700">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="form-input mt-1 block w-full rounded-md border-gray-300"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="password" className="block text-gray-700">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="form-input mt-1 block w-full rounded-md border-gray-300"
//         />
//       </div>
//       <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Login</button>
//     </form>
//   );
// };

// export default Login;
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Logo from "../../Assets/logo.png";
import img1 from "../../Assets/bgstudent-1.jpg";
import img2 from "../../Assets/bgstudent-2.jpg";
import img3 from "../../Assets/bgstudent-3.jpeg";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const appendDots = (dots) => (
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: "1",
      }}
    >
      <ul
        style={{
          margin: "0px",
          padding: "0px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {dots}
      </ul>
    </div>
  );

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow(!show);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        handleShowFailureToast("Email or Password is missing");
        return;
      }
      const res = await axios.post("/api/users/login", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      handleShowSuccessToast(res.data.message);
      navigate("/");
    } catch (error) {
      console.error(error);
      handleShowFailureToast(error.res.data.message);
    }
  };

  return (
    <div className="relative flex overflow-hidden  justify-center items-center bg-transparent  h-[100vh]">
      <div className="w-[100%] md:block md:w-[60%]  h-full">
        <Toaster />
        <Slider {...settings} appendDots={appendDots} className=" h-full">
          <div
            className=" h-[100vh] relative"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5))",
              backgroundImage: `url(${img1})`,
            }}
          >
            <img src={img1} alt="" />
            <div className="gradient-overlay"></div>
          </div>
          <div className="h-[100vh] relative">
            <img src={img2} className="w-full h-full" alt="" />
            <div className="gradient-overlay"></div>
          </div>
          <div className="h-[100vh] relative">
            <img src={img3} className="w-full h-full" alt="" />
            <div className="gradient-overlay"></div>
          </div>
        </Slider>
      </div>
      <div className="absolute  md:relative md:h-full  w-[80%] md:w-[40%] lg:[60%]">
        <form
          onSubmit={handleSubmit}
          className="py-6 h-full  rounded-lg shadow-xl shadow-slate-400/50 bg-[#f7f7f7]  flex flex-col justify-center items-center text-black"
          id="signup"
        >
          <div className=" flex flex-col w-[80%] ">
            <div className=" flex flex-col justify-center items-center mb-4">
              <img src={Logo} className="h-[4rem] w-[6rem]" alt="" />
            </div>
            <h1 className="text-center font-bold text-2xl">User Login Portal</h1>
            <div className="mt-4 ">
              <input
                type="name"
                required
                className="border-b outline-none border-gray-300 transition-all duration-300 focus:border-blue-500 focus:border-b-2 bg-transparent p-2 w-full h-full"
                name="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                id="name"
              />
            </div>

            <div className="mt-4 ">
              <input
                type="email"
                required
                className="border-b outline-none border-gray-300 transition-all duration-300 focus:border-blue-500 focus:border-b-2 bg-transparent p-2 w-full h-full"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                id="email"
              />
            </div>

            <div className="relative mt-4 ">
              <input
                type={show ? "password" : "text"}
                placeholder="Password"
                required
                className="border-b outline-none border-gray-300 transition-all duration-300  focus:border-blue-500 focus:border-b-2 bg-transparent p-2 h-full w-full "
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                id="password"
              />
              <div
                className="absolute right-2 bottom-3 cursor-pointer"
                onClick={handleShow}
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <input
              type="submit"
              value={"Login"}
              className="mt-4 bg-black text-white p-2 hover:bg-slate-600 hover:text-black"
            />
            <h3 className="mt-3">
              {" "}
              <a
                to="/"
                className="text-blue-700 hover:underline cursor-pointer"
              >
                Forgot Password ?
              </a>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
