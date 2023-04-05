import React, { useEffect, useState } from "react";
import UserLayout from "../components/UserLayout";
import Instagram_Icon from "../images/instagram.svg";
import youtube_Icon from "../images/youtube.png";
import Snapchat_Icon from "../images/snapchat.svg";
import Twitter_Icon from "../images/Twitter.svg";
import tiktok_Icon from "../images/tiktok.png";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import { toast } from "react-toastify";

export default function SocialMediaAccount() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getAllSocialMedia();
  }, []);

  const getAllSocialMedia = () => {
    const AllSocialMediaData = new Promise((resolve) => {
      resolve(PostApi(API_Path.GetAllSocial));
    });
    AllSocialMediaData.then((res) => {
      if (res.status === 200) {
        setData(res.data.data);
        setLoaded(true);
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
                    <h1 className="mb-0">Social media accounts</h1>
                  </div>
                </div>
              </div>
              {loaded && data?.instagram_url === "" && data?.facebook_url === "" && data?.twitter_url === "" && data?.snapchat_url === "" && data.tiktok_url === "" && <h6 className="text-center pt-5 mt-5">No data found</h6>}
              {loaded && data?.instagram_url !== "" && (
                <div className="col-lg-6 mt-3">
                  <div className="comn-black-class d-sm-flex align-items-center p-3">
                    <div className="d-flex align-items-center accounter-img">
                      <img src={Instagram_Icon} className="img-fluid" alt="Reviewer" />
                      <div className="ms-3 custmr-account-info">
                        <p className="accounter-info">{data.instagram_url ? data.instagram_url : "https://www.instagram.com/"}</p>
                        <p className="d-flex align-items-center justify-content-start mt-1">{/* Fans <bdi className="mx-2">{formatNum(data.instagram_friend_number ? data.instagram_friend_number : "0")}</bdi> */}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {loaded && data?.youtube_url !== "" && (
                <div className="col-lg-6 mt-3">
                  <div className="comn-black-class d-sm-flex align-items-center p-3">
                    <div className="d-flex align-items-center accounter-img">
                      <div>
                        <img src={youtube_Icon} alt="Reviewer " />
                      </div>
                      <div className="ms-3 custmr-account-info">
                        <p className="accounter-info">{data.youtube_url ? data.youtube_url : "https://www.facebook.com/"}</p>
                        <p className="d-flex align-items-center justify-content-start mt-1">{/* Fans <bdi className="mx-2">{data.facebook_friend_number ? data.facebook_friend_number : "0"}</bdi> */}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {loaded && data?.twitter_url !== "" && (
                <div className="col-lg-6 mt-3">
                  <div className="comn-black-class d-sm-flex align-items-center p-3">
                    <div className="d-flex align-items-center accounter-img">
                      <img src={Twitter_Icon} alt="Reviewer" />
                      <div className="ms-3 custmr-account-info">
                        <p className="accounter-info">{data.twitter_url ? data.twitter_url : "https://www.twitter.com/"}</p>
                        <p className="d-flex align-items-center justify-content-start mt-1">{/* Fans <bdi className="mx-2">{data.twitter_friend_number ? data.twitter_friend_number : "0"}</bdi> */}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {loaded && data?.snapchat_url !== "" && (
                <div className="col-lg-6 mt-3">
                  <div className="comn-black-class d-sm-flex align-items-center p-3">
                    <div className="d-flex align-items-center accounter-img">
                      <img src={Snapchat_Icon} alt="Reviewer" />
                      <div className="ms-3 custmr-account-info">
                        <p className="accounter-info">{data.snapchat_url ? data.snapchat_url : "https:/www.snapchat.com"}</p>
                        <p className="d-flex align-items-center justify-content-start mt-1">{/* Fans <bdi className="mx-2">{data.snapchat_friend_number ? data.snapchat_friend_number : "0"}</bdi> */}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {loaded && data.tiktok_url !== "" && data.tiktok_friend_number !== "" && (
                <div className="col-lg-6 mt-3">
                  <div className="comn-black-class d-sm-flex align-items-center p-3">
                    <div className="d-flex align-items-center accounter-img">
                      <img src={tiktok_Icon} alt="Reviewer" />
                      <div className="ms-3 custmr-account-info">
                        <p className="accounter-info">{data.tiktok_url ? data.tiktok_url : ""}</p>
                        <p className="d-flex align-items-center justify-content-start mt-1">{/* Fans <bdi className="mx-2">{data.tiktok_friend_number ? data.tiktok_friend_number : ""}</bdi> */}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </UserLayout>
    </>
  );
}
