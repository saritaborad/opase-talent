import React, { useEffect, useState } from "react";
import UserLayout from "../components/UserLayout";
import OpaseProfile from "../images/user.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import { toast } from "react-toastify";
import moment from "moment";

export default function RequestDetails(params) {
  const [data, setData] = useState([]);
  const [videoData, setVideoData] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  let id;

  useEffect(() => {
    getRequestDetails();
  }, []);

  let getRequestDetails = (status) => {
    id = location.state?.id;
    let data = { id: id, status: status };

    const addRqDetail = new Promise((resolve) => {
      resolve(PostApi(API_Path.AddRequestDetails, data));
    });
    addRqDetail.then((res) => {
      if (res.status === 200) {
        let arr = res.data.data?.uploadVideo?.slice(0, 5);
        setVideoData([...arr]);
        setData(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleVideoClick = (id, status) => {
    let data = { id: id, status: status };

    const addRqDetail = new Promise((resolve) => {
      resolve(PostApi(API_Path.AddRequestDetails, data));
    });
    addRqDetail.then((res) => {
      if (res.status === 200) {
        setData(res.data.data);
        navigate(`/uploadvideo`, { state: { id: id } });
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleAccept = (item, status) => {
    let data = { id: item.id, status: status };

    const addRqDetail = new Promise((resolve) => {
      resolve(PostApi(API_Path.AddRequestDetails, data));
    });
    addRqDetail.then((res) => {
      if (res.status === 200) {
        setData(res.data.data);
        // navigate("/requests");
        toast.success("Request Accepted!!");
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleClose = (item, status) => {
    let data = { id: item.id, status: status };

    const addRqDetail = new Promise((resolve) => {
      resolve(PostApi(API_Path.AddRequestDetails, data));
    });
    addRqDetail.then((res) => {
      if (res.status === 200) {
        setData(res.data.data);
        navigate(`/requests`);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleViewAll = () => {
    setVideoData([...data?.uploadVideo]);
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
                    <h1 className="mb-0">Requests</h1>
                  </div>
                </div>

                <div className="comn-black-bg mt-3 p-0">
                  <div className="bank-account-class d-flex align-items-center justify-content-between">
                    <span>View details</span>
                  </div>
                  <div className="row p-3">
                    <div className="col-lg-2 req-info-img">
                      <img referrerPolicy="no-referrer" src={data?.image && data?.image !== "null" ? data?.image : OpaseProfile} alt="about info" />
                    </div>
                    <div className="col-lg-5 col-sm-12 mt-3 mt-lg-0">
                      <div className="about-info-txt-main">
                        <bdi>About information</bdi>
                        <p>{data.about}</p>
                        <ul className="about-name-info">
                          <li>
                            <label>Name</label>
                            <bdi>: {data?.fullname}</bdi>
                          </li>
                          <li>
                            <label>Occasion</label>
                            <bdi>: {data?.selectoccasion}</bdi>
                          </li>
                          {/* <li>
                            <label>Type</label> */}
                          {/* <bdi>: 24 hour delivery</bdi> */}
                          {/* </li>  */}
                          <li>
                            <label>Amount</label>
                            <bdi>: $ {data?.hour_price ? data?.hour_price : "0"}</bdi>
                          </li>
                          <li>
                            <label>Request date</label>
                            <bdi>: {moment(data?.created_at).format("DD/MM/YYYY")}</bdi>
                          </li>
                          <li>
                            <label>Delivery time</label>
                            <bdi>: {moment(data?.updated_at).format("DD/MM/YYYY")}</bdi>
                          </li>
                          <li>
                            <label>Status</label>
                            <bdi className={data?.request_status === 0 ? "yellow-txt" : data?.request_status === 1 ? "purple-txt" : data?.request_status === 2 ? "com-green-txt" : data?.request_status === 3 ? "com-gray-txt" : data?.request_status === 4 && "com-red-txt"}>: {data?.request_status === 1 ? "Active" : data?.request_status === 0 ? "Pending" : data?.request_status === 2 ? "Completed" : data?.request_status === 3 ? "Decline" : data?.request_status === 4 && "Cancelled"}</bdi>
                          </li>
                        </ul>
                        <div className="d-sm-flex d-block">
                          {data?.attach_video && (
                            <div>
                              <div className="uploaded-video-main ">
                                <div className="position-relative">
                                  <video src={data?.attach_video} className="video-poster-img" alt="video Error" width="200" controls>
                                    <source src={data?.attach_video} />
                                  </video>

                                  {/* <div className="video-play-btn">
                                    <svg
                                      width="30"
                                      height="30"
                                      viewBox="0 0 61 61"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M30.6802 60.0015C14.0973 59.9833 0.658836 46.5625 0.640625 30.0015V29.4015C0.970854 12.9151 14.5627 -0.214628 31.0727 0.00414424C47.5827 0.222916 60.821 13.7082 60.7131 30.1975C60.6052 46.6869 47.1916 59.9982 30.6802 60.0015ZM30.6321 54.0015H30.6802C43.9478 53.9883 54.6944 43.2397 54.6878 29.9895C54.6812 16.7394 43.9238 6.00152 30.6562 6.00152C17.3885 6.00152 6.63114 16.7394 6.62451 29.9895C6.61788 43.2397 17.3645 53.9883 30.6321 54.0015ZM39.6921 42.0015H33.6841V18.0015H39.6921V42.0015ZM27.6762 42.0015H21.6683V18.0015H27.6762V42.0015Z"
                                        fill="white"
                                      />
                                    </svg>
                                  </div> */}
                                </div>
                              </div>
                            </div>
                          )}
                          {data?.instruction && (
                            <div className="video-instruction-info ms-0 ms-sm-4 mt-3 mt-sm-0">
                              <bdi>Instruction</bdi>
                              <p>{data?.instruction}</p>
                            </div>
                          )}
                        </div>
                        {data !== undefined && data.id && data.request_status === 1 && (
                          <div className="mt-5 col-sm-6">
                            <button className="comn-btn-class w-100" type="submit">
                              <span onClick={() => handleVideoClick(data.id, 2)}>Upload video</span>
                            </button>
                          </div>
                        )}
                        {data !== undefined && data.request_status === 0 && (
                          <div className=" my-4 d-flex col-sm-6">
                            <button className="comn-btn-class cancle-btn-class w-100 me-3" type="submit" onClick={() => handleClose(data.id, 3)}>
                              Decline
                            </button>
                            <button className="comn-btn-class w-100" type="submit">
                              <span onClick={() => handleAccept(data, 1)}>Accept</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {videoData?.length > 0 && data?.request_status === 2 && (
                      <div className="col-sm-5  mx-auto my-3">
                        <div className="profile-video-right-bg my-3 p-4">
                          <div className="opase-case-transaction mb-3">
                            <span>Requested videos</span>
                            <bdi onClick={handleViewAll}>View all</bdi>
                          </div>
                          <div className="row">
                            {data?.uploadVideo !== undefined &&
                              data?.uploadVideo.length > 0 &&
                              data?.uploadVideo?.map((item, i) => {
                                return (
                                  <div className="col-lg-4 col-6 mb-3" key={i}>
                                    <Link to="#">
                                      <div className="uploaded-video-main img-black-shadow">
                                        {/* <div className="video-download-icon" onClick={() => handleUpload(item.id)}>
                                        <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M4 13H10V7H14L7 0L0 7H4V13ZM7 2.83L9.17 5H8V11H6V5H4.83L7 2.83ZM0 15H14V17H0V15Z" fill="white" />
                                        </svg>
                                      </div> */}
                                        <video src={item.video_link} className="img-fluid video-poster-img me-3" alt="video Error" controls>
                                          <source type="video/*"></source>
                                        </video>
                                        {/* <img src={Video_1} className="img-fluid video-  poster-img" alt="video Error" /> */}
                                        {/* <div className="video-play-btn">
                                                                            <svg width="35" height="35" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path
                                                                                    d="M13.2814 26.4079C6.19764 26.4079 0.455078 20.5837 0.455078 13.3993C0.455078 6.21479 6.19764 0.390625 13.2814 0.390625C20.3652 0.390625 26.1078 6.21479 26.1078 13.3993C26.1 20.5804 20.362 26.4 13.2814 26.4079ZM3.02035 13.623C3.08104 19.3484 7.69057 23.9487 13.336 23.918C18.9814 23.8871 23.5419 19.2369 23.5419 13.5111C23.5419 7.78538 18.9814 3.13515 13.336 3.10422C7.69057 3.0736 3.08104 7.67384 3.02035 13.3993V13.623ZM10.7162 19.2531V7.54537L18.412 13.3993L10.7162 19.2531Z"
                                                                                    fill="white"
                                                                                />
                                                                            </svg>
                                                                        </div> */}
                                      </div>
                                    </Link>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    </>
  );
}
