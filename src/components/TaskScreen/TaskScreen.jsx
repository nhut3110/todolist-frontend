import "./TaskScreen.css";
import { SingleTask } from "../../components";
import { useLocation, useNavigate, useNavigation } from "react-router";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import AddList from "../AddList/AddList";
import Loading from "../Loading/Loading";
import UserService from "../../services/user.service";
export default function TaskScreen() {
  const [showAddList, setShowAddList] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [pinTodo, setpinTodo] = useState({});
  const handleAddList = () => {
    setShowAddList(!showAddList);
  };

  const getTodos = async () => {
    await UserService.getTodoByListID(location).then((response) => {
      response.data.map((todo) => {
        if (todo.is_pinned === true) {
          setpinTodo(todo);
        }
      });
      setTodos(response.data);
    });
  };
  useEffect(() => {
    setLoading(true);
    getTodos();
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleBack = (e) => {
    navigate("/userspace");
  };

  return (
    <div>
      <div class="UserSpace__header">
        <p>What will we do?</p>
        <div>
          <button
            class="btn__share"
            onClick={() => {
              setShowAddList(true);
            }}
          >
            Create
          </button>

          <button class="btn__share" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
      <div className="TodosBoard__container">
        {loading ? (
          <Loading type={"spin"} color={"#333"} />
        ) : (
          <>
            <SingleTask
              listID={location}
              todo={pinTodo ? pinTodo : null}
              setpinTodo={setpinTodo}
              setTodos={setTodos}
              pin={true}
            />
            <hr className="TodosBoard__container-hr" />
            {todos.map((item) => (
              <SingleTask
                listID={location}
                todo={item}
                setpinTodo={setpinTodo}
                setTodos={setTodos}
                setLoading={setLoading}
              />
            ))}
          </>
        )}
      </div>
      <AddList
        onClose={handleAddList}
        visible={showAddList}
        type={"todo"}
        data={location}
        setTodos={setTodos}
      />
    </div>
  );
}
