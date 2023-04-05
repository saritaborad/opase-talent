import React, { useEffect, useState } from "react";
import UserLayout from "../components/UserLayout";
import Cloud_Img from "../images/cloud-upload.svg";
import { Link, useNavigate } from "react-router-dom";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import { toast } from "react-toastify";

export default function ProfileVideo() {
  const [data, setData] = useState([]);
  const [video, setVideo] = useState("");
  const [videodes, setVideodes] = useState("");
  const [highlight, setHighlight] = useState(false);
  const [welcome, setWelcome] = useState("");
  const [videoData, setVideoData] = useState("");

  const navigate = useNavigate("");

  useEffect(() => {
    getAllVideoShow();
  }, []);

  const getAllVideoShow = () => {
    const AddvideoItem = new Promise((resolve) => {
      resolve(PostApi(API_Path.GetAllVideo));
    });
    AddvideoItem.then((res) => {
      if (res.status === 200) {
        let arr = res.data.data.permitedVideo.slice(0, 5);
        setVideoData([...arr]);
        setData(res.data.data);
        // toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const AddvideoData = () => {
    if (video === "" || videodes === "") {
      if (video === "") {
        document.getElementById("videoErr").style.display = "block";
        document.getElementById("aboutErr").style.display = "block";
      }
      if (!welcome) {
        document.getElementById("checkErr").style.display = "block";
      }
    } else {
      let formData = new FormData();
      for (const key of Object.keys(video)) {
        formData.append("video", video[key]);
      }
      formData.append("videodes", videodes);
      // formData.append("video", video);
      formData.append("isWelcome", welcome === 1 ? 1 : 0);

      // for (const key of Object.keys(video)) {
      //   formData.append("video", video[key]);
      // }
      const AddvideoItem = new Promise((resolve) => {
        resolve(PostApi(API_Path.addVideo, formData));
      });
      AddvideoItem.then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setTimeout(() => {
            navigate(`/uploadedvideos`);
          }, 1300);
          setVideo("");
          setVideodes("");
        } else if (res.status === 401) {
          if (localStorage.getItem("opata_token")) {
            localStorage.removeItem("opata_token");
          }
        } else {
          toast.error(res.data.message);
        }
      });
    }
  };

  const handlehighlight = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(true);
  };

  const handleunhighlight = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);

    let dt = e.dataTransfer;
    let files = dt.files;

    setVideo(files[0]);
  };

  const handleUpload = (id) => {
    let data = { requestId: id };
    const uploadVideo = new Promise((resolve) => {
      resolve(PostApi(API_Path.GetAllVideo, data));
    });
    uploadVideo.then((res) => {
      if (res.status === 200) {
        // toast.success(res.data.message);
        toast.success("Video Uploaded Successfully!");
        setTimeout(() => {
          navigate(`/uploadedvideos`);
        }, 1300);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleViewAll = () => {
    setVideoData([...data.permitedVideo]);
  };
  const handleCheck = (e) => {
    e.target.value === "welcome" ? setWelcome(1) : setWelcome(2);
    if (e.target.checked) {
      document.getElementById("checkErr").style.display = "none";
    }
  };

  return (
    <>
      <UserLayout>
        <div className="content-main-section">
          <div className="container-fluid">
            <div className="row">
              {/* <div className="col-12 mt-3">
                <div className="comn-title-main d-block  d-sm-flex justify-content-between">
                  <h1 className="mb-0">Upload Video</h1>
                </div>
              </div> */}
              <div className="col-12 mt-3">
                <div className="profile-video-bg-class">
                  <div className="bank-account-class d-flex align-items-center justify-content-between">
                    <span>Upload video</span>
                  </div>

                  <div className="row p-3">
                    <div className="col-lg-4 col-sm-6 mx-auto my-3">
                      <label className="comn-label-class my-3">Video</label>
                      <div className={highlight ? "custom-file-drop-area highlight" : "custom-file-drop-area"} onDragEnter={handlehighlight} onDragOver={handlehighlight} onDragLeave={handleunhighlight} onDrop={handleDrop}>
                        <label className="video-bg-select" htmlFor="video-bg-upload">
                          {video && video.length > 0 ? (
                            <div>
                              {video && (
                                <div className="video-upload-fix m-auto">
                                  <video src={URL.createObjectURL(video[0])}>
                                    <source src={URL.createObjectURL(video[0])} />
                                  </video>
                                </div>
                              )}
                            </div>
                          ) : (
                            <>
                              <img src={Cloud_Img} alt="Upload File" className="img-fluid" />
                              <div className="upload-text">Choose file or drag file here</div>
                            </>
                          )}
                          <span className="choose-file">Choose file</span>
                        </label>
                        <input
                          id="video-bg-upload"
                          accept="video/*"
                          name="upload_offer_img"
                          type="file"
                          onChange={(e) => {
                            setVideo(e.target.files);
                            if (video === "") {
                              document.getElementById("videoErr").style.display = "none";
                            }
                          }}
                          multiple
                          className="d-none "
                        />
                      </div>
                      <span id="videoErr" style={{ display: "none" }} className="input-feedback text-danger">
                        Video is required !
                      </span>

                      {/* <div>
                        {video && (
                          <div className="video-upload-fix m-auto">
                            <video>
                              <source src={URL.createObjectURL(video)} />
                            </video>
                          </div>
                        )}
                      </div> */}

                      <div className="mt-3">
                        <label className="comn-label-class mb-3">Add caption</label>
                        <textarea
                          type="text"
                          onChange={(e) => {
                            setVideodes(e.target.value);
                            document.getElementById("aboutErr").style.display = "none";
                          }}
                          name="videodes"
                          value={videodes}
                          className="form-control comn-input-style about-info-txtarea h-auto"
                          placeholder="Say something about video..."
                          rows={4}
                        />
                        <span id="aboutErr" style={{ display: "none" }} className="input-feedback text-danger">
                          About is required !
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className="ms-2">
                          <label className="cust-chk-bx purple-checkmark">
                            <input type="radio" name="welcome" value="welcome" onChange={handleCheck} />
                            <span className="cust-chkmark "></span>
                            Upload as welcome video
                          </label>
                        </div>
                        <div className="ms-2 mt-3">
                          <label className="cust-chk-bx purple-checkmark">
                            <input type="radio" name="welcome" value="attach" onChange={handleCheck} />
                            <span className="cust-chkmark purple-checkmark"></span>
                            Upload as attach video
                          </label>
                        </div>
                        <span id="checkErr" style={{ display: "none" }} className="input-feedback text-danger">
                          Please select any option !
                        </span>
                      </div>

                      <div className=" my-4 d-flex justify-content-center">
                        <button
                          className="comn-btn-class cancle-btn-class w-50 me-3"
                          onClick={() => {
                            setVideo("");
                            setVideodes("");
                            if (document.getElementById("aboutErr") || document.getElementById("videoErr")) {
                              document.getElementById("aboutErr").style.display = "none";
                              document.getElementById("videoErr").style.display = "none";
                            }
                          }}
                        >
                          Cancel
                        </button>

                        <button className="comn-btn-class w-50 ms-3" type="submit" onClick={() => AddvideoData()}>
                          Submit
                        </button>
                      </div>
                    </div>

                    <div className="col-sm-6  mx-auto my-3">
                      <div className="profile-video-right-bg my-3 p-4">
                        <div className="opase-case-transaction mb-3">
                          <span>User’s permitted videos</span>
                          <bdi onClick={handleViewAll}>View all</bdi>
                        </div>
                        <div className="row">
                          {videoData !== undefined &&
                            videoData.length > 0 &&
                            videoData?.map((item, i) => {
                              return (
                                <div className="col-lg-4 col-6 mb-3" key={i}>
                                  <Link to="#">
                                    <div className="uploaded-video-main img-black-shadow">
                                      <div className="video-download-icon" onClick={() => handleUpload(item.id)}>
                                        <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M4 13H10V7H14L7 0L0 7H4V13ZM7 2.83L9.17 5H8V11H6V5H4.83L7 2.83ZM0 15H14V17H0V15Z" fill="white" />
                                        </svg>
                                      </div>
                                      <video src={item.video_link} poster={item.thubnail} className="img-fluid video-poster-img me-3" alt="video Error" controls>
                                        <source src={item.video_link} type="video/*"></source>
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

                        {videoData === [] && <h5 className="text-center">No data found</h5>}
                      </div>
                    </div>
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
