import { useEffect, useState } from "react";
import { todozCollection, db } from "../Firebase";
import { onSnapshot, doc, addDoc, deleteDoc, setDoc } from "firebase/firestore";

import Profile from "../Profile/Profile";

import "../Dashboard/Dashboard.css";

export default function Dashboard(props) {
  document.body.classList.remove("body--login");
  document.body.classList.add("gradient-background");
  document.body.classList.add("body--newTodo");

  const { loggedUser } = props;

  const [tempToDo, setTempTodo] = useState({
    userName: "",
    toDo: "",
    situation: 0,
  });
  const [allTodoz, setAllTodoz] = useState(null);
  const [completedTodoz, setCompletedTodoz] = useState(null);
  const [waitingTodoz, setWaitingTodoz] = useState(null);
  const [userChoice, setUserChoice] = useState("allTodoz");

  // console.log("All todoz of user:");
  // console.log(allTodoz);
  useEffect(() => {
    //? Watching the Database
    const unsub = onSnapshot(todozCollection, (snapshot) => {
      console.log("%cTodoz in the database are was read..", "color: orange");
      console.log(`Logged User: ${JSON.stringify(loggedUser.userName)}`);
      const userzTodoz = snapshot.docs.map((todo) => {
        return {
          id: todo.id,
          ...todo.data(),
        };
      });
      // console.log(userzTodoz); //!Gettin all the todos.. this is bad but nvm for now.
      //? READIN':
      if (userzTodoz.length > 0 && userzTodoz != null) {
        setAllTodoz(() =>
          userzTodoz.filter((td) => td.userName == loggedUser.userName)
        );
        setWaitingTodoz(() => {
          return userzTodoz.filter(
            (todo) =>
              todo.situation == 0 && todo.userName == loggedUser.userName
          );
        });
        setCompletedTodoz(() => {
          return userzTodoz.filter(
            (todo) =>
              todo.situation == 1 && todo.userName == loggedUser.userName
          );
        });
      } else {
        setAllTodoz(null);
      }
    });

    return unsub;
  }, []);

  const handleNewTodo = (e, incominUserName) => {
    console.log("New todo..");
    console.log(e.key);

    const { name, value } = e.target;

    setTempTodo((prev) => {
      return { ...prev, userName: loggedUser.userName, [name]: value };
    });
  };

  const handleNewTodoEnter = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();

      const addNewTodo = async () => {
        const newTodoRef = await addDoc(todozCollection, tempToDo); //? Getting the reference of the process.
      };

      addNewTodo();
      console.log("New todo submitted");
      e.target.parentElement.reset();
    }
  };

  const handleCompleteToDo = async (e, todoID, todoSituation) => {
    const refTodo = doc(db, "todoz", todoID);
    await setDoc(
      refTodo,
      {
        situation: todoSituation == 0 ? 1 : 0,
      },
      { merge: true }
    );
  };

  //ALL TODOZ
  const elementzTodoz = allTodoz?.map((todoz) => {
    // return <h2>Todo: {todoz.toDo}</h2>;
    // console.log(`Todo' z id: ${todoz.id}`);
    return (
      <>
        <div
          className="todo--bg-1"
          key={allTodoz.indexOf(todoz.id)}
          onClick={(e) => handleCompleteToDo(e, todoz.id, todoz.situation)}
        >
          <h2
            style={
              todoz.situation == 0
                ? { textDecoration: "none" }
                : { textDecoration: "line-through" }
            }
          >
            {todoz.toDo}
          </h2>
          <p className="todo--done">
            {todoz.situation == 0 ? "Todo" : "Done"}&nbsp;&nbsp;
            {todoz.situation == 0 ? (
              ""
            ) : (
              <i className="fa-solid fa-check fa-sm"></i>
            )}
          </p>
        </div>
      </>
    );
  });
  // //Completed TODOZ
  const elementCompletedTodoz = completedTodoz?.map((todoz) => {
    // return <h2>Todo: {todoz.toDo}</h2>;
    // console.log(`Todo' z id: ${todoz.id}`);
    return (
      <>
        <div
          className="todo--bg-1"
          key={allTodoz.indexOf(todoz.id)}
          onClick={(e) => handleCompleteToDo(e, todoz.id, todoz.situation)}
        >
          <h2
            style={
              todoz.situation == 0
                ? { textDecoration: "none" }
                : { textDecoration: "line-through" }
            }
          >
            {todoz.toDo}
          </h2>
          <p>{todoz.situation == 0 ? "Todo" : "Done"}</p>
        </div>
      </>
    );
  });
  // //Waiting TODOZ
  const elementWaitingTodoz = waitingTodoz?.map((todoz) => {
    // return <h2>Todo: {todoz.toDo}</h2>;
    // console.log(`Todo' z id: ${todoz.id}`);
    return (
      <>
        <div
          className="todo--bg-1"
          key={allTodoz.indexOf(todoz.id)}
          onClick={(e) => handleCompleteToDo(e, todoz.id, todoz.situation)}
        >
          <h2
            style={
              todoz.situation == 0
                ? { textDecoration: "none" }
                : { textDecoration: "line-through" }
            }
          >
            {todoz.toDo}
          </h2>
          <p>{todoz.situation == 0 ? "Todo" : "Done"}</p>
        </div>
      </>
    );
  });

  // console.log(elementzTodoz);
  // console.log(completedTodoz);
  // console.log(waitingTodoz);

  return (
    <>
      <div className="loading--container">
        <div className="loading--loading-bar">
          <div className="loading--loading-bar--progress">
            <span className="loading--first"></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span className="loading--last"></span>
          </div>
        </div>
      </div>
      {setTimeout(() => {
        document
          .querySelector(".loading--container")
          .classList.add("loading--hide");
        document
          .querySelector(".loading--after")
          .classList.add("visibilityHidden", "visibilityVisible");
      }, 3000)}
      <div className="loading--after visibilityHidden gradient-background">
        <div className="navbar--back"></div>
        <nav>
          <a onClick={() => setUserChoice("allTodoz")}>
            All Todoz&nbsp;&nbsp;
            <i className="fa-solid fa-list-check fa-lg"></i>
          </a>
          &nbsp;|&nbsp;
          <a
            onClick={() => {
              setUserChoice("waitingTodoz");
              console.log("%cUser went to waiting todoz.", "color: orange");
            }}
          >
            Waiting to do&nbsp;&nbsp;
            <i className="fa-brands fa-phoenix-framework fa-lg"></i>
          </a>
          &nbsp;|&nbsp;
          <a
            onClick={() => {
              setUserChoice("completedTodoz");
              console.log("%cUser went to completed todoz.", "color: orange");
            }}
          >
            Completed&nbsp;&nbsp;<i className="fa-solid fa-check fa-lg"></i>
          </a>
          &nbsp;|&nbsp;
          <a
            onClick={() => {
              setUserChoice("Profile");
              console.log("%cUser went to Profile page.", "color: orange");
            }}
          >
            Profile&nbsp;&nbsp;<i className="fa-solid fa-user fa-lg"></i>
          </a>
          &nbsp;|&nbsp;
          <a href="/">
            Logout <i className="fa-solid fa-power-off fa-lg"></i>
          </a>
        </nav>
        <h2 className="user--header">
          {userChoice == "allTodoz" && "Welcome:"}
          {userChoice == "completedTodoz" && "Great job:"}
          {userChoice == "waitingTodoz" && "Move your ass:"}{" "}
          {userChoice != "Profile" && loggedUser.userName}
          {userChoice == "Profile" && "Profile"}
        </h2>
        {userChoice == "allTodoz" && (
          <form
            className="form__group field newTodo"
            onKeyPress={handleNewTodoEnter}
          >
            <input
              type="input"
              className="form__field"
              placeholder="Add new to-do item"
              name="toDo"
              id="toDo"
              onChange={(e) => handleNewTodo(e, loggedUser)}
              required
            />
            <label htmlFor="toDo" className="form__label">
              Add new to-do item
            </label>
          </form>
        )}
        {userChoice == "Profile" && (
          <Profile
            setUserChoice={setUserChoice}
            user={loggedUser}
            completedTodoCount={completedTodoz.length}
            waitingTodoCount={waitingTodoz.length}
            allTodoCount={allTodoz.length}
          />
        )}
        <div className="todo--container" style={{ width: "90%" }}>
          {userChoice == "allTodoz" && elementzTodoz}
          {userChoice == "completedTodoz" && elementCompletedTodoz}
          {userChoice == "waitingTodoz" && elementWaitingTodoz}
        </div>
      </div>
    </>
  );
}
