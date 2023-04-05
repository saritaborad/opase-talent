import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import { PostApi } from "../api/api-service";
import UserLayout from "../components/UserLayout";
import { API_Path } from "../const";
import Reviewer_Photo from "../images/user.png";
import jwt_decode from "jwt-decode";
import moment from "moment";

export default function Review(params) {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    if (localStorage.getItem("opata_token") !== "undefined") {
      setId(jwt_decode(localStorage.getItem("opata_token")).id);
    }
    getReviewData(jwt_decode(localStorage.getItem("opata_token")).id);
  }, []);

  const getReviewData = (id) => {
    let data = {
      talentId: id,
      option: {
        sizePerPage: 5,
        search: "",
        totalRecord: 0,
        page: 0,
        sort: "id",
        order: "DESC",
      },
    };
    let GetAllReviewData = new Promise((resolve) => {
      resolve(PostApi(API_Path.GetAllReview, data));
    });
    GetAllReviewData.then((res) => {
      if (res.status === 200) {
        setData(res.data.data.reviews);
      } else {
        toast.error(res.data.message);
      }
    });
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
                    <h1 className="mb-0">Reviews</h1>
                  </div>
                </div>
              </div>
              {data !== undefined &&
                data &&
                data?.map((item, i) => {
                  return (
                    <div className="col-12 mt-3" key={i.id}>
                      <div className="comn-black-class p-3">
                        <div className="d-flex align-items-center mb-2">
                          <img referrerPolicy="no-referrer" src={item?.image && item?.image !== "null" ? item?.image : Reviewer_Photo} alt="Reviewer" width="50px" height="50px" />
                          <div className="ms-3 custmr-review-info">
                            <p className="reviewer-info">{item?.fullname}</p>
                            <p className="d-flex align-items-center justify-content-start ">
                              {moment(item?.updated_at).format("DD/MM/YYYY")}
                              <bdi className="ms-3 me-1">{item?.review_rating}</bdi>
                              <Rating readonly fillColor="#EE9D26" emptyColor="#6C6A81" initialValue={item?.review_rating} iconsCount={5} size={20} allowHalfIcon={true} />
                            </p>
                          </div>
                        </div>
                        <p>{item.review_desc}</p>
                      </div>
                    </div>
                  );
                })}
              {data?.length === 0 && (
                <div className="mt-5" style={{ fontSize: "20px", textAlign: "center" }}>
                  No data found
                </div>
              )}
            </div>
          </div>
        </div>
      </UserLayout>
    </>
  );
}
