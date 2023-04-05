import RoutesMain from "./RoutesMain";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../src/style/style.scss";
import "../src/style/style2.scss";
import "react-toastify/dist/ReactToastify.css";

import userEvent from "@testing-library/user-event";
import { useEffect, useMemo, useState } from "react";
import { PostApi } from "./api/api-service";
import { API_Path } from "./const";
import { AuthContextProvider } from "./contexts/AuthContext";

export default function App(params) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getAllIProfile();
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const getAllIProfile = () => {
    let path = API_Path.GetAllProfile;
    const getAllProfileData = new Promise((resolve) => {
      resolve(PostApi(path));
    });
    getAllProfileData.then((res) => {
      if (res.status === 200) {
        setUser(res.data.data);
      }
    });
  };

  return (
    <>
      <RoutesMain />
    </>
  );
}
