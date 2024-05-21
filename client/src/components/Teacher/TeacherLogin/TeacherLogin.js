import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useForm } from "react-hook-form";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Logo from "../../../Assets/logo.png";
import img1 from "../../../Assets/bgstudent-1.jpg";
import img2 from "../../../Assets/bgstudent-2.jpg";
import img3 from "../../../Assets/bgstudent-3.jpeg";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const TeacherLogin = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const onSubmit = async (data) => {
    try {
      if (!data.email || !data.password) {
        handleShowFailureToast("Email or Password is missing");
        return;
      }
      const response = await axios.post("/api/v1/teacher/login", {
        teacherEmail: data.email,
        teacherPassword: data.password,
      });
      handleShowSuccessToast(response.data.message);
      navigate("/teacher-take-attendance");
    } catch (error) {
      handleShowFailureToast(error.response.data.message);
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
          onSubmit={handleSubmit(onSubmit)}
          className="py-6 h-full  rounded-lg shadow-xl shadow-slate-400/50 bg-[#f7f7f7]  flex flex-col justify-center items-center text-black"
          id="signup"
        >
          <div className=" flex flex-col w-[80%] ">
            <div className=" flex flex-col justify-center items-center mb-4">
              <img src={Logo} className="h-[4rem] w-[6rem]" alt="" />
            </div>
            <h1 className="text-center font-bold text-2xl">Teacher Portal</h1>
            <div className="mt-4 ">
              <input
                type="email"
                className="border-b outline-none border-gray-300 transition-all duration-300 focus:border-blue-500 focus:border-b-2 bg-transparent p-2 w-full h-full"
                name="email"
                placeholder="Email"
                id="email"
                {...control.register("email", {
                  required: "Enter your email* ",
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Invalid email address*",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-700">{errors.email.message}</p>
            )}
            <div className="relative mt-4 ">
              <input
                type={show ? "password" : "text"}
                placeholder="Password"
                className="border-b outline-none border-gray-300 transition-all duration-300  focus:border-blue-500 focus:border-b-2 bg-transparent p-2 h-full w-full "
                name="password"
                autoComplete="new-password"
                id="password"
                {...control.register("password", {
                  required: "Enter password*",
                  minLength: {
                    value: 2,
                    message: "password must be 6 characters long*",
                  },
                  maxLength: {
                    value: "20",
                    message: "pasword must be less then 10 characters*",
                  },
                })}
              />
              <div
                className="absolute right-2 bottom-3 cursor-pointer"
                onClick={handleShow}
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-700">{errors.password.message}</p>
            )}
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

export default TeacherLogin;
