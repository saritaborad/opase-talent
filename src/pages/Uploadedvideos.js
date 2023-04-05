import React, { useEffect, useState } from "react";
import UserLayout from "../components/UserLayout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import { toast } from "react-toastify";
import DeleteModal from "./modal/DeleteModal";
import { Modal } from "react-bootstrap";

let arr = [];
let arr2 = [];

export default function UploadedVideos() {
  const [data, setData] = useState([]);
  const [videos, setVideos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const navigate = useNavigate("");

  const delete_userShow = () => setDeleteShow(true);
  const delete_userClose = () => setDeleteShow(false);

  useEffect(() => {
    getAllVideoShow();
  }, []);

  const getAllVideoShow = () => {
    const AddvideoItem = new Promise((resolve) => {
      resolve(PostApi(API_Path.GetAllVideo));
    });
    AddvideoItem.then((res) => {
      if (res.status === 200) {
        setData(res.data.data);
        let filterdData = res.data.data?.filter((item) => item.is_welcome === 1);
        setVideos(filterdData);
        // toast.success(res.data.message);
        setTimeout(() => {
          navigate(`/uploadedvideos`);
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleDelete = () => {
    let data = { deleteId: arr };

    const removeVideo = new Promise((resolve) => {
      resolve(PostApi(API_Path.GetAllVideo, data));
    });

    removeVideo.then((res) => {
      if (res.status === 200) {
        setDeleteShow(false);
        toast.success(res.data.message);
        getAllVideoShow();
        arr = [];
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleCheck = (e, id) => {
    setEdit(true);
    if (e.target.checked && !arr.includes(id)) {
      arr.push(id);
    } else {
      arr = arr.filter((item) => item !== id);
    }
  };

  // const handleChange = (e) => {
  //   let arr1 = [];
  //   let filtered1 = data?.filter((item) => item.is_welcome === parseInt(e.target.value));
  //   arr1 = filtered1;
  //   setVideos(arr1);
  // };

  return (
    <>
      <UserLayout>
        <div className="content-main-section">
          <div className="container-fluid ">
            <div className="row">
              <div className=" col-12 d-sm-flex mt-3">
                <div className="  mt-3">
                  <h5 style={{ color: "white", alignItems: "center", justifyContent: "center" }}>Profile videos</h5>
                </div>
                <div className="ms-auto d-flex mt-3 mt-sm-0  ">
                  <NavLink className="comn-btn-class  px-5 me-3" to="/profilevideo">
                    Add
                  </NavLink>
                  {edit && (
                    <button className="comn-btn-class  px-5" onClick={delete_userShow}>
                      Delete
                    </button>
                  )}
                </div>
              </div>

              <div className="col-12 mt-3">
                <div className="comn-black-bg d-block p-3">
                  <div className="row me-0 align-items-center">
                    {data !== undefined &&
                      data &&
                      data?.map((item, i) => {
                        return (
                          <div className="col-lg-2 col-md-3 col-sm-4 col-6 pe-0 mb-2 pb-1" key={item.id}>
                            <div className="uploaded-video-main mb-3">
                              <div className="uploaded-check-fix">
                                <div className="uploaded-check-list">
                                  <label className="cust-chk-bx">
                                    <input type="checkbox" onChange={(e) => handleCheck(e, item.id)} />
                                    <span className="cust-chkmark"></span>
                                  </label>
                                </div>
                              </div>
                              {item.is_welcome === 1 && <div className={item.is_welcome === 1 && "welcome-video-class w-auto h-auto"}>{item.is_welcome ? "Welcome video" : ""}</div>}
                              <video src={item.video_link} className="video-poster-img w-100" poster={item?.thubnail} alt="video Error" controls>
                                <source type="video/*"></source>
                              </video>
                              {/* <div className="video-play-btn">
                              <svgs
                                width="35"
                                height="35"
                                viewBox="0 0 27 27"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.2814 26.4079C6.19764 26.4079 0.455078 20.5837 0.455078 13.3993C0.455078 6.21479 6.19764 0.390625 13.2814 0.390625C20.3652 0.390625 26.1078 6.21479 26.1078 13.3993C26.1 20.5804 20.362 26.4 13.2814 26.4079ZM3.02035 13.623C3.08104 19.3484 7.69057 23.9487 13.336 23.918C18.9814 23.8871 23.5419 19.2369 23.5419 13.5111C23.5419 7.78538 18.9814 3.13515 13.336 3.10422C7.69057 3.0736 3.08104 7.67384 3.02035 13.3993V13.623ZM10.7162 19.2531V7.54537L18.412 13.3993L10.7162 19.2531Z"
                                  fill="white"
                                />
                              </svg>
                            </div> */}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal show={deleteShow} onHide={delete_userClose} size="sm" className="comn-modal-style" centered>
          <DeleteModal headerString={"Delete video"} bodyString={"Are you sure you want to delete video?"} closeModal={delete_userClose} callApi={handleDelete} />
        </Modal>
      </UserLayout>
    </>
  );
}
