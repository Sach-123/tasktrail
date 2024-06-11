import React from "react";
import { NavLink } from "react-router-dom";
import TaskCard from "./TaskCard";
const Home = () => {
  return (
    <div className="flex flex-col m-auto  items-center">
      <h1 className="text-5xl m-10 font-bold text-center">
        A <span className="text-fuchsia-600 ">Simple</span>,{" "}
        <span className="text-fuchsia-600">Secure</span> and{" "}
        <span className="text-fuchsia-600">Fast</span> To-Do manager.
        <span className="text-fuchsia-600 animate-pulse font-normal">|</span>
      </h1>
      <NavLink to="/users/login">
      <button className="login-btn font-bold">Login</button>
      </NavLink>
      <p className="my-2">Login to <b>add/view</b> tasks.</p>
    </div>
  );
};

export default Home;
