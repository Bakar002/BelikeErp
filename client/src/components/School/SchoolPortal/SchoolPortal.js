import React from "react";
import schoolportallogo from "../../../Assets/schoolportallogo.png";
import AllschoolAssociation from "../../../Assets/association.jpeg";
import "./SchoolPortal.css";
import AssociationImg from "../../../Assets/Img/association.jpeg";
import LahoreImg from "../../../Assets/Img/lhr.png";
import GujranwalaImg from "../../../Assets/Img/grw.png";
import SargodhaImg from "../../../Assets/Img/sgd.png";
import DGKhan from "../../../Assets/Img/dg.png";
import FaisalabadImg from "../../../Assets/Img/fsd.png";
import MultanImg from "../../../Assets/Img/mul.png";
import RawalpindiImg from "../../../Assets/Img/rwp.png";
import Logo from "../../../Assets/Img/logo.png";
import Learning from "../../../Assets/Images/learning.png";
import { NavLink, useNavigate } from "react-router-dom";
export default function SchoolPortal() {
  const navigate = useNavigate();
  const adminPanelNavigator = () => {
    navigate("/admin-dashboard");
  };
  return (
    <div className="container pt-3">
      <div className="text-center d-flex justify-content-center">
        <h1 className="text-center school ">Belike Edu. Software</h1>
        <img
          alt=""
          className="ms-lg-2 logo"
          src={Logo}
          style={{
            height: "70px",
            width: "70px",
          }}
        />
      </div>
      <h3 className="text-center  fw-bold">Our partners School</h3>
      <div className="row flex justify-content-center gap-2 flex-wrap mt-5">
        <div className="bg-white xl:w-2/12 w-6/12 h-40 overflow-hidden flex flex-col justify-center items-center gap-2 cursor-pointer rounded">
          <img src={schoolportallogo} alt="" height={50} />
          <h1 className="text-black text-center">Other Institution</h1>
        </div>
        <div className="xl:w-2/12 w-6/12 h-40 bg-white overflow-hidden flex flex-col justify-center items-center gap-2 cursor-pointer rounded">
          <img
            src={AllschoolAssociation}
            alt=""
            className=" object-contain w-20 h-20"
          />
          <h1 className="text-black text-center">
            All Schools and Academies Association
          </h1>
        </div>
        <div className="container">
          <h3 className="text-center  fw-bold my-4">Admissions</h3>
          <div className="row d-flex justify-content-center">
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
              <a
                className="text-reset text-decoration-none text-center"
                href="school/past-papers/form.html"
              >
                <i className="fa-solid fa-temperature-high text-center fa-2x mt-3" />
              </a>
              <div className="card-body">
                <a
                  className="text-reset text-decoration-none text-center"
                  href="school/past-papers/form.html"
                ></a>
                <h6 className="text-center pt-2">
                  <a
                    className="text-reset text-decoration-none text-center"
                    href="school/past-papers/form.html"
                  />
                  <a
                    className="text-decoration-none text-dark"
                    href="admissions/summer/index.php"
                  >
                    Summer
                  </a>
                </h6>
              </div>
            </div>
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
              <a
                className="text-reset text-decoration-none text-center"
                href="/school/past-papers/form.html"
              >
                <i className="fa-solid fa-atom text-center fa-2x mt-3" />
              </a>
              <div className="card-body">
                <a
                  className="text-reset text-decoration-none text-center"
                  href="/school/past-papers/form.html"
                ></a>
                <h6 className="text-center pt-2">
                  <a
                    className="text-reset text-decoration-none text-center"
                    href="/school/past-papers/form.html"
                  />
                  <a
                    className="text-decoration-none text-dark"
                    href="admissions/index.php"
                  >
                    Annual
                  </a>
                </h6>
              </div>
            </div>
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
              <i className="fa-solid fa-school-flag text-center fa-2x mt-3" />
              <div className="card-body">
                <h6 className="text-center pt-2">
                  <a
                    className="text-decoration-none text-dark"
                    href="admissions/Academy/index.php"
                  >
                    Academy
                  </a>
                </h6>
              </div>
            </div>
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
              <i className="fa-solid fa-microchip text-center fa-2x mt-3" />
              <div className="card-body">
                <h6 className="text-center pt-2">
                  <a
                    className="text-decoration-none text-dark"
                    href="admissions/IT Courses/index.php"
                  >
                    IT Courses
                  </a>
                </h6>
              </div>
            </div>
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
              <i className="fa-solid fa-school text-center fa-2x mt-3" />
              <div className="card-body">
                <h6 className="text-center pt-2">
                  <a
                    className="text-decoration-none text-dark"
                    href="admissions/Home Tuition/index.php"
                  >
                    Home Tuition
                  </a>
                </h6>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-center punjab mt-3">Punjab Boards</h1>
        <div className="container">
          <h3 className="text-center  fw-bold">Board Papers</h3>
          <div className="row d-flex justify-content-center">
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3 flex flex-col gap-4 h-full">
              <a
                className="text-center text-decoration-none"
                href="past-papers/lhr.html"
              >
                <img
                  alt=""
                  className="m-auto mt-3"
                  src={LahoreImg}
                  style={{ width: "40px", height: "40px" }}
                />
              </a>
              <div className="card-body">
                <h6 className="text-center pt-2">
                  <a className="text-decoration-none" href="img/paper1.jpeg">
                    Lahore
                  </a>
                </h6>
              </div>
            </div>
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3 flex flex-col gap-4 h-full">
              <img
                alt="GujranwalaImg"
                className="m-auto mt-3"
                src={GujranwalaImg}
                style={{ width: "40px", height: "40px" }}
              />
              <div className="card-body">
                <h6 className="text-center pt-2">
                  <a className="text-decoration-none" href="img/paper1.jpeg">
                    Gujranwala
                  </a>
                </h6>
              </div>
            </div>
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3 flex flex-col gap-4 h-full">
              <img
                alt="SargodhaImg"
                className="m-auto mt-3"
                src={SargodhaImg}
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
              <div className="card-body">
                <h6 className="text-center pt-2">Sargodha</h6>
              </div>
            </div>
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3 flex flex-col gap-4 h-full">
              <img
                alt="DGKhanImg"
                className="m-auto mt-3"
                src={DGKhan}
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
              <div className="card-body">
                <h6 className="text-center pt-2">DG Khan</h6>
              </div>
            </div>
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3 flex flex-col gap-4 h-full">
              <img
                alt="FaisalabadImg"
                className="m-auto mt-3"
                src={FaisalabadImg}
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
              <div className="card-body">
                <h6 className="text-center pt-2">Faisalabad</h6>
              </div>
            </div>
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3 flex flex-col gap-4 h-full">
              <img
                alt="MultanImg"
                className="m-auto mt-3"
                src={MultanImg}
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
              <div className="card-body">
                <h6 className="text-center pt-2">Multan</h6>
              </div>
            </div>
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3 flex flex-col gap-4 h-full">
              <img
                alt="RawalpindiImg"
                className="m-auto mt-3"
                src={RawalpindiImg}
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
              <div className="card-body">
                <h6 className="text-center pt-2">Rawalpindi</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <h3 className="text-center fw-bold my-4">Syllabus Grade 1 to 10</h3>
          <div className="row d-flex justify-content-center">
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
              <i className="fa-solid fa-1 text-center fa-2x mt-3" />
              <a className="text-decoration-none" href="/school/grade-one">
                <div className="card-body">
                  <h6 className="text-center pt-2">Get books</h6>
                </div>
              </a>
            </div>
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
              <i className="fa-solid fa-2 text-center fa-2x mt-3" />
              <a className="text-decoration-none" href="/school/grade-two">
                <div className="card-body">
                  <h6 className="text-center pt-2">Get books</h6>
                </div>
              </a>
            </div>
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
              <i className="fa-solid fa-3 text-center fa-2x mt-3" />
              <a className="text-decoration-none" href="/school/grade-three">
                <div className="card-body">
                  <h6 className="text-center pt-2">Get books</h6>
                </div>
              </a>
            </div>
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
              <i className="fa-solid fa-4 text-center fa-2x mt-3" />
              <a className="text-decoration-none" href="/school/grade-four">
                <div className="card-body">
                  <h6 className="text-center pt-2">Get books</h6>
                </div>
              </a>
            </div>
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
              <i className="fa-solid fa-5 text-center fa-2x mt-3" />
              <a className="text-decoration-none" href="/school/grade-five">
                <div className="card-body">
                  <h6 className="text-center pt-2">Get books</h6>
                </div>
              </a>
            </div>
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
              <i className="fa-solid fa-6 text-center fa-2x mt-3" />
              <a className="text-decoration-none" href="/school/grade-six">
                <div className="card-body">
                  <h6 className="text-center pt-2">Get books</h6>
                </div>
              </a>
            </div>
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
              <i className="fa-solid fa-7 text-center fa-2x mt-3" />
              <a className="text-decoration-none" href="/school/grade-seven">
                <div className="card-body">
                  <h6 className="text-center pt-2">Get books</h6>
                </div>
              </a>
            </div>
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
              <i className="fa-solid fa-8 text-center fa-2x mt-3" />
              <a className="text-decoration-none" href="/school/grade-eight">
                <div className="card-body">
                  <h6 className="text-center pt-2">Get books</h6>
                </div>
              </a>
            </div>
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
              <i className="fa-solid fa-9 text-center fa-2x mt-3" />
              <a className="text-decoration-none" href="/school/grade-nine">
                <div className="card-body">
                  <h6 className="text-center pt-2">Get books</h6>
                </div>
              </a>
            </div>
            <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
              <div className="d-flex justify-content-center">
                <i className="fa-solid fa-1 text-center fa-2x mt-3" />
                <i className="fa-solid fa-0 text-center fa-2x mt-3" />
              </div>
              <a className="text-decoration-none" href="/school/grade-ten">
                <div className="card-body">
                  <h6 className="text-center pt-2">Get books</h6>
                </div>
              </a>
            </div>
            <div className="container">
              <h3 className="text-center fw-bold mt-3">Students</h3>
              <div className="row d-flex justify-content-center">
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <NavLink
                    className="text-center text-decoration-none text-reset"
                    to={"/student-time-table"}
                  >
                    <i className="fa-solid fa-clock text-center fa-2x mt-3" />
                  </NavLink>
                  <div className="card-body">
                    <NavLink
                      className="text-center text-decoration-none text-reset"
                      to={"/student-time-table"}
                    >
                      <h6 className="text-center pt-2">Time Table</h6>
                    </NavLink>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <NavLink
                    className="text-center text-decoration-none text-reset"
                    to={"/student-attendance"}
                  >
                    <i className="fa-solid fa-chalkboard-user text-center fa-2x mt-3" />
                  </NavLink>
                  <div className="card-body">
                    <NavLink
                      className="text-center text-decoration-none text-reset"
                      to={"/student-attendance"}
                    >
                      <h6 className="text-center pt-2">Attendance</h6>
                    </NavLink>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <NavLink
                    className="text-center text-decoration-none text-reset"
                    to={"/student-weekly-attendance"}
                  >
                    <i className="fa-solid fa-calendar-week text-center fa-2x mt-3" />
                  </NavLink>
                  <div className="card-body">
                    <NavLink
                      className="text-center text-decoration-none text-reset"
                      to={"/student-weekly-attendance"}
                    >
                      <h6 className="text-center pt-2">Weekly</h6>
                    </NavLink>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <NavLink
                    className="text-center text-decoration-none text-reset"
                    to={"/student-monthly-attendance"}
                  >
                    <i className="fa-solid fa-calendar-days text-center fa-2x mt-3" />
                  </NavLink>
                  <div className="card-body">
                    <NavLink
                      className="text-center text-decoration-none text-reset"
                      to={"/student-monthly-attendance"}
                    >
                      <h6 className="text-center pt-2">Monthly</h6>
                    </NavLink>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <NavLink
                    className="text-center text-decoration-none text-reset"
                    to={"/student-yearly-attendance"}
                  >
                    <i className="fa-solid fa-calendar-check text-center fa-2x mt-3" />
                  </NavLink>
                  <div className="card-body">
                    <NavLink
                      className="text-center text-decoration-none text-reset"
                      to={"/student-yearly-attendance"}
                    >
                      <h6 className="text-center pt-2">Annual</h6>
                    </NavLink>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3 flex flex-col justify-center items-center">
                  <a
                    className="text-center text-decoration-none text-reset"
                    href="lms.html"
                  >
                    <img
                      alt="learning"
                      className="mt-3 bg-[#40b08c]"
                      src={Learning}
                      style={{ height: "40px" }}
                    />
                  </a>
                  <div className="card-body">
                    <a
                      className="text-center text-decoration-none text-reset"
                      href="lms.html"
                    >
                      <h6 className="text-center pt-2">
                        Learning Management System
                      </h6>
                    </a>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <i className="fa-solid fa-handshake-simple text-center fa-2x mt-3" />
                  <div className="card-body">
                    <h6 className="text-center pt-2">Meeting</h6>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <i className="fa-solid fa-comments text-center fa-2x mt-3" />
                  <div className="card-body">
                    <h6 className="text-center pt-2">
                      <NavLink
                        className="text-decoration-none text-dark"
                        to={"/student-add-feedback"}
                      >
                        Add Feedback
                      </NavLink>
                    </h6>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <NavLink
                    to={"/student-result"}
                    className={"flex justify-center flex-col items-center"}
                  >
                    <i className="fa-solid fa-chart-bar text-center fa-2x mt-3" />
                    <div className="card-body">
                      <h6 className="text-center pt-2">View Result</h6>
                    </div>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="container">
              <h3 className="text-center fw-bold mt-3">Teachers</h3>
              <div className="row d-flex justify-content-center">
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <NavLink
                    className="text-center text-decoration-none text-reset"
                    to={"/teacher-time-table"}
                  >
                    <i className="fa-solid fa-clock text-center fa-2x mt-3" />
                  </NavLink>
                  <div className="card-body">
                    <NavLink
                      className="text-center text-decoration-none text-reset"
                      href="past-papers/timetable.html"
                    >
                      <h6 className="text-center pt-2">Time Table</h6>
                    </NavLink>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <NavLink
                    className="text-center text-decoration-none text-reset"
                    to={"/teacher-take-attendance"}
                  >
                    <i className="fa-solid fa-chalkboard-user text-center fa-2x mt-3" />
                  </NavLink>
                  <div className="card-body">
                    <NavLink
                      className="text-center text-decoration-none text-reset"
                      to={"/teacher-take-attendance"}
                    >
                      <h6 className="text-center pt-2">Take Attendance</h6>
                    </NavLink>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <NavLink
                    className="text-center text-decoration-none text-reset"
                    to={"/teacher-view-attendance"}
                  >
                    <i className="fa-solid fa-chalkboard-user text-center fa-2x mt-3" />
                  </NavLink>
                  <div className="card-body">
                    <NavLink
                      className="text-center text-decoration-none text-reset"
                      to={"/teacher-view-attendance"}
                    >
                      <h6 className="text-center pt-2">View Attendance</h6>
                    </NavLink>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <NavLink
                    className="text-center text-decoration-none text-reset"
                    to={"/teacher-weekly-attendance"}
                  >
                    <i className="fa-solid fa-calendar-week text-center fa-2x mt-3" />
                  </NavLink>
                  <div className="card-body">
                    <NavLink
                      className="text-center text-decoration-none text-reset"
                      to={"/teacher-weekly-attendance"}
                    >
                      <h6 className="text-center pt-2">Weekly</h6>
                    </NavLink>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <NavLink
                    className="text-center text-decoration-none text-reset"
                    to={"/teacher-monthly-attendance"}
                  >
                    <i className="fa-solid fa-calendar-days text-center fa-2x mt-3" />
                  </NavLink>
                  <div className="card-body">
                    <NavLink
                      className="text-center text-decoration-none text-reset"
                      to={"/teacher-monthly-attendance"}
                    >
                      <h6 className="text-center pt-2">Monthly</h6>
                    </NavLink>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <NavLink
                    className="text-center text-decoration-none text-reset"
                    to={"/teacher-yearly-attendance"}
                  >
                    <i className="fa-solid fa-calendar-check text-center fa-2x mt-3" />
                  </NavLink>
                  <div className="card-body">
                    <NavLink
                      className="text-center text-decoration-none text-reset"
                      to={"/teacher-yearly-attendance"}
                    >
                      <h6 className="text-center pt-2">Annual</h6>
                    </NavLink>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3 flex flex-col justify-center items-center">
                  <a
                    className="text-center text-decoration-none text-reset"
                    href="lms.html"
                  >
                    <img
                      alt="learning"
                      className="mt-3 bg-[#40b08c]"
                      src={Learning}
                      style={{ height: "40px" }}
                    />
                  </a>
                  <div className="card-body">
                    <a
                      className="text-center text-decoration-none text-reset"
                      href="lms.html"
                    >
                      <h6 className="text-center pt-2">
                        Learning Management System
                      </h6>
                    </a>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <i className="fa-solid fa-handshake-simple text-center fa-2x mt-3" />
                  <div className="card-body">
                    <h6 className="text-center pt-2">Meeting</h6>
                  </div>
                </div>
                {/* <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <i className="fa-solid fa-comments text-center fa-2x mt-3" />
                  <div className="card-body">
                    <h6 className="text-center pt-2">
                      <a
                        className="text-decoration-none text-dark"
                        href="feedback.html"
                      >
                        Feedback
                      </a>
                    </h6>
                  </div>
                </div> */}
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <NavLink
                    to={"/teacher-add-result"}
                    className={"flex justify-center flex-col items-center"}
                  >
                    <i className="fa-solid fa-chart-bar text-center fa-2x mt-3" />
                    <div className="card-body">
                      <h6 className="text-center pt-2">Add Result</h6>
                    </div>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="container">
              <h3 className="text-center fw-bold mt-3">Administration</h3>
              <div className="row d-flex justify-content-center">
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <i className="fa-solid fa-file-invoice text-center fa-2x mt-3" />
                  <div className="card-body">
                    <h6 className="text-center pt-2">
                      <a
                        className="text-decoration-none text-dark"
                        href="accounts.html"
                      >
                        Accounts
                      </a>
                    </h6>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <i className="fa-solid fa-user-tie text-center fa-2x mt-3" />
                  <div className="card-body">
                    <h6 className="text-center pt-2">
                      <a
                        className="text-decoration-none text-dark"
                        href="past-papers/attendance.html"
                      >
                        Employment{" "}
                      </a>
                    </h6>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <i className="fa-solid fa-money-bill-1-wave text-center fa-2x mt-3" />
                  <div className="card-body">
                    <h6 className="text-center pt-2">Salary</h6>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <i className="fa-solid fa-file-invoice-dollar text-center fa-2x mt-3" />
                  <div className="card-body">
                    <h6 className="text-center pt-2">Fee Schedule</h6>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <i className="fa-solid fa-calendar-check text-center fa-2x mt-3" />
                  <div className="card-body">
                    <h6 className="text-center pt-2">Reminder</h6>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <i className="fa-solid fa-comments text-center fa-2x mt-3" />
                  <div className="card-body">
                    <h6 className="text-center pt-2">
                      <NavLink
                        className="text-decoration-none text-dark"
                        to="/admin-feedback"
                      >
                        Feedback
                      </NavLink>
                    </h6>
                  </div>
                </div>
                <div
                  className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3 cursor-pointer"
                  onClick={adminPanelNavigator}
                >
                  <i className="fa-solid fa-user-tie text-center fa-2x mt-3" />
                  <div className="card-body">
                    <h6 className="text-center pt-2">Admin Panel</h6>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <i className="fa-regular fa-handshake text-center fa-2x mt-3" />
                  <div className="card-body">
                    <h6 className="text-center pt-2">Teacher's Meeting</h6>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <i className="fa-solid fa-handshake text-center fa-2x mt-3" />
                  <div className="card-body">
                    <h6 className="text-center pt-2">
                      <a
                        className="text-decoration-none text-dark"
                        href="p.meeting.html"
                      >
                        Parent's Meeting
                      </a>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <h3 className="text-center fw-bold mt-3">School Store</h3>
              <div className="row d-flex justify-content-center">
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <i className="fa-solid fa-shirt text-center fa-2x mt-3" />
                  <div className="card-body">
                    <h6 className="text-center pt-2">Uniform</h6>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <a
                    className="text-center text-decoration-none text-reset"
                    href="/school/past-papers/attendance.html"
                  >
                    <i className="fa-solid fa-book text-center fa-2x mt-3" />
                  </a>
                  <div className="card-body">
                    <a
                      className="text-center text-decoration-none text-reset"
                      href="/school/past-papers/attendance.html"
                    >
                      <h6 className="text-center pt-2">Books</h6>
                    </a>
                  </div>
                </div>
                <div className="card col-6 col-sm-6 col-md-4 col-lg-2 ms-2 mt-3">
                  <i className="fa-solid fa-pen-ruler text-center fa-2x mt-3" />
                  <div className="card-body">
                    <h6 className="text-center pt-2">Stationary</h6>
                  </div>
                </div>
              </div>
            </div>
            <section>
              <div
                className="ccw_plugin chatbot"
                style={{
                  bottom: "20px",
                  right: "20px",
                }}
              >
                <div className="style4 animated no-animation ccw-no-hover-an">
                  <a
                    className="nofocus"
                    href="https://api.whatsapp.com/send?phone=+923475800705&text=Hi, I’m reaching out through Belike!"
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                    }}
                  >
                    <div
                      className="chip style-4 ccw-analytics"
                      data-ccw="style-4"
                      id="style-4"
                      style={{
                        backgroundColor: "#25D366",
                        borderRadius: "100%",
                        color: "white !important",
                        fontSize: "20px",
                        padding: "18px 20px 15px 20px",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <i
                        aria-hidden="true"
                        className="fa fa-whatsapp"
                        style={{
                          fontSize: "36px",
                        }}
                      />
                    </div>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
