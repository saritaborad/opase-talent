const axios = require("axios");
export function GetApi(path) {
  let token = localStorage.getItem("opata_token");
  let headers = { Authorization: token, "Content-Type": "application/json" };
  const GetApiData = axios
    .get(path, { headers: headers })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response.data.message === "The session has Expired. Please log in again!") {
        localStorage.removeItem("opata_token");
        window.location.href = "/";
      }
      return error.response;
    });
  return GetApiData;
}

export function PostApi(path, body) {
  let tokenData;
  if (localStorage.getItem("opata_token")) {
    tokenData = "Bearer " + localStorage.getItem("opata_token");
  } else {
    tokenData = "";
  }
  let headers = { Authorization: tokenData, device: 1 };
  const PostApi = axios
    .post(path, body, { headers: headers })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response.data.message === "The session has Expired. Please log in again!") {
        localStorage.removeItem("opata_token");
        window.location.href = "/";
      }
      return error.response;
    });

  return PostApi;
}
