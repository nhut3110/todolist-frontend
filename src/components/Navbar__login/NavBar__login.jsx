import React from "react";
import { useState } from "react";
import images from "../../constants/images";
import "../Navbar/NavBar.css";
// import "../style.css";
// import { Link } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "../../services/auth.service";
import TokenService from "../../services/token.service";
const NavBarLogin = () => {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      AuthService.logout(TokenService.getLocalRefreshToken());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="n-wrapper px-10" id="Navbar">
      {/* left */}
      <div className="n-left">
        {/* <Link to="/"> */}
        <div className="n-name">Taskey</div>
        {/* </Link> */}
      </div>
      {/* right */}
      <div className="n-right">
        <div className="n-list">
          <ul style={{ listStyleType: "none" }}>
            <li>
              <Link to="/" spy={true} smooth={true}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/userspace" spy={true} smooth={true}>
                Task List
              </Link>
            </li>
            <li>
              <Link to="/profile" spy={true} smooth={true}>
                <img
                  className="profile__avatar"
                  src="https://play-lh.googleusercontent.com/xlnwmXFvzc9Avfl1ppJVURc7f3WynHvlA749D1lPjT-_bxycZIj3mODkNV_GfIKOYJmG"
                  alt="img"
                />
              </Link>
            </li>
            <li>
              <Link
                className="Logout__text"
                to="/login"
                spy={true}
                smooth={true}
                onClick={handleLogout}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBarLogin;
