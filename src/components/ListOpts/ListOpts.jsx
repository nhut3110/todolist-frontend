import editIcon from "../../assets/img/editOpts.svg";
import moveIcon from "../../assets/img/upMove.svg";
import cloneIcon from "../../assets/img/clone.svg";
import trashIcon from "../../assets/img/trash.svg";
import AddList from "../AddList/AddList";
import { useEffect, useState } from "react";
import "./ListOpts.css";
import axios from "axios";
import UserService from "../../services/user.service";
import TokenService from "../../services/token.service";
import { ConfirmDialog } from "../Comfirm Dialog/ConfirmDialog";

export default function ListOpts({ data, setTasks, show, setLoading }) {
  const [showAddList, setShowAddList] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [tempID, setTempID] = useState(null);
  const [todos, setTodos] = useState([]);
  const handleAddList = () => {
    setShowAddList(!showAddList);
  };

  const handleShowDialog = () => {
    setShowDialog(!showDialog);
  };

  const handleEdit = async (e) => {
    setShowAddList(true);
  };

  const timeoutLoading = async () => {
    setLoading(true);
    setTimeout(() => {
      UserService.getList(TokenService.getUserID()).then((response) => {
        setTasks(response.data);
        console.log(response.data);
      });
    }, 500);
    setLoading(false);
    show(false);
  };

  const handleDuplicate = async () => {
    try {
      await UserService.createList({
        name: data.name,
        description: data.description,
        user_id: TokenService.getUserID(),
      }).then((response) => {
        console.log(response);
        setTempID(response.data._id);
      });
      await UserService.getTodoByListID(data._id).then((response) => {
        console.log(response);
        setTodos(response.data);
      });
      todos.map(async (todo) => {
        await UserService.createTodo(
          {
            ...todo,
            list_id: tempID,
          }.then((response) => {
            console.log(response);
          })
        );
      });
      timeoutLoading();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBox = async () => {
    setShowDialog(true);
  };

  const handleDelete = async () => {
    try {
      UserService.deleteList(data._id).then((res) => {
        console.log(res);
      });
      timeoutLoading();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id="ListOpts" class="ListOpts__box">
      <div className="ListOpts__func" onClick={handleEdit}>
        <img src={editIcon} alt="" />
        <p>Edit</p>
      </div>
      <hr />
      <div className="ListOpts__func" onClick={handleDuplicate}>
        <img src={cloneIcon} alt="" />
        <p>Duplicate</p>
      </div>
      <hr />
      <div className="ListOpts__func" onClick={handleDeleteBox}>
        <img src={trashIcon} alt="" />
        <p>Delete</p>
      </div>
      <AddList
        onClose={handleAddList}
        visible={showAddList}
        type={"task"}
        edit={true}
        data={data}
        setTasks={setTasks}
      />
      <ConfirmDialog
        onClose={handleShowDialog}
        visible={showDialog}
        handleDelete={handleDelete}
      />
    </div>
  );
}
