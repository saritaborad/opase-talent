import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PostApi } from "../api/api-service";
import UserLayout from "../components/UserLayout";
import { API_Path } from "../const";
import Cloud_Img from "../images/cloud-upload.svg";

export default function UploadVideo() {
  const [video, setVideo] = useState("");
  const [videodes, setVideodes] = useState("");
  const navigate = useNavigate("");
  const location = useLocation();

  const AddvideoData = () => {
    let id = location.state.id;
    let formData = new FormData();
    formData.append("video", video);
    formData.append("videodes", videodes);
    formData.append("requestId", id);
    const AddvideoItem = new Promise((resolve) => {
      resolve(PostApi(API_Path.addVideo, formData));
    });
    AddvideoItem.then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate(`/requests`);
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const videoFlie = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleClose = () => {
    navigate(`/requests`);
  };

  return (
    <>
      <UserLayout>
        <div className="content-main-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 mt-3">
                <div className="comn-title-main d-block  d-sm-flex justify-content-between">
                  <h1 className="mb-0">Upload video</h1>
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="comn-black-bg">
                  <div className="row">
                    <div className="col-lg-4 col-md-6 m-auto">
                      <label className="comn-label-class px-3">Video</label>
                      <div className=" mb-3 p-3 ">
                        <label className="video-bg-select" htmlFor="video-bg-upload">
                          <img src={Cloud_Img} alt="Upload File" className="img-fluid" />
                          <div className="upload-text">{video ? "Uploaded" : "Upload Video"}</div>
                          <span className="choose-file">Choose File</span>
                        </label>
                        <input id="video-bg-upload" name="upload_offer_img" type="file" className="d-none " accept="video/*" onChange={(e) => videoFlie(e)} multiple />
                      </div>
                      <div className="mt-3">
                        <label className="comn-label-class mb-3">Add caption</label>
                        <textarea type="text" onChange={(e) => setVideodes(e.target.value)} name="videodes" value={videodes} className="form-control comn-input-style about-info-txtarea h-auto" placeholder="Say something about video..." rows={4} />
                      </div>
                      <div className="my-4 d-flex justify-content-center">
                        <button className="comn-btn-class cancle-btn-class w-100 me-3" type="submit" onClick={() => handleClose()}>
                          Cancel
                        </button>
                        <button className="comn-btn-class w-100 ms-3" type="submit" onClick={() => AddvideoData()}>
                          Submit
                        </button>
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
