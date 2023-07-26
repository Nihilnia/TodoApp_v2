import { useState, useEffect } from "react";
import { userzCollection, countEmCollection, db } from "./Firebase";
import { onSnapshot, doc, addDoc, deleteDoc, setDoc } from "firebase/firestore";

import Login from "./Login/Login.jsx";
import Register from "./Register/Register";
import Dashboard from "./Dashboard/Dashboard";
import Modal from "./Modal/Modal";

// import "./App.css";

export default function App() {
  const [userz, setUserz] = useState([]);
  const [tempData, setTempData] = useState({
    userName: "",
    passWord: "",
  });
  const [page, setPage] = useState("Login");
  const [showModal, setShowModal] = useState({
    isShow: false,
    userName: "",
    information: "",
  });

  const handlePaging = (e, incominPage) => {
    setPage(incominPage);
    setShowModal((prev) => {
      return { ...prev, isShow: false };
    });
    return page;
  };

  const [loggedUser, setLoggedUser] = useState("");

  const [newTodo, setNewTodo] = useState({
    toDoName: "",
  });

  //!_countEm
  const ddate = new Date();
  const yyyy = ddate.getFullYear();
  let mm = ddate.getMonth() + 1;
  let dd = ddate.getDate();

  let formatDate = `${dd}/ ${mm}/ ${yyyy}`;

  // console.log(formatDate);

  const generateRandNumb = (max) => {
    return Math.floor(Math.random() * max);
  };

  const handleTraffic = (whoIsIt, fPage) => {
    const doCount = async () => {
      const newCountRef = await addDoc(countEmCollection, {
        time: ddate,
        date: formatDate,
        page: fPage != null ? fPage : page,
        randNum: generateRandNumb(1000),
        user: whoIsIt,
      });
    };

    doCount();
  };

  useEffect(() => {
    //? Watching the Database
    const unsub = onSnapshot(userzCollection, (snapshot) => {
      snapshot.docs.length == 0
        ? console.log("%cDatabase is empty now..", "color: orange")
        : console.log("%cDatabase is ready..", "color: orange");

      const allUserz = snapshot.docs.map((user) => {
        return {
          id: user.id,
          ...user.data(),
        };
      });

      //? READIN':
      setUserz(allUserz);
    });

    return unsub;
  }, []);

  const handleChange = (e) => {
    page == "Login"
      ? console.log("User trying to login..")
      : console.log("User trying to register..");
    // console.log("Change happened..");
    // console.log(e.target);

    const { name, value } = e.target;

    setTempData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    // console.log(e);
    if (e.key == "Enter" || e.type == "click") {
      e.preventDefault();

      let getUserInfo = userz.filter(
        (user) => user.userName == tempData.userName
      );

      // console.log("When new username is av..");
      // console.log(getUserInfo);

      //? Check if the user trying to log- in or registerin'
      if (page == "Register") {
        //TODO: Check if the username is available.
        if (getUserInfo.length == 0) {
          // console.log("mor yazma");

          // console.log("TempData");
          // console.log(tempData);

          const newUser = async () => {
            const refRegister = await addDoc(userzCollection, {
              userName: tempData.userName,
              passWord: tempData.passWord,
              time: ddate,
              date: formatDate,
              randNum: generateRandNumb(444),
            });
          };

          newUser();
          setShowModal(() => {
            return {
              isShow: true,
              information: "Register completed. You can log- in.",
              userName: tempData.userName,
            };
          });
        } else {
          console.log("%cThis username is taken.", "color: orange");
          setShowModal(() => {
            return {
              isShow: true,
              information: "This username is taken.",
              userName: tempData.userName,
            };
          });
        }
      } else if (page == "Login") {
        if (getUserInfo.length > 0) {
          if (getUserInfo[0].passWord == tempData.passWord) {
            console.log("%cLogin succesful..", "color: orange");
            setLoggedUser(getUserInfo[0]);
            setPage("Dashboard");
          } else {
            console.log("%cPassword is wrong.", "color: orange");
            setShowModal(() => {
              return {
                isShow: true,
                information: "Password is wrong.",
                userName: tempData.userName,
              };
            });
          }
        } else {
          console.log("%cUser not found..", "color: orange");
          setShowModal(() => {
            return {
              isShow: true,
              information: "User not found.",
              userName: tempData.userName,
            };
          });
        }
      }

      e.target.parentElement.reset();
    }
  };

  // console.log("Modal is:" + showModal);

  return (
    <>
      {page == "Login" && (
        <Login
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handlePaging={handlePaging}
          showModal={showModal}
          setShowModal={setShowModal}
          handleTraffic={handleTraffic}
        />
      )}
      {page == "Register" && (
        <Register
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handlePaging={handlePaging}
          showModal={showModal}
          setShowModal={setShowModal}
          handleTraffic={handleTraffic}
        />
      )}
      {page == "Dashboard" && (
        <Dashboard loggedUser={loggedUser} handleTraffic={handleTraffic} />
      )}
    </>
  );
}
