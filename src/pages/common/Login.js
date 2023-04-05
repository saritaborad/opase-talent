import React, { useContext, useEffect } from "react";
import SideImg from "../../images/Login-right img.png";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { API_Path } from "../../const";
import { PostApi } from "../../api/api-service";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import AuthContext from "../../contexts/AuthContext";

const sign = require("jwt-encode");
const secret = "sdhbFKUEGIEtfgiq2w3eqq45ftyu8udgtyhtrhu8hrfhgia9";

export default function Login(params) {
  const [isVerified, setIsverified] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  //  remember me
  useEffect(() => {
    let remember_me_token = localStorage.getItem("remember_talent_token");
    if (remember_me_token !== null) {
      let temp = jwt_decode(remember_me_token);
      if (document.getElementById("remember")) {
        document.getElementById("remember").checked = true;
      }
      let dataemail = temp.email;
      let datapassword = temp.password;
      setRemember(true);
      setEmail(dataemail);
      setPassword(datapassword);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user_email")) {
      setEmail(localStorage.getItem("user_email"));
    }
  }, []);

  const encode_token_jwt = (formData) => {
    var date = new Date();
    var time = date.getTime();
    const data = { exp: time + 3600, email: formData.email, password: formData.password, iat: time };
    const jwt = sign(data, secret);
    if (remember) {
      localStorage.setItem("remember_talent_token", jwt);
    }
  };

  const submitFormData = (formData, resetForm) => {
    localStorage.setItem("user_email", formData.email);
    const SigninUser = new Promise((resolve) => {
      resolve(PostApi(API_Path.login, formData));
    });
    SigninUser.then((res) => {
      if (res.status === 200) {
        if (res.data.data.is_verified === 0) {
          setIsverified(true);
        }
        if (res.data.data.isService === 0) {
          window.location.href = "https://node.staging.rentechdigital.com:5013/service-details";
        }
        if (res.data.data.isBank === 0) {
          window.location.href = "https://node.staging.rentechdigital.com:5013/bank-details";
        }
        localStorage.setItem("opata_token", res.data.data.token);
        setUser(res.data.data);
        encode_token_jwt(formData);
        setEmail(res.data.data.email);
        // resetForm(formData);
        if (res.data.data.is_verified === 1) {
          toast.success(res.data.message);
          setTimeout(() => {
            navigate(`/dashboard`);
          }, 1000);
        }
      } else {
        toast.error(res.data.message);
      }
    }).catch((err) => {
      console.log(err);
      toast.error(err);
    });
  };

  const errorContainer = (form, field) => {
    return form.touched[field] && form.errors[field] ? <span className="error text-danger">{form.errors[field]}</span> : null;
  };

  const formAttr = (form, field) => ({
    onBlur: form.handleBlur,
    onChange: form.handleChange,
    value: form.values[field],
  });

  const passwordshow = (e) => {
    var x = document.getElementById("new_password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    document.getElementById("show_pwd").classList.toggle("active");
  };

  const handelCheckbox = (e) => {
    if (e.target.checked) {
      setRemember(true);
    } else {
      setRemember(false);
      localStorage.removeItem("remember_token");
    }
  };

  const validateEmail = (email) => {
    return Yup.string().email().isValidSync(email);
  };

  const validatePhone = (phone) => {
    return Yup.number()
      .integer()
      .positive()
      .test((phone) => {
        return phone && phone.toString().length >= 8 && phone.toString().length <= 14 ? true : false;
      })
      .isValidSync(phone);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 p-0">
            <div className="login-main-left-bg">
              <div className="login-main-part-scroll">
                <div className="login-main-side">
                  <div className="m-auto login-main-box">
                    <div className="w-100 text-center mb-5">
                      {/* <img src={Logo} alt="ADMIN" className="img-fluid" /> */}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 219.98 79.09">
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
                      </svg>
                    </div>
                    <div className="mb-5 text-center">
                      <h1>Sign in as talent</h1>
                      <p>Welcome Back! Please enter your details.</p>
                    </div>
                    <Formik
                      enableReinitialize
                      initialValues={{
                        email: email,
                        password: password,
                      }}
                      validationSchema={Yup.object({
                        email: Yup.string()
                          .required("Email / Phone is required")
                          .test("email", "Email / Phone is invalid", (value) => {
                            return validateEmail(value) || validatePhone(parseInt(value ?? "0"));
                          }),
                        password: Yup.string().required("Password is required."),
                      })}
                      onSubmit={(formData, { resetForm }) => {
                        submitFormData(formData, resetForm);
                      }}
                    >
                      {(runform) => (
                        <form onSubmit={runform.handleSubmit}>
                          <div className="row">
                            <div className="col-12 mb-3">
                              <label className="d-block login-label-text mb-2">Email or Phone number</label>
                              <input type="email" value={email} className="form-control login-comn-input" name="email" {...formAttr(runform, "email")} placeholder="johndoe@gmail.com" />
                              {errorContainer(runform, "email")}
                            </div>
                            <div className="col-12 mb-3">
                              <label className="d-block login-label-text mb-2">Password</label>
                              <div className="d-block position-relative">
                                <input type="password" value={password} id="new_password" className="form-control login-comn-input" {...formAttr(runform, "password")} name="password" placeholder="*******" />
                                <span className="showpwd-class" id="show_pwd" onClick={(e) => passwordshow(e)}>
                                  <i className="bi bi-eye-slash"></i>
                                </span>
                              </div>
                              {errorContainer(runform, "password")}
                            </div>
                            <div className="col-12 mb-3">
                              <label className="cust-chk-bx">
                                <input type="checkbox" id="remember" name="remember" onChange={handelCheckbox} />
                                <span className="cust-chkmark"></span>
                                Remember me
                              </label>
                            </div>
                            <div className="col-12 mb-3 pt-2 text-center">
                              <button type="submit" className="comn-btn-class w-100">
                                Sign In
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 p-0 d-lg-block d-none">
            <div className="login-side-img position-relative">
              <img src={SideImg} alt="JAMSKE" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>

      {/* ----------- is verified --------- */}
      <Modal
        show={isVerified}
        onHide={() => {
          setIsverified(false);
        }}
        size="sm"
        centered
        className="comn-modal-style"
      >
        <Modal.Header className="border-0" closeButton>
          <div className="modal-hdr pt-2">
            <h4>Verified Pending</h4>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className=" modal-data-body">
            <p className="modal-data-text mb-0">Your onboarding process is under review. You can login after completion of it.You can contact us if you have any query regarding the process.</p>
            <div className="col-12 mt-4">
              <div className="d-flex">
                <button
                  className="comn-btn-class w-100 "
                  type="button"
                  onClick={() => {
                    setIsverified(false);
                  }}
                >
                  ok
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
