import React, { useEffect, useState } from "react";
import UserLayout from "../components/UserLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import { toast } from "react-toastify";

export default function EditServiceDetails(params) {
  const [data, setData] = useState([]);
  const [opencard, setOpenCard] = useState(true);
  const [video24hr, setVideo24hr] = useState("");
  const [videoPrice, setVideoPrice] = useState("");

  useEffect(() => {
    getAllSocialMedia();
  }, []);

  const getAllSocialMedia = () => {
    const AllSocialMediaData = new Promise((resolve) => {
      resolve(PostApi(API_Path.GetAllService));
    });
    AllSocialMediaData.then((res) => {
      if (res.status === 200) {
        setData(res.data.data);
        setVideoPrice(res.data.data.video_price);
        setVideo24hr(res.data.data.video_price_24);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const submitFormData = (formData, resetForm) => {
    const data = {
      chatPrice: formData.chat_price,
      chatTime: formData.chat_time,
      videoPrice: videoPrice,
      videoTime: formData.video_time,
      video24hr: video24hr,
    };
    const editInquiryPromis = new Promise((resolve) => {
      resolve(PostApi(API_Path.GetAllService, data));
    });
    editInquiryPromis.then((res) => {
      if (res.status === 200) {
        setData("");
        toast.success("Service details updated successfully!");
        getAllSocialMedia();
      } else {
        resetForm();
        toast.error(res.data.message);
      }
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

  const checkDefault = (e) => {
    if (e.target.checked) {
      setOpenCard(true);
    } else {
      setOpenCard(false);
    }
  };

  const handlePrice = (e) => {
    setVideoPrice(parseInt(e.target.value));
    if (e.target.value === "") {
      setVideo24hr(0);
    } else {
      let videoPrice = parseInt(e.target.value) + (parseInt(e.target.value) * 40) / 100;
      setVideo24hr(videoPrice);
    }
  };

  return (
    <>
      <UserLayout>
        <div className="content-main-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 mt-3">
                <div className="comn-title-main d-block  d-sm-flex justify-content-between">
                  <h1 className="mb-0">Edit services detail</h1>
                </div>
              </div>

              <div className="col-12 mt-3">
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    video_price_24: data?.video_price_24 ? data?.video_price_24 : "0",
                    video_price: data?.video_price ? data?.video_price : videoPrice,
                    video_time: data?.video_time ? data?.video_time : "Select days",
                    chat_price: data?.chat_price ? data?.chat_price : "0",
                    chat_time: data?.chat_time ? data?.chat_time : "Select days",
                  }}
                  validationSchema={Yup.object({
                    video_price_24: Yup.string().required("Video price is required."),
                    video_price: Yup.string().required("Video price is required."),
                    chat_price: Yup.string().required("Chat price is required."),
                    chat_time: Yup.string().required("Chat time is required."),
                    video_time: Yup.string().required("Video time is required."),
                  })}
                  onSubmit={(formData, { resetForm }) => {
                    submitFormData(formData, resetForm);
                  }}
                >
                  {(runform) => (
                    <form className="row" onSubmit={runform.handleSubmit}>
                      <div className="col-12">
                        <div className="comn-black-bg p-3">
                          <div className="row justify-content-between">
                            <div className="col-lg-4 col-md-6  mb-3 comn-input-main service-fix-box">
                              <div className="comn-purple-txt d-flex align-items-center mb-3">
                                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                  <path d="M6 9H6.01M10 9H10.01M14 9H14.01M19 9C19 13.4183 14.9706 17 10 17C8.46073 17 7.01172 16.6565 5.74467 16.0511L1 17L2.39499 13.28C1.51156 12.0423 1 10.5743 1 9C1 4.58172 5.02944 1 10 1C14.9706 1 19 4.58172 19 9Z" stroke="#7C64F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Chat
                              </div>
                              <label className="d-inline-flex align-items-center mb-2">Price</label>
                              <div className="position-relative">
                                <input className="form-control comn-input-style ps-4 px-3 remove-number-arrow" type="number" {...formAttr(runform, "chat_price")} name="chat_price" placeholder="Enter chat price" />
                                <span className="dollar-fix">$</span>
                              </div>
                              {errorContainer(runform, "chat_price")}
                              <label className="d-inline-flex align-items-center mb-2 mt-3">Response time</label>
                              <div className=" mb-3 comn-gray-form-select">
                                <select className="form-select  w-100" {...formAttr(runform, "chat_time")} name="chat_time">
                                  <option value="day"> Select days </option>
                                  <option value="2 Days"> 2 Days</option>
                                  <option value="3 Days"> 3 Days</option>
                                  <option value="4 Days"> 4 Days</option>
                                  <option value="5 Days"> 5 Days</option>
                                  <option value="6 Days"> 6 Days</option>
                                  <option value="7 Days"> 7 Days</option>
                                </select>
                                {errorContainer(runform, "chat_time")}
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6  mb-3 comn-input-main service-fix-box">
                              <div className="comn-purple-txt d-flex align-items-center mb-3">
                                <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                  <path d="M12 2V10H2V2H12ZM13 0H1C0.45 0 0 0.45 0 1V11C0 11.55 0.45 12 1 12H13C13.55 12 14 11.55 14 11V7.5L18 11.5V0.5L14 4.5V1C14 0.45 13.55 0 13 0Z" fill="#7C64F8" />
                                </svg>
                                Video
                              </div>

                              <label className="d-inline-flex align-items-center mb-2">Price</label>
                              <div className="position-relative">
                                <input className="form-control comn-input-style ps-4 px-3 remove-number-arrow" type="number" value={videoPrice} onChangeCapture={handlePrice} name="video_price" placeholder="Enter video price" />
                                <span className="dollar-fix">$</span>
                              </div>
                              {errorContainer(runform, "video_price")}
                              <label className="d-inline-flex align-items-center mb-2 mt-3">Response time</label>
                              <div className=" mb-3 comn-gray-form-select ">
                                <select className="form-select  w-100" {...formAttr(runform, "video_time")} name="video_time">
                                  <option value="day"> Select days</option>
                                  <option value="2 Days"> 2 Days</option>
                                  <option value="3 Days"> 3 Days</option>
                                  <option value="4 Days"> 4 Days</option>
                                  <option value="5 Days"> 5 Days</option>
                                  <option value="6 Days"> 6 Days</option>
                                  <option value="7 Days"> 7 Days</option>
                                </select>
                                {errorContainer(runform, "video_time")}
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-3 comn-input-main service-fix-box">
                              <div className="comn-purple-txt d-flex align-items-center mb-3">
                                <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                  <path d="M12 2V10H2V2H12ZM13 0H1C0.45 0 0 0.45 0 1V11C0 11.55 0.45 12 1 12H13C13.55 12 14 11.55 14 11V7.5L18 11.5V0.5L14 4.5V1C14 0.45 13.55 0 13 0Z" fill="#7C64F8" />
                                </svg>
                                Video (24 hours delivery)
                              </div>

                              <div>
                                <label className="d-flex align-items-center mb-1">
                                  Price
                                  <span className="position-relative ms-auto">
                                    <div className="custm-toggel-switch diff-switch">
                                      <div className="form-check form-switch">
                                        <input className="form-check-input mt-0" type="checkbox" id="offer-status" onChange={(e) => checkDefault(e)} defaultChecked />
                                      </div>
                                    </div>
                                  </span>
                                </label>

                                {opencard ? (
                                  <div className="mb-3 position-relative">
                                    <input className="form-control comn-input-style ps-4 pe-3 remove-number-arrow" type="number" name="video24hr" value={video24hr} onChangeCapture={handlePrice} placeholder="24 hours delivery" />
                                    <span className="dollar-fix">$</span>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-4 col-md-6 mb-3 comn-input-main service-fix-box">
                              <button className="comn-btn-class w-100" type="submit">
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
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
