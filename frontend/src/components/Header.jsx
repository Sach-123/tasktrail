import React from "react";
import logoDesign from "../assets/logo_design.png";
import { NavLink, } from "react-router-dom";
const Header = () => {
  
  return (
    <div className="flex justify-between h-[60px]  items-center px-2 ">
      <NavLink to='/' className="flex w-10 items-center hover:cursor-pointer">
        <img className="" src={logoDesign} alt="logo design" />
        <div className="hover:text-fuchsia-600 text-xl font-mono">
          TaskTrail
        </div>
      </NavLink>
      <div className="flex-col justify-around">
        <NavLink to="/" className={({isActive}) => `mx-2 ${isActive? "opacity-100":"opacity-50"}`}>Home</NavLink>
        <NavLink to="/users/login" className={({isActive}) => `mx-2 ${isActive? "opacity-100":"opacity-50"}`}>Login</NavLink>
        <NavLink to="/users/register" className={({isActive}) => `mx-2 ${isActive? "opacity-100":"opacity-50"}`}>Register</NavLink>
      </div>
    </div>
  );
};

export default Header;
