import { useEffect } from "react";
import axios from "../../api/axios";
import "./Style.css";
import { observer, inject } from "mobx-react";
import { useNavigate, useLocation } from "react-router-dom";

const ALL_DATA = "/auth/allDetails?code=";
const LoadingPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const code = params.get("code");

    const fetchUser = async () => {
      try {
        const res = await axios.get(ALL_DATA + code);
        props.authStore.setAuth(res.data);
        navigate(from, { replace: true });
      } catch (err) {
        console.log(err);
        navigate("/login");
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="container-loading">
      <span className="text-loading">please wait......</span>
      <div className="body">
        <div className="progress">
          <div className="color"></div>
        </div>
      </div>
    </div>
  );
};

export default inject("authStore")(observer(LoadingPage));
