import "./ProfileContent.css";
// import "../style.css";
import editIcon from "../../assets/img/edit.svg";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";
import TokenService from "../../services/token.service";

export default function ProfileContent() {
  const navigate = useNavigate();
  const [isEdit, setEdit] = useState(false);
  const [buttonText, setButtonText] = useState("Edit Profile");
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});
  const [text, setText] = useState(TokenService.getUserFullName());
  const userFullname = useRef();
  useEffect(() => {
    UserService.getUserInfo(TokenService.getUserID()).then((response) => {
      setUser(response.data);
      // console.log(response.data);
    });
    UserService.getList(TokenService.getUserID()).then((response) => {
      // setTasks(response.data);
      setTasks(response.data.sort((a, b) => b.id - a.id).slice(0, 10));
      console.log(response.data);
    });
  }, []);

  const handleEdit = async (e) => {
    try {
      if (!isEdit) {
        // document.getElementById("user-email-input").disabled = false;
        document.getElementById("user-name-input").disabled = false;
        setEdit(!isEdit);
        setButtonText("Save");
      } else {
        const updatedName =
          userFullname.current.value === ""
            ? user.userFullname
            : userFullname.current.value;
        UserService.updateUserName(user.user_id, {
          full_name: updatedName,
        }).then((response) => {
          console.log(response.data.full_name);
          setText(response.data.full_name);
          document.getElementById("user-name-input").disabled = true;
        });
        setEdit(!isEdit);
        setButtonText("Edit Profile");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div class="UserProfile__container">
      <div class="Friend">
        <div class="Friend__header">
          <h2>Friends</h2>
        </div>
        <div class="Friend__list">
          <div class="SingleFriend__container">
            <img src={require("../../assets/img/man.svg").default} alt="ava" />
            <h5>The Dumb</h5>"
          </div>
          <div class="SingleFriend__container">
            <img src={require("../../assets/img/man.svg").default} alt="ava" />
            <h5>Cuong Xuan</h5>
          </div>
          <div class="SingleFriend__container">
            <img src={require("../../assets/img/man.svg").default} alt="ava" />
            <h5>Bao Ngu</h5>
          </div>
          <div class="SingleFriend__container">
            <img src={require("../../assets/img/man.svg").default} alt="ava" />
            <h5>Truong Ngu</h5>
          </div>
          <div class="SingleFriend__container">
            <img src={require("../../assets/img/man.svg").default} alt="ava" />
            <h5>Vu Ngu</h5>
          </div>
          <div class="SingleFriend__container">
            <img
              src={require("../../assets/img/woman.svg").default}
              alt="ava"
            />
            <h5>Dang Phuc</h5>
          </div>
        </div>
      </div>
      <div class="Profile">
        <div class="Profile__header">
          <img
            src="https://s.memehay.com/files/posts/20200915/cheems-cho-vang-dua-hai-ban-tay-ra-dau-vjp-rat-vip-49528c40332aafc321ee556b0412ec67.jpg"
            alt="background img"
          />
        </div>
        <div class="Profile__info">
          <img
            class="Profile__info-photo"
            src="https://play-lh.googleusercontent.com/xlnwmXFvzc9Avfl1ppJVURc7f3WynHvlA749D1lPjT-_bxycZIj3mODkNV_GfIKOYJmG"
            alt="img"
          />
          <div class="Profile__info-nameUser">
            <h1 className="text__info">{text}</h1>
            <button class="btn__edit" type="" onClick={handleEdit}>
              <img
                src={require("../../assets/img/edit.svg").default}
                alt="edit profile"
              />
              <p>{buttonText}</p>
            </button>
          </div>
        </div>
        <div class="Profile__container-content">
          <div class="Profile__details">
            <div class="input__info">
              <p class="text__bold">user info</p>
              <p class="text__bold text__width">details</p>
            </div>
            <div class="input__info">
              <p>Full name:</p>
              <input
                id="user-name-input"
                type="text"
                placeholder={user.full_name}
                disabled
                ref={userFullname}
              ></input>
            </div>
            <div class="input__info">
              <p>username:</p>
              <input
                id="user-email-input"
                type="email"
                placeholder={user.username}
                disabled
              ></input>
            </div>
            <div class="input__info">
              <p>Password:</p>
              <a type="button" href="/changepassword">
                Reset Password
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="TaskList">
        <div class="TaskList__header">
          <h2>Some Tasklists</h2>
        </div>
        <div class="TaskList__list">
          {tasks.map((task) => (
            <Link
              to={`/task/${task._id}`}
              style={{ color: "black", textDecoration: "none" }}
            >
              <div class="SingleFriend__container">
                <img
                  src={
                    require("../../assets/img/landscape-svgrepo-com.svg")
                      .default
                  }
                  alt="ava"
                />{" "}
                <h5>{task.name}</h5>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
