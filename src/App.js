import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./cmps/Login";
import Navbar from "./cmps/Navbar";
import Home from "./cmps/Home";
import Profile from "./cmps/Profile";

function App() {
  localStorage.setItem("u", JSON.stringify({}));
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="" element={<Login />} />
        <Route path="profile/:userId" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
