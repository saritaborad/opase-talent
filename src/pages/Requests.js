import React, { useEffect, useState } from "react";
import UserLayout from "../components/UserLayout";
import { Dropdown } from "react-bootstrap";
import RtdDatatable from "../components/DataTable/RtdDatatable";
import { API_Path } from "../const";
import { PostApi } from "../api/api-service";
import { ToastContainer, toast } from "react-toastify";
import Moment from "react-moment";
import OpaseProfile from "../images/user.png";
import { useNavigate } from "react-router-dom";

export default function Requests(props) {
  const navigate = useNavigate();
  const [myArr, setmyArr] = useState([]);
  const [option, set_option] = useState({
    sizePerPage: 10,
    search: "",
    totalRecord: 0,
    page: 0,
    sort: "id",
    order: "DESC",
  });

  const columns = [
    {
      value: "image",
      label: "Photo",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return (
            <div className="d-flex align-items-center req-tble-profile">
              {data[i].image && data[i]?.image !== "null" ? <img referrerPolicy="no-referrer" src={data[i].image} alt="product" className="img-fluid" /> : <img src={OpaseProfile} alt="product" className="img-fluid" />}
              {/* <img src={OpaseProfile} alt="product" className="img-fluid" /> */}
            </div>
          );
        },
      },
    },
    {
      value: "fullname",
      label: "User’s Name",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      value: "request_status",
      label: "Status",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data, i) => {
          return (
            <div className="d-flex align-items-center req-tble-profile">
              <span className="comn-status-class">
                <p className={data[i].request_status === 0 ? "pending-class" : data[i].request_status === 1 ? "active-class" : data[i].request_status === 2 ? "com-green-txt" : data[i].request_status === 3 ? "com-gray-txt" : data[i].request_status === 4 && "com-red-txt"}> {data[i].request_status === 0 ? "Pending" : data[i].request_status === 1 ? "Active" : data[i].request_status === 2 ? "Completed" : data[i].request_status === 3 ? "Decline" : data[i].request_status === 4 && "Cancelled"}</p>
              </span>
            </div>
          );
        },
      },
    },
    {
      value: "standard_price",
      label: "Amount",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data, i) => {
          return <span>$ {formatNum(data[i].standard_price)}</span>;
        },
      },
    },
    {
      value: "created_at",
      label: "Request Date",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data, i) => {
          return <Moment format="DD/MM/YYYY">{data[i].created_at}</Moment>;
        },
      },
    },
    {
      value: "created_at",
      label: "Delivery Time",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data, i) => {
          return <Moment format="DD/MM/YYYY">{data[i].created_at}</Moment>;
        },
      },
    },
    {
      value: "_id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return (
            <div className="table-ed-drop">
              <Dropdown drop="left">
                <Dropdown.Toggle className="table-dropdown-btn" id="dropdown-basic">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                  </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu onClick={() => handleuserData(data[i].id)}>
                  <Dropdown.Item>
                    <bdi className="d-flex align-items-center mx-2">
                      <svg width="16" height="16" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 14C8.35987 14.0204 6.7367 13.6664 5.254 12.965C4.10469 12.4042 3.07265 11.6297 2.213 10.683C1.30243 9.7041 0.585467 8.56164 0.1 7.31598L0 6.99998L0.105 6.68398C0.590815 5.43941 1.30624 4.29725 2.214 3.31698C3.07334 2.37029 4.10504 1.59584 5.254 1.03498C6.73671 0.333567 8.35988 -0.0204101 10 -2.11214e-05C11.6401 -0.0203749 13.2633 0.333601 14.746 1.03498C15.8953 1.59571 16.9274 2.37017 17.787 3.31698C18.6993 4.29453 19.4165 5.43734 19.9 6.68398L20 6.99998L19.895 7.31598C18.3262 11.3998 14.3742 14.0693 10 14ZM10 1.99998C6.59587 1.89331 3.47142 3.87507 2.117 6.99998C3.4712 10.1251 6.59579 12.1069 10 12C13.4041 12.1064 16.5284 10.1247 17.883 6.99998C16.5304 3.87356 13.4047 1.89106 10 1.99998ZM10 9.99998C8.55733 10.0095 7.30937 8.99734 7.02097 7.58375C6.73256 6.17017 7.48427 4.75 8.81538 4.19364C10.1465 3.63728 11.6852 4.10011 12.4885 5.29849C13.2919 6.49686 13.1354 8.09606 12.115 9.11598C11.5563 9.68124 10.7948 9.99954 10 9.99998Z" fill="#fff" />
                      </svg>
                      <span className="ms-2 text-white">Details</span>
                    </bdi>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          );
        },
      },
    },
  ];
  const [request, setRequest] = useState("");

  useEffect(() => {
    getRequestData();
  }, []);

  const getRequestData = () => {
    let data = { option: option };
    let GetAllRequestData = new Promise((resolve) => {
      resolve(PostApi(API_Path.GetAllRequest, data));
    });
    GetAllRequestData.then((res) => {
      if (res.status === 200) {
        set_option({ ...option, totalRecord: res.data.data.totalRecord });
        setRequest(res.data.data);
        setmyArr(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleChange = (e) => {
    let arr1 = [];
    let filtered = request.filter((item) => item.request_status === parseInt(e.target.value));
    arr1 = filtered;
    setmyArr(arr1);

    if (e.target.value === "5") {
      setmyArr(request);
    }
  };

  const handleuserData = (id) => {
    navigate(`/requestdetails`, { state: { id: id } });
  };

  const tableCallBack = (option) => {
    set_option(option);
    getRequestData();
  };

  const formatNum = (num) => {
    return String(num)?.replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1,");
  };

  return (
    <UserLayout>
      <div className="content-main-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 mt-3">
              <div className="d-block d-sm-flex align-items-center">
                <div className="comn-title-main">
                  <h1 className="mb-0">Requests</h1>
                </div>
                <div className="ms-auto d-block d-sm-flex  mt-3 mt-sm-0">
                  <div>
                    <div className="m-sm-0 me-sm-3 mb-3 payment-rgt-part comn-gray-form-select">
                      <select className="form-select  w-100" name="all" onChange={handleChange}>
                        <option className="cmn-online-payment text-center" value="5" selected>
                          All
                        </option>
                        <option className="cmn-online-payment text-center" value="1">
                          Active
                        </option>
                        <option className="cmn-online-payment text-center" value="3">
                          Declined
                        </option>
                        <option className="cmn-online-payment text-center" value="2">
                          Completed
                        </option>
                        <option className="cmn-online-payment text-center" value="0">
                          Pending
                        </option>
                        <option className="cmn-online-payment text-center" value="4">
                          Cancelled
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-3">
              <div className="comn-table-black-bg">
                <div className="mt-3">
                  <RtdDatatable option={option} columns={columns} data={myArr} tableCallBack={tableCallBack} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </UserLayout>
  );
}
