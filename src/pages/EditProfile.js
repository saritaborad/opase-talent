import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import countryList from "react-select-country-list";
import UserLayout from "../components/UserLayout";
import { Tab, Nav } from "react-bootstrap";
import Instagram from "../images/instagram.png";
import Twitter from "../images/twitter.png";
import youtube from "../images/youtube.png";
import snapchat from "../images/snapchat.png";
import tiktok from "../images/tiktok.png";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import moment from "moment";
import AuthContext from "../contexts/AuthContext";

var startdate = moment();
startdate = startdate.subtract(18, "years");
startdate = startdate.format("YYYY-MM-DD");

export default function EditProfile(params) {
  const [key, Setkey] = useState("first");
  const [submitkey, setsubmitkey] = useState(false);
  const [urlerror, seturlerror] = useState(false);
  const [submit_state, setsubmitstate] = useState(false);
  const [country, setCountry] = useState("");
  const [images, setImages] = useState(null);
  const [youtubeurl, setYoutubeUrl] = useState("");
  const [twitter_url, setTwitterurl] = useState("");
  // const [linkedin_url, setLinkedinurl] = useState("");
  const [snapchat_url, setSnapchaturl] = useState("");
  const [instagram_url, setInstagramurl] = useState("");
  const [tiktokurl, setTiktokurl] = useState("");
  const [data, setData] = useState([]);
  const [phone, setPhone] = useState("");
  const [CountryCode, setCountryCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [textAreaCount, setChangeTextAreaCount] = useState(0);

  const { user, setUser } = useContext(AuthContext);
  const telentForm = useRef("");

  let countryOptions = useMemo(() => countryList().getData(), []);

  const customStyles = {
    option: (provided, state) => ({
      color: state.isSelected ? "#fff" : "#7c64f8",
      backgroundColor: state.isSelected ? "#7c64f8" : "#212529",
      padding: 10,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      return { ...provided, opacity, transition };
    },
  };

  useEffect(() => {
    getAllIProfile();
  }, []);

  const changeHandler = (country) => {
    setCountry(country);
  };

  const getAllIProfile = () => {
    let path = API_Path.GetAllProfile;
    const getAllProfileData = new Promise((resolve) => {
      resolve(PostApi(path));
    });
    getAllProfileData.then((res) => {
      if (res.status === 200) {
        telentForm.current?.setFieldValue("country", res.data.data.country);
        setData(res.data.data);
        setYoutubeUrl(res.data.data.youtube_url);
        setInstagramurl(res.data.data.instagram_url);
        setTiktokurl(res.data.data.tiktok_url);
        setSnapchaturl(res.data.data.snapchat_url);
        setTwitterurl(res.data.data.twitter_url);
        setPhone(res.data.data.phone);
        setCountry({ value: res.data.data?.country.split("--")[0], label: res.data.data?.country.split("--")[1] });
        setChangeTextAreaCount(res.data.data.about?.length);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const editFormData = (formData, resetForm) => {
    setChangeTextAreaCount(formData.about?.length);
    let data1 = new FormData();
    data1.append("images", images);
    data1.append("username", formData.user_name);
    data1.append("fullname", formData.fullname);
    data1.append("phone", phone);
    data1.append("country", `${country.value}--${country.label}`);
    data1.append("about", formData.about);
    data1.append("email", formData.email);
    data1.append("date_of_birth", formData.date_of_birth);
    data1.append("contrycode", CountryCode);
    data1.append("countrysurname", countryName);
    data1.append("headline", formData.headline);
    data1.append("youtubeurl", formData.youtubeurl);
    data1.append("twitterurl", formData.twitter_url);
    data1.append("snapchaturl", formData.snapchat_url);
    data1.append("instagramurl", formData.instagram_url);
    data1.append("tiktokurl", formData.tiktokurl);
    const editProfileData = new Promise((resolve) => {
      resolve(PostApi(API_Path.EDitProfile, data1));
    });
    editProfileData.then((res) => {
      if (res.status === 200) {
        setData("");
        toast.success(res.data.message);
        getAllIProfile();
      } else {
        resetForm();
        toast.error(res.data.message);
      }
    });
  };

  const errorContainer = (form, field) => {
    setChangeTextAreaCount(form.values.about?.length);
    return form.touched[field] && form.errors[field] ? <span className="error text-danger d-block mt-2">{form.errors[field]}</span> : null;
  };
  const formAttr = (form, field) => ({
    onBlur: form.handleBlur,
    onChange: form.handleChange,
    value: form.values[field],
  });

  const imageFile = (e) => {
    const image = e.target.files[0];
    if (image.size < 5242880) {
      const image = new Image();
      let fr = new FileReader();
      fr.onload = function () {
        if (fr !== null && typeof fr.result == "string") {
          image.src = fr.result;
        }
      };
      fr.readAsDataURL(e.target.files[0]);
      image.onload = () => {
        if (image.width < 257 && image.height < 257) {
          setImages(e.target.files[0]);
        } else {
          toast.error("Please upload your image less than or equal to 256px * 256px ");
          e.target.value = null;
        }
      };
    } else {
      toast.error("Please upload image of size less than 5MB");
      e.target.value = null;
    }
  };

  const handleClick = () => {
    if (document.getElementById("submitBtn")) {
      document.getElementById("submitBtn").click();
    }
  };
  const handleCountry = (phone, country) => {
    setCountryCode(country.dialCode);
    setCountryName(country.countryCode);
    setPhone(phone);
    if (phone > 9) {
      telentForm.current.setFieldValue("phone", phone);
    }
  };

  return (
    <>
      <UserLayout>
        <div className="content-main-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 mt-3">
                <div className="d-block d-sm-flex align-items-center">
                  <div className="comn-title-main">
                    <h1 className="mb-0">Edit profile</h1>
                  </div>
                  <div className="ms-auto d-block d-sm-flex  mt-3 mt-sm-0">
                    <div className="">
                      <button className="comn-btn-class w-100 px-4" type="button" onClick={handleClick}>
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>

                <Formik
                  innerRef={telentForm}
                  enableReinitialize={true}
                  initialValues={{
                    fullname: data?.fullname ? data?.fullname : "",
                    phone: data?.phone ? data?.phone : phone,
                    email: data?.email ? data?.email : "",
                    date_of_birth: data?.date_of_birth ? data?.date_of_birth : "",
                    headline: data?.headline ? data?.headline : "",
                    about: data?.about ? data?.about : "",
                    image: data?.image ? data?.image : "",
                    user_name: data?.user_name ? data?.user_name : "",
                    country: data?.country ? data?.country : country,
                    youtubeurl: data?.youtube_url ? data?.youtube_url : youtubeurl,
                    instagram_url: data?.instagram_url ? data?.instagram_url : instagram_url,
                    twitter_url: data?.twitter_url ? data?.twitter_url : twitter_url,
                    snapchat_url: data?.snapchat_url ? data?.snapchat_url : snapchat_url,
                    tiktokurl: data?.tiktokurl ? data?.tiktokurl : tiktokurl,
                    // facebook_friend_number: isEdit ? data.facebook_friend_number : "",
                    // instagram_friend_number: isEdit ? data.instagram_friend_number : "",
                    // linkedin_friend_number: isEdit ? data.linkedin_friend_number : "",
                    // snapchat_friend_number: isEdit ? data.snapchat_friend_number : "",
                    // twitter_friend_number: isEdit ? data.twitter_friend_number : "",
                  }}
                  validationSchema={Yup.object({
                    user_name: Yup.string().required("Username  is required"),
                    fullname: Yup.string().required("Full name is required."),
                    email: Yup.string().email().required("Email is required."),
                    date_of_birth: Yup.string().required("Date of birth is required."),
                    headline: Yup.string().required("Headline is required."),
                    about: Yup.string().required("About is required."),
                    phone: Yup.string().required("Phone number is required."),
                  })}
                  onSubmit={(formData, { resetForm }) => {
                    editFormData(formData, resetForm);
                  }}
                >
                  {(runform) => (
                    <form className="row" onSubmit={runform.handleSubmit}>
                      <div className="col-12 mt-3">
                        <div className="comn-black-bg p-3">
                          <div className="row justify-content-between">
                            <div className="col-12 mb-4 mt-3 manage-talent-black-bg">
                              <div className="upload-talent-profile">
                                <div className="me-5 ms-3">
                                  <img referrerPolicy="no-referrer" src={images !== null ? URL.createObjectURL(images) : data.image} alt="talent-profile" className="img-fluid img-details" />
                                </div>
                                <div className="mt-3 mt-sm-0">
                                  <span>{images ? "uploaded" : "Upload your profile"}</span>
                                  <p className="mt-1">You can upload image of max size of 5mb. Image will be cropped to 256*256px.</p>
                                  <div className="mt-3">
                                    <label className="upload-btn-file" htmlFor="image-bg-upload">
                                      <div className="d-flex">
                                        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-1">
                                          <path d="M12.6268 13H10.3372C9.70617 13 9.19239 12.5589 9.19239 12.0172V7.49607H6.67383C6.07029 7.49607 5.76074 6.87334 6.17744 6.49907L10.9856 2.17455C11.2448 1.94182 11.7201 1.94182 11.9793 2.17455L16.7874 6.49907C17.2032 6.87334 16.8937 7.49607 16.2901 7.49607H13.7716V12.0172C13.7716 12.5589 13.2578 13 12.6268 13Z" fill="white" />
                                          <path d="M18.7507 18H4.22982C3.54628 18 2.99023 17.4112 2.99023 16.6875V16.3125C2.99023 15.5888 3.54628 15 4.22982 15H18.7507C19.4342 15 19.9902 15.5888 19.9902 16.3125V16.6875C19.9902 17.4112 19.4342 18 18.7507 18Z" fill="white" />
                                        </svg>
                                        Upload image
                                      </div>
                                    </label>
                                    <input id="image-bg-upload" accept="image/*" name={images} onChange={imageFile} type="file" className="d-none " />
                                  </div>
                                </div>
                              </div>
                              {errorContainer(runform, "images")}
                            </div>

                            <div className="col-lg-4 col-md-6  my-3 comn-input-main service-fix-box ">
                              <label className="d-inline-flex align-items-center mb-2">Full name</label>
                              <input className="form-control comn-input-style px-3" type="text" {...formAttr(runform, "fullname")} placeholder="Enter talent’s full name" name="fullname" />
                              {errorContainer(runform, "fullname")}
                              <label className="d-inline-flex align-items-center mb-2 mt-3">Date of birth</label>
                              <div>
                                <input className="form-control comn-input-style px-3" max={startdate} type="date" {...formAttr(runform, "date_of_birth")} name="date_of_birth" />
                                {errorContainer(runform, "date_of_birth")}
                              </div>
                              <label className="d-inline-flex align-items-center mb-2 mt-3">Phone number</label>
                              <div className=" position-relative">
                                <PhoneInput
                                  name="phone"
                                  country="us"
                                  CountryCode
                                  className="marginBottom country-tel-div"
                                  value={data.phone ? data.phone : phone}
                                  onChange={(value, country) => {
                                    handleCountry(value, country);
                                  }}
                                />
                                {errorContainer(runform, "phone")}
                              </div>
                            </div>

                            <div className="col-lg-4 col-md-6  my-3 comn-input-main service-fix-box">
                              <label className="d-inline-flex align-items-center mb-2">Username</label>
                              <input className="form-control comn-input-style px-3" type="text" {...formAttr(runform, "user_name")} placeholder="Enter user name" name="user_name" />
                              {errorContainer(runform, "user_name")}
                              <label className="d-inline-flex align-items-center mb-2 mt-3">Country</label>

                              <div className=" mb-3 comn-gray-form-select">
                                <Select options={countryOptions} country="us" name="country" className="form-control comn-input-style country-select" styles={customStyles} value={country !== "" && country} onChange={(e) => changeHandler(e)} />
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 my-3 comn-input-main service-fix-box">
                              <label className="d-inline-flex align-items-center mb-2">Email</label>
                              <input className="form-control comn-input-style px-3" type="email" {...formAttr(runform, "email")} name="email" placeholder="Enter talent’s email" />
                              {errorContainer(runform, "email")}
                              <label className="d-inline-flex align-items-center mb-2 mt-3">Headline</label>
                              <div className="position-relative">
                                <input className="form-control comn-input-style px-3" type="text" name="headline" {...formAttr(runform, "headline")} placeholder="Youtuber" />
                                {errorContainer(runform, "headline")}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="comn-black-bg p-3 pb-0 mt-3">
                          <div className="row">
                            <div className="col-12 mb-3 manage-talent-black-bg">
                              <label className="comn-label-class">Where can we find you</label>

                              <Tab.Container id="social-tabs" defaultActiveKey="first">
                                <div className="soc-icon-cust-check">
                                  <Nav variant="pills">
                                    <Nav.Item>
                                      <Nav.Link eventKey="first">
                                        <div className="soc-icon-main">
                                          <label className="cust-chk-bx p-0">
                                            <span className="cust-chkbox">
                                              <img src={youtube} alt="soc_icon" width="48px" />
                                            </span>
                                          </label>
                                        </div>
                                      </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                      <Nav.Link eventKey="second">
                                        <div className="soc-icon-main">
                                          <label className="cust-chk-bx p-0">
                                            <span className="cust-chkbox">
                                              <img src={Instagram} alt="soc_icon" />
                                            </span>
                                          </label>
                                        </div>
                                      </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                      <Nav.Link eventKey="third">
                                        <div className="soc-icon-main">
                                          <label className="cust-chk-bx p-0">
                                            <span className="cust-chkbox">
                                              <img src={Twitter} alt="soc_icon" />
                                            </span>
                                          </label>
                                        </div>
                                      </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                      <Nav.Link eventKey="four">
                                        <div className="soc-icon-main">
                                          <label className="cust-chk-bx p-0">
                                            <span className="cust-chkbox">
                                              <img src={snapchat} alt="soc_icon" />
                                            </span>
                                          </label>
                                        </div>
                                      </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                      <Nav.Link eventKey="five">
                                        <div className="soc-icon-main">
                                          <label className="cust-chk-bx p-0">
                                            <span className="cust-chkbox">
                                              <img src={tiktok} width="50px" alt="soc_icon" />
                                            </span>
                                          </label>
                                        </div>
                                      </Nav.Link>
                                    </Nav.Item>
                                  </Nav>
                                </div>
                                <Tab.Content>
                                  <Tab.Pane eventKey="first">
                                    <div className="row">
                                      <div className="col-lg-4 col-md-6  mb-3 comn-input-main service-fix-box">
                                        <label className="d-inline-flex align-items-center mb-2 mt-3">Youtube URL</label>
                                        <input type="text" className="form-control comn-input-style" placeholder="Enter youtube account URL" name="youtubeurl" value={youtubeurl} onChange={(e) => setYoutubeUrl(e.target.value)} />
                                        <span className="error-new" id="url-error-1">
                                          youtube URL is required.
                                        </span>
                                      </div>
                                    </div>
                                  </Tab.Pane>
                                  <Tab.Pane eventKey="second">
                                    <div className="row">
                                      <div className="col-lg-4 col-md-6  mb-3 comn-input-main service-fix-box">
                                        <label className="d-inline-flex align-items-center mb-2 mt-3">Instagram URL</label>
                                        <input
                                          type="text"
                                          className="form-control comn-input-style"
                                          placeholder="Enter instagram account URL"
                                          onChange={(e) => {
                                            setInstagramurl(e, "instagram_url");
                                          }}
                                          value={instagram_url}
                                          name="instagram_url"
                                          {...formAttr(runform, "instagram_url")}
                                        />
                                        <span className="error-new" id="url-error-2">
                                          {urlerror ? "Write proper url" : "Instagram URL is required."}
                                        </span>
                                      </div>
                                    </div>
                                  </Tab.Pane>
                                  <Tab.Pane eventKey="third">
                                    <div className="row">
                                      <div className="col-lg-4 col-md-6  mb-3 comn-input-main service-fix-box">
                                        <label className="d-inline-flex align-items-center mb-2 mt-3">Twitter URL</label>
                                        <input
                                          type="text"
                                          className="form-control comn-input-style"
                                          placeholder="Enter twitter account URL"
                                          onChange={(e) => {
                                            setTwitterurl(e.target.value);
                                          }}
                                          value={twitter_url}
                                          name="twitter_url"
                                          {...formAttr(runform, "twitter_url")}
                                        />
                                      </div>
                                    </div>
                                  </Tab.Pane>
                                  <Tab.Pane eventKey="four">
                                    <div className="row">
                                      <div className="col-lg-4 col-md-6  mb-3 comn-input-main service-fix-box">
                                        <label className="d-inline-flex align-items-center mb-2 mt-3">Snapchat URL</label>
                                        <input
                                          type="text"
                                          className="form-control comn-input-style"
                                          placeholder="Enter snapchat account URL"
                                          onChange={(e) => {
                                            setSnapchaturl(e.target.value);
                                          }}
                                          name="snapchat_url"
                                          {...formAttr(runform, "snapchat_url")}
                                        />
                                      </div>
                                    </div>
                                  </Tab.Pane>
                                  <Tab.Pane eventKey="five">
                                    <div className="row">
                                      <div className="col-lg-4 col-md-6  mb-3 comn-input-main service-fix-box">
                                        <label className="d-inline-flex align-items-center mb-2 mt-3">Tiktok URL</label>
                                        <input
                                          type="text"
                                          className="form-control comn-input-style"
                                          placeholder="Enter tiktok account URL"
                                          onChange={(e) => {
                                            setTiktokurl(e.target.value);
                                          }}
                                          name="tiktok_url"
                                          value={tiktokurl}
                                        />
                                      </div>
                                    </div>
                                  </Tab.Pane>
                                </Tab.Content>
                              </Tab.Container>
                            </div>

                            <div className="col-12 my-3 manage-talent-black-bg">
                              <label className="mb-2">
                                <span>Talent’s information </span>
                              </label>
                              <div className="col-12">
                                <textarea className="w-100 talent-info-main" name="about" rows={4} maxLength={250} {...formAttr(runform, "about")} placeholder="Say something about you..."></textarea>
                                <p>{textAreaCount}/250</p>
                                {errorContainer(runform, "about")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <button id="submitBtn" className="comn-btn-class w-100 px-4 d-none" type="sumbit">
                          Save changes
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    </>
  );
}
