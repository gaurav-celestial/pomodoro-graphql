import axios from "axios";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { settingsActions } from "../store";
import useLogin from "../hooks/useLogin.js";

const Login = () => {
  const dispatch = useDispatch();

  const mode = useSelector((state) => state.settings.mode);

  const { data, error, loading, login } = useLogin();

  const userRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();

  const validateUserName = function () {
    if (userRef.current.value.length < 5) {
      return "Minimum 5 characters required in username";
    }
    if (userRef.current.value.includes(" ")) {
      return "Username must not contain spaces";
    }
    return false;
  };

  const validatePassword = function () {
    const passVal = passRef.current.value;

    if (passVal.length < 6) {
      return "Minimum 6 characters required in password";
    }
    if (passVal.includes(" ")) {
      return "Password must not contain spaces";
    }

    return false;
  };

  const submitHandler = async function (e) {
    e.preventDefault();
    if (validateUserName()) {
      throw new Error(validateUserName());
    }

    if (validatePassword()) {
      throw new Error(validatePassword());
    }
    login(userRef.current.value, passRef.current.value);

    if (!data) {
      return;
    }
    dispatch(settingsActions.setUser(data.login));
    navigate("/");
  };

  return (
    <div
      className={`login-container ${
        mode === "dark" ? "mode2-login-container" : undefined
      }`}
    >
      <div
        className={`form-container ${
          mode === "dark" ? "mode2-form-container" : undefined
        }`}
      >
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor='username'>Username</label>
            <input ref={userRef} type='text' name='username' id='username' />
          </div>
          <br />
          <div>
            <label htmlFor='password'>Password</label>
            <input
              ref={passRef}
              type='password'
              name='password'
              id='password'
            />
          </div>
          <button className='login-btn'>Login</button>
          <Link className='sign-up-btn' to='/signup'>
            Not a user ? Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
