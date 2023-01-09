import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../../constants";
import React, { useRef } from "react";
import axios from "axios";
import AuthService from "../../services/auth.service";

const Register = () => {
  //   const [user, setUser] = useState({});
  const userFullName = useRef();
  const username = useRef();
  const userPassword = useRef();
  const userConfirm = useRef();

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (userPassword.current.value === userConfirm.current.value) {
      //   setUser();
      console.log({
        name: userFullName.current.value,
        username: username.current.value.toString(),
        password: userPassword.current.value.toString(),
      });
      try {
        AuthService.register(
          userFullName.current.value,
          username.current.value.toString(),
          userPassword.current.value.toString()
        ).then(
          (response) => {
            console.log(response);
            // navigate("/login");
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("please enter exactly confirm password");
    }
  };

  return (
    <div>
      <div class="container">
        <div class="forms-container">
          <div class="signin-signup">
            <form class="sign-in-form">
              <h2 class="title">Hello there!</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Full name" ref={userFullName} />
              </div>
              <div class="input-field">
                <i class="fas fa-envelope"></i>
                <input type="email" placeholder="Email" ref={username} />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  ref={userPassword}
                />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  ref={userConfirm}
                />
              </div>
              <div class="term-container">
                <p class="social-text">
                  <input type="checkbox" class="agree-checkbox" required /> I
                  have read and agree Privacy Policy, Terms of Services and User
                  Agreements
                </p>
              </div>
              <input
                type="submit"
                class="btn"
                value="Sign up"
                onClick={handleSignup}
              />
              <p class="social-text">
                Already have an account?
                {/* <a class="reg-btn" href="login.html"> */}
                <Link to="/login">Sign up</Link>
                {/* </a> */}
              </p>
            </form>
          </div>
        </div>

        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
            </div>
            <img src="{images.logoLogin}" class="image" alt="" />
          </div>
          <div class="panel right-panel">
            <div class="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
            </div>
            <img src={images.logoRegister} class="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
