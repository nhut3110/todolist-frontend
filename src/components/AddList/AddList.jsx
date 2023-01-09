import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import TokenService from "../../services/token.service";
import UserService from "../../services/user.service";
import "./AddList.css";
export default function AddList({
  onClose,
  visible,
  type,
  edit,
  data,
  setTasks,
  setTodos,
}) {
  const listName = useRef();
  const listDes = useRef();
  const listEmail = useRef();
  const [errors, setErrors] = useState("");
  const [editData, setEditData] = useState({});

  const handleOnClose = (e) => {
    if (e.target.id === "NewList") {
      setErrors("");
      onClose();
    }
  };
  if (!visible) return null;

  const timeoutLoading = async () => {
    // setLoading(true);
    setTimeout(() => {
      if (type === "task") {
        UserService.getList(TokenService.getUserID()).then((response) => {
          setTasks(response.data);
          console.log(response.data);
        });
      } else {
        UserService.getTodoByListID(edit ? data.list_id : data).then((res) => {
          console.log(res.data);
          setTodos(res.data);
        });
      }
    }, 500);
    // setLoading(false);
  };

  const handleEdit = async () => {
    const editName =
      listName.current.value === "" ? data.name : listName.current.value;
    const editDescription =
      listDes.current.value === "" ? data.description : listDes.current.value;
    try {
      if (type === "task") {
        UserService.updateList(data._id, {
          name: editName,
          description: editDescription,
        }).then((response) => {
          console.log(response);
        });
      } else {
        UserService.updateTodo(data._id, {
          name: editName,
          description: editDescription,
        }).then((response) => {
          console.log(response);
        });
      }
      onClose();
      timeoutLoading();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    let newData = {
      name: listName.current.value,
      description: listDes.current.value,
      user_id: TokenService.getUserID(),
    };
    if (type === "todo")
      newData = {
        ...newData,
        list_id: data,
      };
    console.log(newData);
    try {
      if (type === "task") {
        UserService.createList(newData).then((response) => {
          console.log(response);
        });
      } else {
        UserService.createTodo(newData).then((response) => {
          console.log(response);
        });
      }
      onClose();
      timeoutLoading();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal__createList" id="NewList" onClick={handleOnClose}>
      <div className="modal__createList-box">
        <div className="modal__createList-header">
          <h1> {edit ? "Let's edit something" : "Create something new!"}</h1>
          <p className="btn__close" onClick={onClose} type="">
            x
          </p>
        </div>

        <div>
          <input
            className="List__name"
            placeholder={edit ? data.name : "Type new name here"}
            ref={listName}
            required
          />
          <input
            className="List__name"
            placeholder={
              edit ? data.description : "Give me some new description"
            }
            ref={listDes}
          />
        </div>

        <button
          className="btn__create"
          onClick={edit ? handleEdit : handleCreate}
        >
          {edit ? "Edit" : "Create"}
        </button>
      </div>
    </div>
  );
}
