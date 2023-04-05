import React, { useEffect, useState } from "react";
import UserLayout from "../components/UserLayout";
import OpaseCase_Logo from "../images/opase cash logo.png";
import Dash_1 from "../images/doller icon.svg";
import Dash_2 from "../images/dash-t-2.svg";
import { Modal } from "react-bootstrap";
import RtdDatatable from "../components/DataTable/RtdDatatable";
import { API_Path } from "../const";
import { PostApi } from "../api/api-service";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import Moment from "react-moment";
import DeleteModal from "./modal/DeleteModal";

export default function OpaseCash(params) {
  const [paymodalShow, setPayModalShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [bankData, setBankData] = useState([]);
  const [bankDetails, setBankDetails] = useState(0);
  const [bankId, setBankId] = useState("");
  const [bankEdit, setBankEdit] = useState([]);
  const [defaultSelect, setDefaltSelect] = useState([]);
  const [amountData, setAmountData] = useState([]);

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
      },
    },
    // {
    //   value: "Account",
    //   label: "Account",
    //   options: {
    //     filter: false,
    //     sort: false,
    //     customBodyRender: (data, i) => {
    //       return <div className="com-green-txt">Completed</div>;
    //     },
    //   },
    // },
    {
      value: "created_at",
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
      value: "created_at",
      label: "Time",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <div>{data[i].created_at?.split(" ")[1]}</div>;
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
          return <div>$ {formatNum(data[i].amount)}</div>;
        },
      },
    },
    {
      value: "status",
      label: "Status",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, i) => {
          return <div className="com-green-txt">{data[i].status === 0 ? "Pending" : data[i].status === 1 ? "Paid" : "Cancel"}</div>;
        },
      },
    },
  ];

  const delete_userShow = () => setDeleteShow(true);
  const delete_userClose = () => setDeleteShow(false);

  useEffect(() => {
    getBankDetails();
    getWalletDetails();
  }, []);

  const getBankDetails = () => {
    let data = { bankId: bankId };
    const addServiceDetails = new Promise((resolve) => {
      resolve(PostApi(API_Path.GetAllBAnk, bankId !== "" && data));
    });
    addServiceDetails.then((res) => {
      if (res.status === 200) {
        res.data.data.map((item) => {
          if (item.is_default === 1) {
            setBankId(item.id);
            if (document.getElementById(`default-${item.id}`)) {
              document.getElementById(`default-${item.id}`).checked = true;
            }
          }
        });
        if (bankId !== "") {
          setBankEdit(res.data.data);
        } else {
          setBankData(res.data.data);
        }
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const submitBankFormData = (formData, resetForm, type) => {
    let data = {
      bankName: formData.bankName,
      accountType: formData.AccountType,
      holdName: formData.Accname,
      cardNo: formData.accNumber,
      routingNo: formData.routingNum,
      default: formData.default,
    };

    let updateData = {
      bankId: bankId,
      bankName: formData.bankName,
      accountType: formData.AccountType,
      holdName: formData.Accname,
      cardNo: formData.accNumber,
      routingNo: formData.routingNum,
      default: formData.default,
    };
    const addServiceDetails = new Promise((resolve) => {
      resolve(PostApi(API_Path.GetAllBAnk, type === "add" ? data : updateData));
    });
    addServiceDetails.then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        resetForm(formData);
        setPayModalShow(false);
        getBankDetails();
        setBankId("");
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const getWalletDetails = () => {
    let data = { option: option };
    const addWalletDetails = new Promise((resolve) => {
      resolve(PostApi(API_Path.GetWalletData, data));
    });
    addWalletDetails.then((res) => {
      if (res.status === 200) {
        setAmountData(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleBankDelete = () => {
    let data = { bankId: bankId };
    const addServiceDetails = new Promise((resolve) => {
      resolve(PostApi(API_Path.DeleteBankData, data));
    });
    addServiceDetails.then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        setDeleteShow(false);
        getBankDetails();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const tableCallBack = (option) => {
    set_option(option);
  };

  const errorContainer = (form, field) => {
    return form.touched[field] && form.errors[field] ? <span className="error text-danger">{form.errors[field]}</span> : null;
  };

  const formAttr = (form, field) => ({
    onBlur: form.handleBlur,
    onChange: form.handleChange,
    value: form.values[field],
  });

  const formatNum = (num) => {
    return String(num)?.replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1,");
  };

  const handleDefault = (e, id) => {
    if (e.target.checked) {
      setBankId(id);
      let bankFilter = bankData?.filter((item) => item.id === id);
      setDefaltSelect(bankFilter);
      getBankDetails(bankId, defaultSelect);
    }
  };

  const updateBankData = async (id) => {
    await setPayModalShow(true);
    getBankDetails(id);
  };

  return (
    <>
      <UserLayout>
        <div className="content-main-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4 mt-3">
                <div className="comn-black-bg p-3">
                  <div className="d-flex align-items-center justify-content-center mb-5">
                    <img src={OpaseCase_Logo} alt="logo" />
                  </div>
                  <div className="currnt-balance-class">
                    <span>Current balance</span>
                    <bdi>${amountData.myWallet && formatNum(amountData.myWallet)}</bdi>
                    {bankDetails !== 2 &&
                      (bankDetails === 0 ? (
                        <div className="case-btn d-flex align-items-center justify-content-center">
                          <button className="custum-btn" type="" onClick={() => setBankDetails(1)}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg" className="me-2">
                              <path d="M21 7.28V5C21 3.9 20.1 3 19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V16.72C21.59 16.37 22 15.74 22 15V9C22 8.26 21.59 7.63 21 7.28ZM20 9V15H13V9H20ZM5 19V5H19V7H13C11.9 7 11 7.9 11 9V15C11 16.1 11.9 17 13 17H19V19H5Z" fill="#7C64F8" />
                              <path d="M16 13.5C16.8284 13.5 17.5 12.8284 17.5 12C17.5 11.1716 16.8284 10.5 16 10.5C15.1716 10.5 14.5 11.1716 14.5 12C14.5 12.8284 15.1716 13.5 16 13.5Z" fill="#7C64F8" />
                            </svg>
                            Cashout
                          </button>
                        </div>
                      ) : (
                        <div className="case-btn d-flex align-items-center justify-content-center">
                          <button className="bg-transparent border-0 trans-btn" type="" onClick={() => setBankDetails(2)}>
                            View breakdown
                            <i className="bi bi-arrow-right ms-2"></i>
                          </button>
                        </div>
                      ))}
                  </div>
                  <div>
                    {bankDetails === 0 && (
                      <>
                        <div className=" col-12 pe-0 my-5">
                          <div className="dash-top-box opase-case-revenue fix-span">
                            <span className="dash-span-doller">
                              <img src={Dash_1} alt="2" />
                            </span>
                            <p>$ {amountData?.chatRevenue && formatNum(amountData?.chatRevenue)}</p>
                            <div className="dash-top-box-info d-flex align-items-center">
                              <bdi>Today’s chat revenue</bdi>
                            </div>
                          </div>
                        </div>
                        <div className=" col-12 pe-0 mt-5">
                          <div className="dash-top-box opase-case-revenue fix-span">
                            <span className="dash-span-case">
                              <img src={Dash_2} alt="2" />
                            </span>
                            <p>$ {amountData?.videoRevenue && formatNum(amountData?.videoRevenue)}</p>
                            <div className="dash-top-box-info d-flex align-items-center">
                              <bdi>Today’s video revenue</bdi>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {bankDetails === 1 && (
                      <>
                        <div className="col-lg-12 my-4 comn-input-main">
                          <label className="d-inline-flex align-items-center mb-2">Enter amount</label>
                          <input className="form-control comn-input-style px-3 remove-number-arrow" type="number" placeholder="Enter Amount" />
                        </div>
                        {defaultSelect.length > 0 && (
                          <>
                            <div className="col-12 bank-detail-main-div  p-3 m-0">
                              <div className="d-md-flex align-items-center">
                                {/* <img src={Ecobank_Logo} alt="Ecobank logo" className="img-fluid" /> */}
                                <div className="bank-detail-txt mt-2  mt-md-0 ms-md-3">
                                  <span>{defaultSelect[0].bank_name}</span>
                                  <bdi className="d-block">{defaultSelect[0].account_type}</bdi>
                                </div>
                              </div>

                              {defaultSelect.is_defaultSelect === 1 ? (
                                <label className="cust-chk-bx ms-2">
                                  <input type="checkbox" defaultChecked />
                                  <span className="cust-chkmark"></span>
                                  Default
                                </label>
                              ) : (
                                <label className="cust-chk-bx ms-2">
                                  <input type="checkbox" defaultChecked />
                                  <span className="cust-chkmark"></span>
                                  Default
                                </label>
                              )}
                            </div>
                          </>
                        )}
                      </>
                    )}
                    {bankDetails === 1 && (
                      <div className="col-12 mt-5">
                        <button
                          className="comn-btn-class add-bank-btn mt-3 w-100"
                          type="button"
                          onClick={() => {
                            setPayModalShow(true);
                            setBankEdit([]);
                            setBankId("");
                          }}
                        >
                          Add bank
                        </button>
                        <button className="comn-btn-class mt-3 w-100" type="button">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg" className="me-2">
                            <path d="M21 7.28V5C21 3.9 20.1 3 19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V16.72C21.59 16.37 22 15.74 22 15V9C22 8.26 21.59 7.63 21 7.28ZM20 9V15H13V9H20ZM5 19V5H19V7H13C11.9 7 11 7.9 11 9V15C11 16.1 11.9 17 13 17H19V19H5Z" fill="#7C64F8" />
                            <path d="M16 13.5C16.8284 13.5 17.5 12.8284 17.5 12C17.5 11.1716 16.8284 10.5 16 10.5C15.1716 10.5 14.5 11.1716 14.5 12C14.5 12.8284 15.1716 13.5 16 13.5Z" fill="#7C64F8" />
                          </svg>
                          Cashout
                        </button>
                      </div>
                    )}
                  </div>
                  {bankDetails === 2 && (
                    <>
                      <div className="col-12 mt-5">
                        <div className="opase-case-transaction">
                          <span>Transaction history</span>
                          <bdi>See all</bdi>
                        </div>
                        <div className="transaction-main mt-3">
                          <div className="d-md-flex mt-3 mt-md-0">
                            <span className="transaction-profile me-3">
                              <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.02551 5C4.02551 2.23858 6.59501 0 9.76464 0C12.9343 0 15.5038 2.23858 15.5038 5C15.5038 7.76142 12.9343 10 9.76464 10C6.59501 10 4.02551 7.76142 4.02551 5ZM9.76464 8C11.6664 8 13.2081 6.65685 13.2081 5C13.2081 3.34315 11.6664 2 9.76464 2C7.86286 2 6.32116 3.34315 6.32116 5C6.32116 6.65685 7.86286 8 9.76464 8Z" fill="#7C64F8" />
                                <path d="M3.27156 13.3431C1.54948 14.8434 0.582031 16.8783 0.582031 19H2.87768C2.87768 17.4087 3.60327 15.8826 4.89483 14.7574C6.18638 13.6321 7.93811 13 9.76464 13C11.5912 13 13.3429 13.6321 14.6345 14.7574C15.926 15.8826 16.6516 17.4087 16.6516 19H18.9472C18.9472 16.8783 17.9798 14.8434 16.2577 13.3431C14.5357 11.8429 12.2 11 9.76464 11C7.32926 11 4.99363 11.8429 3.27156 13.3431Z" fill="#7C64F8" />
                              </svg>
                            </span>
                            <div className="transaction-detail-r-txt mt-3  mt-md-0">
                              <label>Received From John</label>
                              <bdi>21 Mar, 2022</bdi>
                            </div>
                          </div>
                          <div className="transaction-detail-l-txt">
                            <p>-$100.00</p>
                            <span className="comn-active-bg">Active</span>
                          </div>
                        </div>
                        <div className="transaction-main mt-3">
                          <div className="d-md-flex mt-3 mt-md-0">
                            <span className="transaction-profile me-3">
                              <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.02551 5C4.02551 2.23858 6.59501 0 9.76464 0C12.9343 0 15.5038 2.23858 15.5038 5C15.5038 7.76142 12.9343 10 9.76464 10C6.59501 10 4.02551 7.76142 4.02551 5ZM9.76464 8C11.6664 8 13.2081 6.65685 13.2081 5C13.2081 3.34315 11.6664 2 9.76464 2C7.86286 2 6.32116 3.34315 6.32116 5C6.32116 6.65685 7.86286 8 9.76464 8Z" fill="#7C64F8" />
                                <path d="M3.27156 13.3431C1.54948 14.8434 0.582031 16.8783 0.582031 19H2.87768C2.87768 17.4087 3.60327 15.8826 4.89483 14.7574C6.18638 13.6321 7.93811 13 9.76464 13C11.5912 13 13.3429 13.6321 14.6345 14.7574C15.926 15.8826 16.6516 17.4087 16.6516 19H18.9472C18.9472 16.8783 17.9798 14.8434 16.2577 13.3431C14.5357 11.8429 12.2 11 9.76464 11C7.32926 11 4.99363 11.8429 3.27156 13.3431Z" fill="#7C64F8" />
                              </svg>
                            </span>
                            <div className="transaction-detail-r-txt mt-3  mt-md-0">
                              <label>Received From John</label>
                              <bdi>21 Mar, 2022</bdi>
                            </div>
                          </div>
                          <div className="transaction-detail-l-txt">
                            <p>-$100.00</p>
                            <span className="comn-active-bg">Active</span>
                          </div>
                        </div>
                        <div className="transaction-main mt-3">
                          <div className="d-md-flex mt-3 mt-md-0">
                            <span className="transaction-profile me-3">
                              <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.02551 5C4.02551 2.23858 6.59501 0 9.76464 0C12.9343 0 15.5038 2.23858 15.5038 5C15.5038 7.76142 12.9343 10 9.76464 10C6.59501 10 4.02551 7.76142 4.02551 5ZM9.76464 8C11.6664 8 13.2081 6.65685 13.2081 5C13.2081 3.34315 11.6664 2 9.76464 2C7.86286 2 6.32116 3.34315 6.32116 5C6.32116 6.65685 7.86286 8 9.76464 8Z" fill="#7C64F8" />
                                <path d="M3.27156 13.3431C1.54948 14.8434 0.582031 16.8783 0.582031 19H2.87768C2.87768 17.4087 3.60327 15.8826 4.89483 14.7574C6.18638 13.6321 7.93811 13 9.76464 13C11.5912 13 13.3429 13.6321 14.6345 14.7574C15.926 15.8826 16.6516 17.4087 16.6516 19H18.9472C18.9472 16.8783 17.9798 14.8434 16.2577 13.3431C14.5357 11.8429 12.2 11 9.76464 11C7.32926 11 4.99363 11.8429 3.27156 13.3431Z" fill="#7C64F8" />
                              </svg>
                            </span>
                            <div className="transaction-detail-r-txt mt-3  mt-md-0">
                              <label>Received From John</label>
                              <bdi>21 Mar, 2022</bdi>
                            </div>
                          </div>
                          <div className="transaction-detail-l-txt">
                            <p>-$100.00</p>
                            <span className="comn-active-bg">Active</span>
                          </div>
                        </div>
                        <div className="transaction-main mt-3">
                          <div className="d-md-flex mt-3 mt-md-0">
                            <span className="transaction-profile me-3">
                              <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.02551 5C4.02551 2.23858 6.59501 0 9.76464 0C12.9343 0 15.5038 2.23858 15.5038 5C15.5038 7.76142 12.9343 10 9.76464 10C6.59501 10 4.02551 7.76142 4.02551 5ZM9.76464 8C11.6664 8 13.2081 6.65685 13.2081 5C13.2081 3.34315 11.6664 2 9.76464 2C7.86286 2 6.32116 3.34315 6.32116 5C6.32116 6.65685 7.86286 8 9.76464 8Z" fill="#7C64F8" />
                                <path d="M3.27156 13.3431C1.54948 14.8434 0.582031 16.8783 0.582031 19H2.87768C2.87768 17.4087 3.60327 15.8826 4.89483 14.7574C6.18638 13.6321 7.93811 13 9.76464 13C11.5912 13 13.3429 13.6321 14.6345 14.7574C15.926 15.8826 16.6516 17.4087 16.6516 19H18.9472C18.9472 16.8783 17.9798 14.8434 16.2577 13.3431C14.5357 11.8429 12.2 11 9.76464 11C7.32926 11 4.99363 11.8429 3.27156 13.3431Z" fill="#7C64F8" />
                              </svg>
                            </span>
                            <div className="transaction-detail-r-txt mt-3  mt-md-0">
                              <label>Received From John</label>
                              <bdi>21 Mar, 2022</bdi>
                            </div>
                          </div>
                          <div className="transaction-detail-l-txt">
                            <p>+$160.00</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="col-md-8 mt-3">
                <div className="row">
                  <div className="col-12">
                    <div className="comn-black-bg spacing-div pt-0">
                      <div className="bank-account-class d-flex align-items-center justify-content-between">
                        <span>Bank accounts</span>
                        {bankId && (
                          <span className="d-flex">
                            <button className="comn-btn-class custm-edit-btn px-5 me-3" type="button" onClick={() => updateBankData(bankId)}>
                              Edit
                            </button>
                            <button className="comn-btn-class custm-edit-btn px-5" type="button" onClick={() => delete_userShow()}>
                              Remove
                            </button>
                          </span>
                        )}
                      </div>
                      {bankData.map((val, i) => {
                        return (
                          <div className="bank-detail-main-div p-3 position-relative" key={i}>
                            {/* {bankId !== val.id && <button type="button" className="border-0 bg-transparent close-btn-cash" >
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M10 20.0002C7.34711 20.0026 4.80218 18.9498 2.9263 17.0739C1.05042 15.198 -0.00238272 12.6531 4.04939e-06 10.0002V9.80019C0.0817921 5.79241 2.5478 2.22035 6.26637 0.723251C9.98493 -0.773844 14.2381 0.0930834 17.074 2.92619C19.9365 5.78627 20.7932 10.0895 19.2443 13.8278C17.6955 17.5661 14.0465 20.0026 10 20.0002ZM10 11.4102L12.59 14.0002L14 12.5902L11.41 10.0002L14 7.41019L12.59 6.00019L10 8.59019L7.41001 6.00019L6.00001 7.41019L8.59001 10.0002L6.00001 12.5902L7.41001 14.0002L10 11.4112V11.4102Z" fill="#EB5757" />
                                </svg>
                              </button>} */}
                            <div className="d-md-flex align-items-center">
                              <div src={val.bank_name} alt="Ecobank logo" className="img-fluid">
                                {" "}
                              </div>
                              <div className="bank-detail-txt mt-3  mt-md-0 ms-md-3">
                                <span>{val.bank_name}</span>
                                <bdi className="d-block">{val.account_type}</bdi>
                              </div>
                            </div>
                            <div className="ms-2">
                              <label className="cust-chk-bx">
                                <input
                                  name="default"
                                  type="radio"
                                  id={`default-${val.id}`}
                                  onChange={(e) => {
                                    handleDefault(e, val.id);
                                  }}
                                />
                                <span className="cust-chkmark"></span>
                                {/* Default */}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className=" p-1 mt-3">
                      <div className="toggle-tabs-cust table-toggle-cust m-2 ms-0 ">
                        <div className="toggle-tabs-list">
                          <input name="plan" className="toggle toggle-left" type="radio" id="toggle-on" defaultChecked />
                          <label htmlFor="toggle-on">
                            <span>Cashouts</span>
                          </label>
                        </div>
                        <div className="toggle-tabs-list">
                          <input name="plan" type="radio" className="toggle toggle-right" id="toggle-off" defaultChecked />
                          <label className="cust-radio-main d-flex align-items-center upcoming-order" htmlFor="toggle-off">
                            <span>Income</span>
                          </label>
                        </div>
                      </div>

                      <div className="col-12 mt-3">
                        <div className="comn-table-black-bg">
                          <div className="mt-3">
                            <RtdDatatable option={option} columns={columns} data={amountData !== undefined && amountData?.transaction} tableCallBack={tableCallBack} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          show={paymodalShow}
          onHide={() => {
            setPayModalShow(false);
          }}
          size="md"
          centered
          className="comn-modal-style"
        >
          <Modal.Header className="border-0" closeButton>
            <div className="modal-hdr">
              <h2>{bankEdit.length > 0 ? "Edit bank account" : "Add bank account"}</h2>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Formik
              enableReinitialize
              initialValues={{
                bankName: bankEdit ? bankEdit[0]?.bank_name : "",
                AccountType: bankEdit ? bankEdit[0]?.account_type : "",
                accNumber: bankEdit ? bankEdit[0]?.card_nomber : "",
                Accname: bankEdit ? bankEdit[0]?.hold_name : "",
                routingNum: bankEdit ? bankEdit[0]?.routing_number : "",
                default: 1,
              }}
              validationSchema={Yup.object({
                bankName: Yup.string().required("Bank name is required."),
                AccountType: Yup.string().required("Account type is required."),
                Accname: Yup.string().required("Account name is required"),
                accNumber: Yup.number().typeError("Account number should be digit").required("Account number is required."),
                routingNum: Yup.number().typeError("Routing number should be digit").required("Routing number is required."),
              })}
              onSubmit={(formData, { resetForm }) => {
                submitBankFormData(formData, resetForm, bankEdit.length > 0 ? "edit" : "add");
              }}
            >
              {(runform) => (
                <form onSubmit={runform.handleSubmit}>
                  <div className=" modal-data">
                    <div className="col-12 mb-3">
                      <label className="d-inline-flex align-items-center mb-2">Bank name</label>
                      <input className="form-control comn-input-style px-3" type="text" placeholder="Enter bank name" name="bankName" {...formAttr(runform, "bankName")} />
                      {errorContainer(runform, "bankName")}
                    </div>
                    <div className="col-12 mb-3">
                      <label className="d-inline-flex align-items-center mb-2">Account type</label>
                      <div className="comn-gray-form-select">
                        <select className="form-select  w-100" name="AccountType" {...formAttr(runform, "AccountType")}>
                          <option value="0">Choose account type</option>
                          <option value="saving account">Saving account</option>
                          <option value="current account">Current acoount</option>
                        </select>
                        {errorContainer(runform, "AccountType")}
                      </div>
                    </div>
                    <div className="col-12 mb-3">
                      <label className="d-inline-flex align-items-center mb-2">Account holder name</label>
                      <input className="form-control comn-input-style px-3" type="text" placeholder="Enter account holder name" name="Accname" {...formAttr(runform, "Accname")} />
                      {errorContainer(runform, "Accname")}
                    </div>
                    <div className="col-12 mb-3">
                      <label className="d-inline-flex align-items-center mb-2">Account number</label>
                      <input className="form-control comn-input-style px-3 remove-number-arrow" placeholder="Enter account number" name="accNumber" {...formAttr(runform, "accNumber")} />
                      {errorContainer(runform, "accNumber")}
                    </div>
                    <div className="col-12 mb-3">
                      <label className="d-inline-flex align-items-center mb-2">Routing number</label>
                      <input className="form-control comn-input-style px-3  remove-number-arrow" maxLength={3} type="number" placeholder="Enter routing number" name="routingNum" {...formAttr(runform, "routingNum")} />
                      {errorContainer(runform, "routingNum")}
                    </div>
                    {bankEdit[0]?.is_default === 1 ? (
                      <div className="col-12 ms-2">
                        <label className="cust-chk-bx purple-checkmark">
                          <input type="checkbox" defaultChecked />
                          <span className="cust-chkmark"></span>
                          Set as default
                        </label>
                      </div>
                    ) : (
                      <div className="col-12 ms-2">
                        <label className="cust-chk-bx purple-checkmark">
                          <input type="checkbox" />
                          <span className="cust-chkmark"></span>
                          Set as default
                        </label>
                      </div>
                    )}
                    <div className="col-12 mt-4">
                      <button className="comn-btn-class w-100" type="submit">
                        {bankEdit.length > 0 ? "Edit bank account" : " Add bank account"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>

        <Modal show={deleteShow} onHide={delete_userClose} size="sm" className="comn-modal-style" centered>
          <DeleteModal headerString={"Delete bank account"} bodyString={"Are you sure you want to delete bank account?"} closeModal={delete_userClose} callApi={handleBankDelete} />
        </Modal>
      </UserLayout>
    </>
  );
}
