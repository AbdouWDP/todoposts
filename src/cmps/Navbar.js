import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { LuListTodo } from "react-icons/lu";
import { Tooltip, Zoom } from "@mui/material";

export default function Navbar() {
  const userAuth = JSON.parse(localStorage.getItem("u"));
  const [user, setUser] = useState();
  function fetchUser(id) {
    axios
      .get("https://dummyjson.com/users/" + id)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchUser(userAuth.userId);
  }, [userAuth.userId]);

  function removeUser() {
    localStorage.setItem("u", JSON.stringify({}));
    window.location.reload();
  }

  return (
    <>
      <header className="navbar w-full h-16 sticky bg-gray-100">
        <div
          className="w-11/12 h-full m-auto flex items-center justify-between"
          style={{ borderBottom: "1px solid gray" }}
        >
          <div className="logo flex gap-4 items-center">
            <Link to="/home">
              <div className="text-4xl max-sm:text-2xl whitespace-nowrap font-bold flex items-center gap-2">
                <span>
                  <h1>TODO APP</h1>
                </span>
                <span>
                  <LuListTodo />
                </span>
              </div>
            </Link>
            {userAuth.token && (
              <Tooltip title="Logout" placement="bottom">
                <motion.button
                  className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-2xl"
                  onClick={removeUser}
                  whileHover={{ width: "100px" }}
                >
                  <IoLogOutOutline className="m-auto text-2xl" />
                </motion.button>
              </Tooltip>
            )}
          </div>

          {userAuth.token && (
            <nav className="menu">
              <ol className="flex gap-4 items-center">
                <li>
                  <button className="font-semibold w-24 h-8 bg-orange-500 hover:bg-gray-100 text-white hover:text-orange-500 rounded-2xl text-md max-md:hidden">
                    My Todos
                  </button>
                </li>
                <Link to={`/profile/${userAuth.userId}`}>
                  <li className="cursor-pointer hover:underline">
                    <p className="font-semibold text-lg">
                      {user !== undefined && user.username}
                    </p>
                  </li>
                </Link>
                <Link to={`/profile/${userAuth.userId}`}>
                  <Tooltip
                    title="My Profile"
                    placement="bottom"
                    TransitionComponent={Zoom}
                  >
                    <li>
                      <div className="h-12 w-12 cursor-pointer">
                        <img
                          src={user !== undefined && user.image}
                          className="w-full h-full object-cover"
                          style={{ borderRadius: "50%" }}
                          alt=""
                        />
                      </div>
                    </li>
                  </Tooltip>
                </Link>
              </ol>
            </nav>
          )}

          {!userAuth.token && (
            <nav className="guest-navigation">
              <Link to="/">
                <button
                  className="w-24 h-8 text-white font-semibold rounded-sm hover:shadow-lg"
                  style={{ backgroundColor: "#0D6EFD" }}
                >
                  Login
                </button>
              </Link>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
