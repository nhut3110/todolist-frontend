import search from "../../assets/img/search.svg";
import "./UserScreen.css";
import { SingleList } from "../../components";
import addBtn from "../../assets/img/add-svgrepo-com-black.svg";
import person from "../../assets/img/person-svgrepo-com.svg";
import people from "../../assets/img/people-svgrepo-com.svg";
import { useEffect, useState } from "react";
import AddList from "../AddList/AddList";
import axios from "axios";
import Loading from "../Loading/Loading";
import UserService from "../../services/user.service";
import TokenService from "../../services/token.service";

export default function UserScreen() {
  const [showAddList, setShowAddList] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddList = () => {
    setShowAddList(!showAddList);
  };

  const getTasks = async () => {
    UserService.getList(TokenService.getUserID()).then((response) => {
      setTasks(response.data);
      // console.log(response.data);
    });
  };

  useEffect(() => {
    setLoading(true);
    getTasks();
    // console.log(tasks);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
      <div class="UserSpace__header">
        <p>Let make some todo lists</p>
        <div>
          <img
            class="UserSpace__header-search"
            src={addBtn}
            alt="Add list"
            onClick={() => setShowAddList(true)}
          />
        </div>
      </div>
      <div className="UserSpace__Lists-container">
        {!loading ? (
          <>
            <div class="UserSpace__Lists">
              {tasks.map((item, idx) => (
                <SingleList
                  key={idx}
                  props={item}
                  tasks={tasks}
                  setTasks={setTasks}
                  setLoading={setLoading}
                />
              ))}
            </div>
            <AddList
              onClose={handleAddList}
              visible={showAddList}
              type={"task"}
              setTasks={setTasks}
            />
          </>
        ) : (
          <Loading type={"spin"} color={"#333"} />
        )}
      </div>
    </div>
  );
}
