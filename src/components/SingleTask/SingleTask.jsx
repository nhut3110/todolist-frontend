import "./SingleTask.css";
import editIcon from "../../assets/img/editOpts.svg";
import cloneIcon from "../../assets/img/clone.svg";
import trashIcon from "../../assets/img/trash.svg";
import pinIcon from "../../assets/img/pin-svgrepo-com.svg";
import AddList from "../AddList/AddList";
import { useState } from "react";
import UserService from "../../services/user.service";
import { ConfirmDialog } from "../Comfirm Dialog/ConfirmDialog";

export default function SingleTask({
  todo,
  setpinTodo,
  setTodos,
  listID,
  pin,
}) {
  const [showAddList, setShowAddList] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [done, setDone] = useState(todo.done);
  const checkPin = Object.keys(todo).length === 0;
  const handleAddList = () => {
    setShowAddList(!showAddList);
  };

  const handleShowDialog = () => {
    setShowDialog(!showDialog);
  };

  const refreshList = async () => {
    UserService.getTodoByListID(listID).then((res) => {
      setTodos(res.data);
    });
  };

  const handleDeleteBox = async () => {
    setShowDialog(true);
  };

  const handleDelete = async (e) => {
    try {
      UserService.deleteTodo(todo._id).then((res) => {
        console.log(res);
        if (todo.is_pinned) {
          setpinTodo({});
          setDone(false);
        }
        refreshList();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDuplicate = async (e) => {
    try {
      UserService.createTodo({
        name: todo.name,
        description: todo.description,
        list_id: listID,
      }).then((res) => {
        console.log(res);
        refreshList();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePin = async () => {
    if (!todo.is_pinned) {
      UserService.pinTodo(todo._id, { list_id: listID }).then((res) => {
        console.log(res);
        UserService.getTodo(todo._id).then((res) => {
          console.log(res);
          setpinTodo(res.data);
        });
        refreshList();
      });
    } else {
      UserService.unpinTodo(todo._id).then((res) => {
        setpinTodo({});
        setDone(false);
        refreshList();
      });
    }
  };

  const handleCheckboxChange = async (e) => {
    UserService.updateTodo(todo._id, { done: !todo.done }).then((res) => {
      console.log(res);
      refreshList();
    });
    setDone(!done);
  };
  return (
    <div
      className="task__container"
      style={
        pin
          ? { border: "2px solid red" }
          : todo.is_pinned
          ? { display: "none" }
          : null
      }
    >
      <div className="task__container-name">
        {checkPin ? null : (
          <input
            id="task__checkbox"
            type="checkbox"
            defaultChecked={todo.done}
            onChange={handleCheckboxChange}
          />
        )}

        <p
          id="task__name"
          style={{
            ...(done
              ? {
                  textDecorationLine: "line-through",
                  fontStyle: "italic",
                }
              : {}),
          }}
        >
          {pin ? (
            checkPin ? (
              <strong>Nothing has been pinned here!</strong>
            ) : (
              <strong>{todo.name}</strong>
            )
          ) : (
            todo.name
          )}
        </p>
      </div>
      {!checkPin ? (
        <div className="task__container-icon">
          <img src={pinIcon} alt="" onClick={handlePin} />
          <img src={editIcon} alt="" onClick={() => setShowAddList(true)} />
          <img src={cloneIcon} alt="" onClick={handleDuplicate} />
          <img src={trashIcon} alt="" onClick={handleDeleteBox} />
        </div>
      ) : null}

      <AddList
        onClose={handleAddList}
        visible={showAddList}
        type={"todo"}
        edit={true}
        data={todo}
        setTodos={setTodos}
      />
      <ConfirmDialog
        onClose={handleShowDialog}
        visible={showDialog}
        handleDelete={handleDelete}
      />
    </div>
  );
}
