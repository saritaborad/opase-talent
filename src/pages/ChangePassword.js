import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import UserLayout from "../components/UserLayout";
import { PostApi } from "../api/api-service";
import { API_Path } from "../const";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ChangePassword(params) {
  const [email, setEmail] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user_email")) {
      setEmail(localStorage.getItem("user_email"));
    }
  }, [email]);

  let submitFormData = (formData, resetForm) => {
    resetForm(formData);
    let data = {
      email: email,
      oldpassword: formData.oldpassword,
      password: formData.password,
      configpassword: formData.configpassword,
    };
    let changePasswordData = new Promise((resolve) => {
      resolve(PostApi(API_Path.changePassword, data));
    });
    changePasswordData.then((res) => {
      if (res.status === 200) {
        resetForm(formData);
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    });
  };

  let errorContainer = (form, field) => {
    return form.touched[field] && form.errors[field] ? <span className="error text-danger">{form.errors[field]}</span> : null;
  };

  let formAttr = (form, field) => ({
    onBlur: form.handleBlur,
    onChange: form.handleChange,
    value: form.values[field],
  });

  return (
    <>
      <UserLayout>
        <div className="content-main-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 mt-3">
                <div className="comn-title-main d-block  d-sm-flex justify-content-between">
                  <h1 className="mb-0">Change password</h1>
                </div>
              </div>
              <Formik
                enableReinitialize
                initialValues={{
                  oldpassword: "",
                  password: "",
                  configpassword: "",
                }}
                validationSchema={Yup.object({
                  oldpassword: Yup.string().required("Current password is required."),
                  password: Yup.string()
                    .required("New password is required.")
                    .when("oldpassword", {
                      is: (val) => (val && val.length > 0 ? true : false),
                      then: Yup.string().notOneOf([Yup.ref("oldpassword")], "Password must be different from old password."),
                    }),
                  configpassword: Yup.string()
                    .required("Password is required.")
                    .when("password", {
                      is: (val) => (val && val.length > 0 ? true : false),
                      then: Yup.string().oneOf([Yup.ref("password")], "Password must match."),
                    }),
                })}
                onSubmit={(formData, { resetForm }) => {
                  submitFormData(formData, resetForm);
                }}
              >
                {(runform) => (
                  <form onSubmit={runform.handleSubmit}>
                    <div className="col-12 mt-3">
                      <div className="comn-black-bg p-3">
                        <div className="row">
                          <div className="col-lg-4 col-sm-6 mb-3 comn-input-main">
                            <label className="d-inline-flex align-items-center mb-2">Current password</label>
                            <input className="form-control comn-input-style px-3" type="password" name="oldpassword" placeholder="Enter current password" {...formAttr(runform, "oldpassword")} />
                            {errorContainer(runform, "oldpassword")}
                          </div>
                          <div className="col-lg-4 col-sm-6 mb-3 comn-input-main">
                            <label className="d-inline-flex align-items-center mb-2">New password</label>
                            <input className="form-control comn-input-style px-3" type="password" {...formAttr(runform, "password")} name="password" placeholder="Enter new password" />
                            {errorContainer(runform, "password")}
                          </div>
                          <div className="col-lg-4 col-sm-6 mb-3 comn-input-main">
                            <label className="d-inline-flex align-items-center mb-2">Confirm password</label>
                            <input className="form-control comn-input-style px-3" type="password" {...formAttr(runform, "configpassword")} name="configpassword" placeholder="Enter confirm password" />
                            {errorContainer(runform, "configpassword")}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-2 col-sm-4 col-12 mt-3">
                            <button className="comn-btn-class w-100" type="submit">
                              Save changes
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
      </UserLayout>
    </>
  );
}
