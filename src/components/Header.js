import react, { useContext, useEffect, useState } from "react";
import OpaseProfile from "../images/user.png";
import OpaseLogo from "../images/opase logo.svg";
import { Dropdown, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import { toast } from "react-toastify";
import { getTokenFirebase, onMessageListener } from "../firebase";

export default function Header(params) {
  const [userName, setUserName] = useState("");
  const [logoutshow, setLogoutShow] = useState(false);
  const [notification, setNotification] = useState();
  const [notificationData, setNotificationData] = useState();
  const [login, setLogin] = useState(false);

  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    getNotification();
    getAllIProfile();
    if (localStorage.getItem("user_email")) {
      setUserName(localStorage.getItem("user_email").split("@")[0]);
      setLogin(true);
    }
  }, []);

  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        setNotification({ title: payload.notification.title, body: payload.notification.body });
        if (document.getElementById("notification")) {
          document.getElementById("dropdown-autoclose-true")?.click();
          setTimeout(() => {
            document.getElementById("dropdown-autoclose-true")?.click();
          }, 3000);
        }
      })
      .catch((err) => console.log("failed: ", err));
  }, [notification]);

  const addmainclassName = () => {
    document.getElementById("root").classList.toggle("dash-main-class-add");
  };

  const openUserinfo = () => {
    document.getElementById("user-detail").classList.toggle("active-user-info");
  };

  const openSearchinfo = () => {
    document.getElementById("search-detail").classList.toggle("active");
  };

  const getAllIProfile = () => {
    const getAllProfileData = new Promise((resolve) => {
      resolve(PostApi(API_Path.GetAllProfile));
    });
    getAllProfileData.then((res) => {
      if (res.status === 200) {
        setUser(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const getNotification = () => {
    const getNotification = new Promise((resolve) => {
      resolve(PostApi(API_Path.getNotification));
    });
    getNotification.then((res) => {
      if (res.status === 200) {
        setNotificationData(res.data.data.notif);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("opus_token");
    setUser("");
    navigate("/login");
  };

  return (
    <>
      <header className="header-top-section">
        <nav className="navbar fixed-top">
          <ul className="d-flex align-items-senter me-auto hdr-top-box-inr">
            <li>
              <div className="hdr-logo-top d-xl-none ms-xl-0 ms-4 text-xl-center d-flex align-items-center ps-3">
                <Link to="/dashboard">
                  <img src={OpaseLogo} alt="Opase" />
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 219.98 79.09">
                    <defs></defs>
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="Layer_1-2" data-name="Layer 1">
                        <path class="cls-1" d="M36.84,0a36.84,36.84,0,0,0-6.3,73.14V58.69h-4V54a19.53,19.53,0,0,1-9.37-16.29A11.19,11.19,0,0,1,29.09,26.39c13.93.59,27.05-2.24,27.05,11A19.44,19.44,0,0,1,46.81,54v4.72h-4V73.2A36.84,36.84,0,0,0,36.84,0ZM40.5,22H31.93a3.1,3.1,0,0,1-2.61-4.79l1.9-3a5.94,5.94,0,0,1,10,0l1.91,3A3.11,3.11,0,0,1,40.5,22Z" />
                        <path fill="none" class="cls-2" d="M40.5,22H31.93a3.1,3.1,0,0,1-2.61-4.79l1.9-3a5.94,5.94,0,0,1,10,0l1.91,3A3.11,3.11,0,0,1,40.5,22Z" />
                        <path class="cls-1" d="M96.81,40.4c0-.31,0-.61,0-.92a66.89,66.89,0,0,1,1.09-9,29.06,29.06,0,0,1,2.16-7.93c1-2.11,2.48-3.94,4.92-4.28a5.51,5.51,0,0,1,2.14.07,17.1,17.1,0,0,0,2.19.85c1.11.15,2.28-.27,3.44-.18a10.17,10.17,0,0,1,3.12.75c7.32,3,9.51,11.91,9.56,19.05a68.68,68.68,0,0,1-.77,9.83c-.47,3.45-.87,7.05-2.49,10.18-2.91,5.61-10,7.65-15.64,5.1a13.59,13.59,0,0,1-6.9-6.77,35.31,35.31,0,0,1-2.24-8.84A52.1,52.1,0,0,1,96.81,40.4Zm20.66-1.64c0-5.39-.9-14.07-7.53-14.95a1.59,1.59,0,0,0-1.19.25c-.84.68-1,2.3-1.27,3.28-.33,1.34-.6,2.7-.83,4.06-1.23,7.33-1.68,15.07.48,22.28A12.81,12.81,0,0,0,109.27,58c.85,1,2.45,2,3.74,1.11s1.69-2.36,2.12-3.65c.84-2.51,1-5.11,1.4-7.69a55.55,55.55,0,0,0,.93-8.63C117.47,39,117.47,38.89,117.47,38.76Z" />
                        <path class="cls-1" d="M133.42,79a5.57,5.57,0,0,1-1.29-.42,3.46,3.46,0,0,1-1.55-1.89,6.38,6.38,0,0,1-.29-1c-.75-3.51-1.33-7.06-1.83-10.61A81.1,81.1,0,0,1,127.78,48c.19-2.67,0-5.36.09-8,.09-2.39.36-4.78.54-7.17.07-.91.54-1.46,1.46-1.43a16,16,0,0,1,4.63.44c1.07.38,1.82,1.65,2.82,2.63a2.82,2.82,0,0,0,.58-.35c2.62-2.09,5.66-2.18,8.76-1.78a5.55,5.55,0,0,1,3.79,2.45,7.79,7.79,0,0,1,1.07,2.3,12,12,0,0,1,.3,3.15c0,2.3,0,4.59-.19,6.88-.08,1.14-.21,2.27-.39,3.4-.08.55-.18,1.09-.31,1.63-.06.27-.13.55-.21.82l-.12.4a1.38,1.38,0,0,0-.13.39c-.1.31-.22.61-.34.91l-.2.45c-.05.11-.21.33-.21.44a11.92,11.92,0,0,1-3.34,4.12,4.48,4.48,0,0,1-2.55,1.19,10.21,10.21,0,0,1-2-.46,10.09,10.09,0,0,1-2-.45,4.73,4.73,0,0,1-1.26-.8,8.52,8.52,0,0,1-1.7-2.33l-.14-.25a.29.29,0,0,1,0-.13c0-.37,1.77-.41,2.06-.45a3.45,3.45,0,0,0,2.27-1.22,12.46,12.46,0,0,0,2.24-5.84,37.21,37.21,0,0,0,.47-4.2c.08-1.15.13-2.31.16-3.47s.11-2.19.05-3.27a4.1,4.1,0,0,0-.21-1.15.91.91,0,0,0-.33-.46.73.73,0,0,0-.5-.09c-1.56.1-2.44,1.54-3.28,2.66a30,30,0,0,1-2.29,2.62,4.63,4.63,0,0,0-1,1.35A4.64,4.64,0,0,0,136,44.4q-.15,3.52-.24,7c-.06,2.32-.12,4.64-.12,7,0,1.36,0,2.73.15,4.09.33,4.24,1,8.47,1.63,12.69a4.56,4.56,0,0,1,0,2.43c-.58,1.28-2.12,1.59-3.39,1.47Q133.74,79,133.42,79Z" />
                        <path class="cls-1" d="M219.89,38.64c0,.13,0,.24-.08.36a6.15,6.15,0,0,1-2.67,3.84A14.54,14.54,0,0,1,213,44.4,2.56,2.56,0,0,0,211,46.31c-.82,3.39-1.74,6.77-1.07,10.37a4.44,4.44,0,0,0,3.1,3.59c.47.18,1.23-.23,1.78-.52,1.61-.84,2.71-.49,3.34,1.13a1.81,1.81,0,0,1-.59,2.31,8,8,0,0,1-5.73,1.73,9,9,0,0,1-6.86-4.71c-2.58-4.3-2.73-9.06-2-14a31.79,31.79,0,0,1,4.09-11.13c1.41-2.46,3.35-4,6.32-4a5.48,5.48,0,0,1,2,.52A10,10,0,0,1,217.53,33a3.69,3.69,0,0,1,.92,1c.33.56.5,1.2.84,1.76a6.53,6.53,0,0,1,.45.82A3.51,3.51,0,0,1,219.89,38.64Zm-3.84-1.25c-.07,0-.39-.33-.73-.65a1,1,0,0,0-1.55.21L213.08,38a1,1,0,0,0,.16,1.28c.41.38.87.82.93.86Z" />
                        <path class="cls-1" d="M107.45,2l2.81,1.05c2.72,1.06,2.95,3.82,4,6,.47.94.84,1.93,1.3,2.88.55,1.11,1,2.24.06,3.33a3.27,3.27,0,0,1-3.87.43,7.47,7.47,0,0,1-2.56-2.43c-1.49-2.67-2.72-5.48-4.07-8.22-.64-1.3-.45-2.31.85-3Z" />
                        <path class="cls-1" d="M168.63,42.65c-.13-1.37-.18-2.7-.41-4-.17-1-.91-1.31-1.85-.86-.77.38-1.5.83-2.24,1.25a4.14,4.14,0,0,1-4.62-.17,8.1,8.1,0,0,1-1.29-1.13c-1.55-1.6-1.32-3.48.75-4.45,2.31-1.1,4.72-2.18,7.39-1.7,4.54.83,8.06,3.62,9.25,7.57,1.33,4.44,1,8.91.2,13.38q-.76,4.08-1.47,8.17c-.42,2.38-1.22,3.09-3.61,3.15a3.88,3.88,0,0,0-1.41.15c-4.47,2-8.32.65-11.81-2.28a9.79,9.79,0,0,1-3.1-6.64c-.53-4.48,1.47-7.78,4.78-10.74C162,41.82,165.07,42.39,168.63,42.65ZM168.16,48l-.37-.4c-.75.44-1.53.84-2.25,1.31a8.64,8.64,0,0,0-1.3,1.12c-1.87,2-3.61,4-3,7a2.7,2.7,0,0,0,2.3,2.23c.95.07,2.89-.81,3-1.42C167.06,54.59,167.6,51.3,168.16,48Z" />
                        <path class="cls-1" d="M192.58,39.26c-1.73-.6-6.16,1.13-7.59,3.15,1.21.4,2.38.73,3.53,1.16a15.93,15.93,0,0,1,9.18,7.82c2.62,5.19.41,11.14-5.23,12.68a14.4,14.4,0,0,1-8.9.1A6.9,6.9,0,0,1,179,55.53,2,2,0,0,1,180,54.4c.25-.11.87.26,1.12.58a4.1,4.1,0,0,0,3.55,1.56c2.59-.07,5.22.15,7.44-1.62,1.23-1,1.18-1.77-.33-2.35a47,47,0,0,0-5-1.61c-5.45-1.4-7.92-5.06-7.31-10.65a9.33,9.33,0,0,1,2.27-5.64c2.79-3,9.13-5.15,12.87-2.68,3.14,2.08,5.58,4.68,5.78,8.77.09,1.87-2.26,5.32-4,5.68-1,.21-2.92-1.11-3.18-2.46S192.76,41,192.58,39.26Z" />
                        <path class="cls-1" d="M162.07,25.94a15.16,15.16,0,0,1,.72-1.81c1.14-2.11,2.34-4.17,3.48-6.27.71-1.31,1.22-1.42,2.42-.52a12.82,12.82,0,0,0,1.63.9c1.76.93,2.46,2.4,1.6,4.18-1.23,2.52-2.7,4.94-4.15,7.35a1.81,1.81,0,0,1-1.36.51C164.9,30.3,162.24,27.52,162.07,25.94Z" />
                        <path class="cls-1" d="M190.1,71.25a2.51,2.51,0,0,1,2.37,2.55A2.43,2.43,0,0,1,190,76.1a2.49,2.49,0,0,1-2.39-2.54A2.52,2.52,0,0,1,190.1,71.25Z" />
                        <path class="cls-1" d="M109.3,73.49a2.45,2.45,0,0,1,2.55-2.23,2.42,2.42,0,1,1-.4,4.83A2.37,2.37,0,0,1,109.3,73.49Z" />
                        <path class="cls-1" d="M214.44,73.6a2.44,2.44,0,1,1-4.88.1,2.6,2.6,0,0,1,2.4-2.45A2.55,2.55,0,0,1,214.44,73.6Z" />
                      </g>
                    </g>
                  </svg> */}
                </Link>
              </div>
            </li>
            {/* <li>
              <bdi className=" d-md-block  d-none ms-5 ms-xl-0 position-relative">
                <input type="search" className="form-control login-comn-input searchbar ps-3" placeholder="Search Anything" />
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </bdi>
            </li> */}
          </ul>
          <ul className="d-flex align-items-center hdr-rgt-part responsive-view-menu" id="user-detail">
            {/* <li className="admin-notif position-relative pe-4" id="notify">
              <Dropdown className="d-inline" drop="left">
                <Dropdown.Toggle variant="transparent" id="dropdown-autoclose-true">
                  <div className="hdr-notify-box d-flex align-items-center justify-content-center ms-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" fill="#FFFFFF" className="bi bi-bell" viewBox="0 0 16 16">
                      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                    </svg>
                    <span className="notification-no">2</span>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="">
                    <div className="today-msg-line position-relative ">
                      <bdi>Today</bdi>
                    </div>
                    <div className="upload-profile-notif">
                      <div className="d-flex">
                        <div className="notif-circle">
                          <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.4211 4.99902C12.4211 7.20816 10.6043 8.99902 8.36317 8.99902C6.12201 8.99902 4.3052 7.20816 4.3052 4.99902C4.3052 2.78988 6.12201 0.999023 8.36317 0.999023C10.6043 0.999023 12.4211 2.78988 12.4211 4.99902Z" stroke="#828282" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8.36317 11.999C4.44115 11.999 1.26172 15.133 1.26172 18.999H15.4646C15.4646 15.133 12.2852 11.999 8.36317 11.999Z" stroke="#828282" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="ps-3">
                          <span>Upload a Profile Picture</span>
                          <p className="mb-0">Lorem Ipsum is simply dummy text of the printing.</p>
                        </div>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item href="">
                    <div className="upload-profile-notif">
                      <div className="d-flex">
                        <div className="notif-circle">
                          <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.925 -0.000976562C13.1598 -0.000976562 11.4656 0.809024 10.3598 2.08902C9.25397 0.809024 7.55977 -0.000976562 5.79455 -0.000976562C2.66992 -0.000976562 0.214844 2.41902 0.214844 5.49902C0.214844 9.27902 3.66412 12.359 8.88876 17.039L10.3598 18.349L11.8308 17.029C17.0554 12.359 20.5047 9.27902 20.5047 5.49902C20.5047 2.41902 18.0496 -0.000976562 14.925 -0.000976562ZM10.4612 15.549L10.3598 15.649L10.2583 15.549C5.42934 11.239 2.24383 8.38902 2.24383 5.49902C2.24383 3.49902 3.76557 1.99902 5.79455 1.99902C7.35687 1.99902 8.87861 2.98902 9.41629 4.35902H11.3134C11.8409 2.98902 13.3627 1.99902 14.925 1.99902C16.954 1.99902 18.4757 3.49902 18.4757 5.49902C18.4757 8.38902 15.2902 11.239 10.4612 15.549Z" fill="#828282" />
                          </svg>
                        </div>
                        <div className="ps-3">
                          <span>Welcome To Opase!</span>
                          <p className="mb-0">Lorem Ipsum is simply dummy text of the printing.</p>
                        </div>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item href="">
                    <div className="upload-profile-notif">
                      <div className="d-flex">
                        <div className="notif-circle">
                          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_2820_10397)">
                              <path d="M18.4467 19.999H4.24383V5.99902H13.3743V3.99902H4.24383C3.12789 3.99902 2.21484 4.89902 2.21484 5.99902V19.999C2.21484 21.099 3.12789 21.999 4.24383 21.999H18.4467C19.5627 21.999 20.4757 21.099 20.4757 19.999V10.999H18.4467V19.999ZM10.5438 16.829L8.55542 14.469L5.76557 17.999H16.925L13.3337 13.289L10.5438 16.829ZM20.4757 3.99902V0.999023H18.4467V3.99902H15.4032C15.4134 4.00902 15.4032 5.99902 15.4032 5.99902H18.4467V8.98902C18.4569 8.99902 20.4757 8.98902 20.4757 8.98902V5.99902H23.5192V3.99902H20.4757Z" fill="#828282" />
                            </g>
                            <defs>
                              <clipPath id="clip0_2820_10397">
                                <rect width="24.3478" height="24" fill="white" transform="translate(0.1875 -0.000976562)" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <div className="ps-3">
                          <span>Upload a New Feed</span>
                          <p className="mb-0">Lorem Ipsum is simply dummy text of the printing.</p>
                        </div>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item href="">
                    <div className="upload-profile-notif">
                      <div className="d-flex">
                        <div className="notif-circle">
                          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_2820_10397)">
                              <path d="M18.4467 19.999H4.24383V5.99902H13.3743V3.99902H4.24383C3.12789 3.99902 2.21484 4.89902 2.21484 5.99902V19.999C2.21484 21.099 3.12789 21.999 4.24383 21.999H18.4467C19.5627 21.999 20.4757 21.099 20.4757 19.999V10.999H18.4467V19.999ZM10.5438 16.829L8.55542 14.469L5.76557 17.999H16.925L13.3337 13.289L10.5438 16.829ZM20.4757 3.99902V0.999023H18.4467V3.99902H15.4032C15.4134 4.00902 15.4032 5.99902 15.4032 5.99902H18.4467V8.98902C18.4569 8.99902 20.4757 8.98902 20.4757 8.98902V5.99902H23.5192V3.99902H20.4757Z" fill="#828282" />
                            </g>
                            <defs>
                              <clipPath id="clip0_2820_10397">
                                <rect width="24.3478" height="24" fill="white" transform="translate(0.1875 -0.000976562)" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <div className="ps-3">
                          <div>
                            <span>You received a new request</span>
                          </div>

                          <div className="d-flex mt-2">
                            <div className="me-3">
                              <span className="comn-status-class decline-class">Decline</span>
                            </div>
                            <div>
                              <span className="comn-status-class accept-class-2">Accept</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li> */}
            {login && (
              <li className="admin-notif position-relative pe-4" id="notify">
                <Dropdown className="d-inline" drop="left" id="notification">
                  <Dropdown.Toggle variant="transparent" id="dropdown-autoclose-true">
                    <div className="hdr-notify-box d-flex align-items-center justify-content-center ">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" fill="#FFFFFF" className="bi bi-bell" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                      </svg>
                      {notification?.notifCount && <span className="notification-no">{notification?.notifCount}</span>}
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={notification ? "user-new pt-2" : "dropdown-menu"}>
                    {notification ? (
                      <Dropdown.Item href="">
                        <div className={notification ? "upload-profile-notif" : "upload-profile-notif d-none"}>
                          <div className="d-flex">
                            {/* <div className="notif-circle">
                                        <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M12.4211 4.99902C12.4211 7.20816 10.6043 8.99902 8.36317 8.99902C6.12201 8.99902 4.3052 7.20816 4.3052 4.99902C4.3052 2.78988 6.12201 0.999023 8.36317 0.999023C10.6043 0.999023 12.4211 2.78988 12.4211 4.99902Z" stroke="#828282" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                          <path d="M8.36317 11.999C4.44115 11.999 1.26172 15.133 1.26172 18.999H15.4646C15.4646 15.133 12.2852 11.999 8.36317 11.999Z" stroke="#828282" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                      </div> */}
                            <div className="ps-3">
                              <span>{notification?.title}</span>
                              <p className="mb-0">{notification?.body}</p>
                            </div>
                          </div>
                        </div>
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item href="">
                        {notificationData &&
                          notificationData.length > 0 &&
                          notificationData?.map((item) => {
                            return (
                              <>
                                <div className="upload-profile-notif">
                                  <div className="d-flex">
                                    {/* <div className="notif-circle">
                                                <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M12.4211 4.99902C12.4211 7.20816 10.6043 8.99902 8.36317 8.99902C6.12201 8.99902 4.3052 7.20816 4.3052 4.99902C4.3052 2.78988 6.12201 0.999023 8.36317 0.999023C10.6043 0.999023 12.4211 2.78988 12.4211 4.99902Z" stroke="#828282" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                  <path d="M8.36317 11.999C4.44115 11.999 1.26172 15.133 1.26172 18.999H15.4646C15.4646 15.133 12.2852 11.999 8.36317 11.999Z" stroke="#828282" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                              </div> */}
                                    <div className="ps-3">
                                      <span>{item.notif_title}</span>
                                      <p className="mb-0">{item.notification}</p>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            )}
            <li className="profile-hdr-drop-class ps-3">
              <Dropdown className="d-inline" drop="left">
                <Dropdown.Toggle variant="transparent" id="dropdown-autoclose-true">
                  <div className="profile-hdr-drop ms-1">
                    <div className="profile-pic me-1">
                      <img referrerPolicy="no-referrer" src={user !== null ? user?.image : OpaseProfile} alt="profile" />
                    </div>
                    <div className="profil-detail-section d-flex text-start ms-2">
                      <div>
                        <span>{user !== null ? user?.user_name : userName}</span>

                        {/* <p>Talent</p> */}
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFF" className="bi bi-chevron-down" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {/* <Dropdown.Item href="/#" className="d-flex align-items-center position-relative">
                    <div className="ms-2">Notifications</div>
                    <div className="custm-toggel-switch">
                      <div className="form-check form-switch">
                        <input className="form-check-input mt-0" type="checkbox" id="offer-status" defaultChecked />
                      </div>
                    </div>
                  </Dropdown.Item> */}
                  <Dropdown.Item onClick={() => setLogoutShow(true)} className="d-flex align-items-center mt-3">
                    <div className="ms-2">Logout</div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
          <div className="d-md-none search-form-wrapper" id="search-detail">
            <input type="search" className="form-control login-comn-input searchbar  w-100" placeholder="Search Anything" />
          </div>
          <div className="d-md-none d-block">
            <div className="d-flex align-items-center me-2">
              <button type="button" className="border-0 bg-transparent p-0" onClick={openSearchinfo}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="d-lg-none">
            <button type="button" className="border-0 bg-transparent p-0" onClick={openUserinfo}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#fff" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" fill="#7C64F8"></path>
              </svg>
            </button>
          </div>
        </nav>
      </header>
      <div id="idarrow" className="arrw-left-icon position-fixed d-xl-none" onClick={addmainclassName}>
        <i className="bi bi-chevron-left d-flex align-items-center justify-content-center"></i>
      </div>

      {/* === logout MODAL === */}
      <Modal
        show={logoutshow}
        onHide={() => {
          setLogoutShow(false);
        }}
        size="sm"
        centered
        className="comn-modal-style"
      >
        <Modal.Header className="border-0">
          <div className="modal-hdr text-center w-100">
            <h4 className="">Logout</h4>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className=" modal-data-body text-center">
            <p className="mb-0">Are you sure you want to logout?</p>
            <div className="col-12 mt-4">
              <div className="d-flex">
                <button className="comn-btn-class w-100 me-4" type="submit" onClick={() => handleLogout()}>
                  Yes
                </button>
                <button className="comn-btn-class cancle-btn-class w-100" type="submit" onClick={() => setLogoutShow(false)}>
                  No
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
