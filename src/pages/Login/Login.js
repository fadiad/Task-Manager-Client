import { useRef, useState, useEffect, useContext } from "react";
import "../Register/Style.css";
import axios from "../../api/axios";
import { regexObj } from "../../utils/utils";
import { observer, inject } from 'mobx-react'
import {GitHub} from "react-feather";
import { Link, useNavigate, useLocation } from "react-router-dom";
const LOGIN_URL = "/auth/login_User";

const Login = (props) => {
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.match(regexObj["email"])) {
      setErrMsg("not a valid eamil format");
      return;
    }
    try {
      const res = await axios.post(LOGIN_URL, { email: user, password: pwd });
      props.authStore.setAuth(res.data)
      setPwd("");
      setUser("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        console.log(err);
        setErrMsg("no server response");
      } else {
        setErrMsg(err.response.data);
      }
      errRef.current.focus();
    }
  };

  const loginWithGit =()=>{
    window.location.assign("https://github.com/login/oauth/authorize?client_id=f21614ae68732a9a2cc0&scope=user:email%20user:name")
  }

  return (
    <div className="main">
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Email:</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />

          <button>Sign in</button>
        </form>
        <div className="git-hub-container" onClick={loginWithGit}>
          <GitHub size={30} />
          <p>Log in with GitHub</p>
        </div>
        <br />
        <p>
          Don't have an account?
          <span className="line">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </section>
    </div>
  );
};

export default inject("authStore")(observer(Login))
