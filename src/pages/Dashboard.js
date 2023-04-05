import React, { useState, useEffect } from "react";
import UserLayout from "../components/UserLayout";
import Dash_1 from "../images/dash-t-1.svg";
import Dash_2 from "../images/dash-t-2.svg";
import Dash_3 from "../images/dash-t-3.svg";
import Dash_4 from "../images/dash-t-4.svg";
import Dash_5 from "../images/dash-t-5.svg";
import Chart from "react-apexcharts";
import RtdDatatable from "../components/DataTable/RtdDatatable";
import { Link, useNavigate } from "react-router-dom";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import { toast } from "react-toastify";
import moment from "moment";
import Moment from "react-moment";

let newArrX = [];
let newArrY = [];
let color = [];
let newArr1X = [];
let newArr1Y = [];
let color1 = [];
let donutData = [];

export default function Dashboard(params) {
  const navigate = useNavigate();
  const [dashboardDetails, setDashboardDetails] = useState({});
  const [graphData, setGraphData] = useState([]);
  const [graphYData, setGraphYData] = useState([]);
  const [graphCData, setGraphCData] = useState([]);
  const [graphCYData, setGraphCYData] = useState([]);
  const [PendingData, setPendingData] = useState([]);
  const [donutChart, setDonutchart] = useState([]);
  const [cashoutData, setCashoutData] = useState([]);

  const [loaded, setLoaded] = useState(false);

  // const [option, set_option] = useState({
  //   sizePerPage: 10,
  //   search: "",
  //   totalRecord: 0,
  //   page: 0,
  //   sort: "id",
  //   order: "DESC",
  // });

  useEffect(() => {
    GetDashBoardData("today");
    getRevenueChartData("today");
    getCashoutDetails();
  }, []);

  const GetDashBoardData = (name) => {
    const data = { graph: name };
    const addServiceDetails = new Promise((resolve) => {
      resolve(PostApi(API_Path.dashboardData, data));
    });
    addServiceDetails.then((res) => {
      if (res.status === 200) {
        res.data.data.graph.map((item) => {
          newArrX.push(item.x);
          if (!newArrY.includes(item.y)) {
            newArrY.push(item.y);
          }
          color.push("#fff");
        });
        donutData = [];
        donutData.push(res.data.data?.request?.chat);
        donutData.push(res.data.data?.request?.videos);
        donutData.push(res.data.data?.request?.videos24);
        setDonutchart(donutData);
        setGraphData(newArrX);
        setGraphYData(newArrY);
        setDashboardDetails(res.data.data);
        setPendingData(res.data.data.pending);
        setLoaded(true);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const getRequestData = (id, status) => {
    const data = { id: id, status: status };
    const addServiceDetails = new Promise((resolve) => {
      resolve(PostApi(API_Path.AddRequestDetails, data));
    });
    addServiceDetails.then((res) => {
      if (res.status === 200) {
        GetDashBoardData();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const getRevenueChartData = (type) => {
    let arr = [];
    const data = { graph: type };
    const getRevenueChartData = new Promise((resolve) => {
      resolve(PostApi(API_Path.GetRevenueChart, data));
    });
    getRevenueChartData.then((res) => {
      if (res.status === 200) {
        res.data.data.map((item) => {
          let obj = {};
          obj.x = item.y;
          obj.y = item.x;
          arr.push(obj);
          newArr1X.push(item.x);
          if (!newArr1Y.includes(item.y)) {
            newArr1Y.push(item.y);
            color1.push("#fff");
          }
        });

        setGraphCData(arr);
        setGraphCYData(newArr1Y);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const getCashoutDetails = () => {
    const addCashoutDetails = new Promise((resolve) => {
      resolve(PostApi(API_Path.GetCashoutData));
    });
    addCashoutDetails.then((res) => {
      if (res.status === 200) {
        if (res.data.data.length > 0) {
          setCashoutData(res.data.data.slice(0, 6));
        }
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleAccept = () => {
    // toast.success("Request Accepted!!");
    navigate("/requests");
  };

  const formatNum = (num) => {
    return String(num)?.replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1,");
  };
  const handle_click = (name) => {
    navigate(name);
  };

  // ================= Chart-1 ================= //
  const chart1 = {
    series: [
      {
        data: graphCData,
      },
    ],

    grid: {
      show: true,
      borderColor: "rgba(255, 255, 255, .2)",
      strokeDashArray: 1,
      position: "back",
      yaxis: {
        lines: {
          show: true,
        },
      },
    },

    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      // type: "datetime",
      categories: loaded && graphCYData,

      labels: {
        show: true,
        style: {
          colors: color1,
          fontSize: "12px",
          fontWeight: 400,
          cssclassName: "apexcharts-xaxis-label",
        },
      },

      axisTicks: {
        show: false,
      },

      tooltip: {
        enabled: false,
      },

      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      tooltip: {
        y: {
          formatter: function (val) {
            return `$${val}`;
          },
        },
      },

      labels: {
        show: true,
        style: {
          colors: ["#fff"],
          fontSize: "12px",
          fontWeight: 400,
          cssclassName: "apexcharts-xaxis-label",
        },
      },

      axisTicks: {
        show: false,
      },

      axisBorder: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        colors: {
          upward: "#31A54B",
          downward: "#1A2BB1",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  // ================= Chart-2 ================= //
  const chart2 = {
    series: donutChart,
    chart: {
      type: "donut",
      height: 300,
      fontFamily: "Roboto",
      color: "#fff",
      zoom: {
        enabled: true,
      },
    },
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      width: 0,
      dashArray: 0,
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val?.toFixed(2) + "%";
      },
    },
    legend: {
      show: true,
      position: "bottom",
      floating: false,
      verticalAlign: "bottom",
      fontSize: "16px",
      fontFamily: "Roboto",
      fontWeight: 500,
      labels: {
        colors: "#fff",
      },

      markers: {
        radius: 10,
        width: 12,
        height: 12,
        strokeWidth: 1,
        strokeColor: ["#7ED957", "#FFB946", "#EB5757"],
        fillColors: "000",
      },

      itemMargin: {
        horizontal: 20,
        vertical: 0,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: false,
              color: "#fff",
              fontSize: "24px",
            },
          },
          size: "65%",
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    labels: ["Chats", "Videos", "Videos (24 hours delivery)"],
    colors: ["#7ED957", "#FFB946", "#EB5757"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
            color: "#fff",
          },
        },
      },
    ],
  };

  // ================= Chart-3 ================= //

  const chart3 = {
    series: [
      {
        name: "Visiters",
        data: graphData,
      },
    ],
    fill: {
      opacity: 1,
    },
    chart: {
      height: 300,
      type: "area",
      fontFamily: "Roboto",
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#7C64F8"],
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      width: 2,
      dashArray: 0,
    },
    xaxis: {
      categories: loaded && graphYData,
      // type: "date",

      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
      },

      labels: {
        show: true,
        style: {
          colors: color,
          fontSize: "12px",
          fontWeight: 400,
          cssclassName: "apexcharts-xaxis-label",
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: ["#fff"],
          fontSize: "12px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssclassName: "apexcharts-xaxis-label",
        },
      },
    },
    grid: {
      show: true,
      borderColor: "rgba(35, 34, 34, .1)",
      strokeDashArray: 3,
      position: "back",
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };

  //  ============== TABLE ================ //

  const [option, set_option] = useState({
    sizePerPage: 10,
    search: "",
    totalRecord: 0,
    page: 0,
    sort: "id",
    order: "ASC",
  });

  const columns = [
    {
      value: "invoice",
      label: "Invoice Id",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <span>#{data[i].invoice}</span>;
        },
      },
    },
    // {
    //   value: "Account",
    //   label: "Account",
    //   options: {
    //     filter: false,
    //     sort: false,
    //     customBodyRender: (data, i) => {
    //       return <span>Union Bank </span>;
    //     },
    //   },
    // },
    {
      value: "Date",
      label: "Date",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <Moment format="DD/MM/YYYY">{data[i].created_at}</Moment>;
        },
      },
    },
    {
      value: "Time",
      label: "Time",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <Moment format="HH:MM">{data[i].created_at}</Moment>;
        },
      },
    },
    {
      value: "amount",
      label: "Amount",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <span>$ {formatNum(data[i].amount)}</span>;
        },
      },
    },
    {
      value: "Status",
      label: "Status",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <div className={data[i].status === 0 ? "com-green-txt" : data[i].status === 1 ? "com-green-txt" : data[i].status === 2 && "com-red-txt"}>{data[i].status === 0 ? "Pending" : data[i].status === 1 ? "Paid" : data[i].status === 3 && "Cancel"}</div>;
        },
      },
    },
  ];

  const handleChangeData = (e) => {
    setGraphYData([]);
    setGraphData([]);
    newArrY = [];
    newArrX = [];
    GetDashBoardData(e.target.value);
  };

  const handleRevenueChange = (e) => {
    setGraphCData([]);
    setGraphCYData([]);
    newArr1X = [];
    newArr1Y = [];
    getRevenueChartData(e.target.value);
  };

  const tableCallBack = (option) => {
    set_option(option);
  };

  return (
    <>
      <UserLayout>
        <div className="content-main-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 mt-3">
                <div className="comn-title-main d-block  d-sm-flex justify-content-between">
                  <h1 className="mb-0">Dashboard</h1>
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="row me-0 justify-content-center">
                  <div className="col-xxl col-xl-3 col-md-4 col-6 pe-0 mb-3">
                    <div className="dash-top-box fix-span">
                      <div className="d-flex align-items-top ">
                        <span className="dash-span-1">
                          <img src={Dash_1} alt="1" />
                        </span>
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="ms-auto" onClick={() => handle_click("/requests")}>
                          <path d="M19 12.3812V17.6193C19 18.175 18.7893 18.708 18.4142 19.1009C18.0391 19.4938 17.5304 19.7146 17 19.7146H3C2.46957 19.7146 1.96086 19.4938 1.58579 19.1009C1.21071 18.708 1 18.175 1 17.6193V2.95266C1 2.39697 1.21071 1.86404 1.58579 1.4711C1.96086 1.07817 2.46957 0.857422 3 0.857422H8M11.5 8.71457L19 0.857422L11.5 8.71457ZM14 0.857422H19V6.09552L14 0.857422Z" stroke="#F44C73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p>{loaded && formatNum(dashboardDetails.actCount)}</p>
                      <div className="dash-top-box-info d-flex align-items-center">
                        <bdi>Active requests</bdi>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl col-xl-3 col-md-4 col-6 pe-0 mb-3">
                    <div className="dash-top-box fix-span">
                      <div className="d-flex align-items-top ">
                        <span className="dash-span-2">
                          <img src={Dash_2} alt="2" />
                        </span>
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="ms-auto" onClick={() => handle_click("/opaseCash")}>
                          <path d="M19 12.3812V17.6193C19 18.175 18.7893 18.708 18.4142 19.1009C18.0391 19.4938 17.5304 19.7146 17 19.7146H3C2.46957 19.7146 1.96086 19.4938 1.58579 19.1009C1.21071 18.708 1 18.175 1 17.6193V2.95266C1 2.39697 1.21071 1.86404 1.58579 1.4711C1.96086 1.07817 2.46957 0.857422 3 0.857422H8M11.5 8.71457L19 0.857422L11.5 8.71457ZM14 0.857422H19V6.09552L14 0.857422Z" stroke="#F44C73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>

                      <p>$ {loaded && formatNum(dashboardDetails?.revenue)}</p>
                      <div className="dash-top-box-info d-flex align-items-center">
                        <bdi>Revenue</bdi>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl col-xl-3 col-md-4 col-6 pe-0 mb-3">
                    <div className="dash-top-box fix-span">
                      <span className="dash-span-3">
                        <img src={Dash_3} alt="3" />
                      </span>
                      <p>{loaded && formatNum(dashboardDetails?.follower)}</p>
                      <div className="dash-top-box-info d-flex align-items-center">
                        <bdi>Followers</bdi>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl col-xl-3 col-md-4 col-6 pe-0 mb-3">
                    <div className="dash-top-box fix-span">
                      <span className="dash-span-4">
                        <img src={Dash_4} alt="4" />
                      </span>
                      <p>{loaded && formatNum(dashboardDetails?.videoView ? dashboardDetails?.videoView : 0)}</p>
                      <div className="dash-top-box-info d-flex align-items-center">
                        <bdi>Video views</bdi>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl col-xl-3 col-md-4 col-6 pe-0 mb-3">
                    <div className="dash-top-box fix-span">
                      <span className="dash-span-5">
                        <img src={Dash_5} alt="5" />
                      </span>
                      <p>{loaded && formatNum(dashboardDetails?.profileView)}</p>
                      <div className="dash-top-box-info d-flex align-items-center">
                        <bdi>Profile views</bdi>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="row me-0 ">
                  <div className="col-xxl-8 mb-3  ">
                    <div className="row h-100">
                      <div className="col-md-6 pe-0  ">
                        <div className="dash-part-hdr">
                          <div className="dash-part-hdr-top d-flex">
                            <span>Revenue</span>
                            <div className="ms-auto chart-data">
                              <select className="form-select w-100" name="all" onChange={handleRevenueChange}>
                                <option value="today" className="cmn-online-payment text-center" selected>
                                  Today
                                </option>
                                <option className="cmn-online-payment text-center" value="yesterday">
                                  Yesterday
                                </option>
                                <option className="cmn-online-payment text-center" value="weekly">
                                  Weekly
                                </option>
                                <option className="cmn-online-payment text-center" value="monthly">
                                  Monthly
                                </option>
                                <option className="cmn-online-payment text-center" value="lastYear">
                                  Last year
                                </option>
                              </select>
                            </div>
                            <span className="ms-auto chart-data">$ {loaded && formatNum(dashboardDetails?.revenue)}</span>
                          </div>
                          <div className="chart-main-part">
                            <div className="dash-part-hdr-top d-flex"></div>
                            <Chart options={chart1} series={chart1.series} height={300} type="bar" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 pe-0 mt-3 mt-md-0 ">
                        <div className="dash-part-hdr">
                          <div className="dash-part-hdr-top d-flex">
                            <span>Requests</span>
                            <span className="ms-auto chart-data">{loaded && formatNum(dashboardDetails?.request?.chat + dashboardDetails?.request?.videos + dashboardDetails?.request?.videos24)}</span>
                          </div>
                          <div className="chart-main-part">
                            <Chart options={chart2} series={chart2.series} height={300} type="donut" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4 mb-3">
                    <div className="row">
                      <div className="col-12 pe-0">
                        <div className="dash-part-hdr">
                          <div className="dash-part-hdr-top d-flex">
                            <span>Visiters</span>
                            <div className="ms-auto chart-data">
                              <select className="form-select w-100" name="all" onChange={handleChangeData}>
                                <option value="today" className="cmn-online-payment text-center" selected>
                                  Today
                                </option>
                                <option className="cmn-online-payment text-center" value="yesterday">
                                  Yesterday
                                </option>
                                <option className="cmn-online-payment text-center" value="weekly">
                                  Weekly
                                </option>
                                <option className="cmn-online-payment text-center" value="monthly">
                                  Monthly
                                </option>
                                <option className="cmn-online-payment text-center" value="lastYear">
                                  Last year
                                </option>
                              </select>
                            </div>
                          </div>
                          <div className="chart-main-part" id="responsive-chart">
                            <Chart options={chart3} series={chart3.series} type="area" height={300} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 h-100">
                <div className="row ">
                  <div className="col-xxl-7 mb-3">
                    <div className="dash-part-hdr">
                      <div className="dash-part-table-hdr d-flex align-items-center">
                        <span>Cashouts</span>
                      </div>
                      <div className="bx-white-main new-brd-class  diff-head-table comnn-head-table m-3">
                        <div className="col-12 mt-3">
                          <div className="comn-table-black-bg">
                            <div className="mt-3">
                              <RtdDatatable option={option} columns={columns} data={cashoutData} tableCallBack={tableCallBack} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-5 mb-3">
                    <div className="dash-part-hdr">
                      <div className="dash-part-table-hdr d-flex align-items-center justify-content-between">
                        <span>Pending requests</span>
                        <Link to="/requests">
                          <span className="ms-auto">View all</span>
                        </Link>
                      </div>
                      <div className="dash-part-btm">
                        <div className="dash-btm-pro-item mt-3">
                          {PendingData.map((val, i) => {
                            return (
                              <div className="dash-btm-info-profile-item" key={i}>
                                <div className="dash-btm-main-item d-flex align-items-center">
                                  <div className="dash-btm-info-profile">
                                    <img src={val?.image} alt="Dash_pro" />
                                  </div>
                                  <div className=" d-flex align-items-center w-100 pe-3">
                                    <div className="p ms-4">
                                      <span>{val?.fullname}</span>
                                      <p className="mt-3">{moment(val?.created_at).format("DD MMM YYYY")}</p>
                                    </div>
                                    <div className=" dash-btm-main-item-txt ms-5">
                                      <span>${formatNum(val?.standard_price)}</span>
                                      <p className="mt-3">Chat</p>
                                    </div>
                                    <div className="d-flex ms-auto ps-3">
                                      <div className="me-3" onClick={() => getRequestData(val?.id, 1)}>
                                        <span className="comn-status-class decline-class">Decline</span>
                                      </div>
                                      <div onClick={() => getRequestData(val?.id, 2)}>
                                        <span className="comn-status-class accept-class" onClick={() => handleAccept()}>
                                          Accept
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      {PendingData?.length === 0 && <h6 className="text-center mt-5 pt-5">No data found</h6>}
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
