

import React from 'react';
import { IoIosArrowDropdown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { API_END_POINT } from '../utils/constant';
import axios from "axios";
import { setUser } from '../redux/userSlice';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setToggle } from '../redux/movieSlice';
import { Bell, Search } from "lucide-react";

const Header = () => {
  const user = useSelector((store) => store.app.user);
  const toggle = useSelector((store) => store.movie.toggle);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${API_END_POINT}/api/v1/user/logout`, {
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
      dispatch(setUser(null));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleHandler = () => {
    dispatch(setToggle());
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black via-transparent to-transparent text-white">
      {/* Left: Logo and Menu */}
      <div className="flex items-center gap-8">
        <img
          className="w-28 md:w-36"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="netflix-logo"
        />

        {user && (
          <ul className="hidden md:flex items-center gap-6 text-sm font-light">
            <li className="font-bold cursor-pointer hover:text-red-500 transition">Home</li>
            <li className="cursor-pointer hover:text-red-500 transition">TV Shows</li>
            <li className="cursor-pointer hover:text-red-500 transition">Movies</li>
            <li className="cursor-pointer hover:text-red-500 transition">Games</li>
            <li className="cursor-pointer hover:text-red-500 transition">New & Popular</li>
            <li className="cursor-pointer hover:text-red-500 transition">My List</li>
            <li className="cursor-pointer hover:text-red-500 transition">Browse by Languages</li>
          </ul>
        )}
      </div>

      {/* Right: User + Buttons */}
      {user && (
        <div className="flex items-center gap-4">
       

          <div className="relative cursor-pointer">
            <Bell className="w-5 h-5 hover:text-red-500 transition" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">3</span>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-1">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="profile"
              className="w-8 h-8 rounded"
            />
            <IoIosArrowDropdown size="20px" />
            <h1 className="text-sm md:text-base font-medium">{user.fullName}</h1>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 ml-4">
            <button
              onClick={logoutHandler}
              className="bg-red-700 text-white font-bold px-4 py-2 rounded-md shadow-md hover:bg-red-800 transition duration-200"
            >
              Logout
            </button>
            <button
              onClick={toggleHandler}
              className="bg-red-700 text-white font-bold px-4 py-2 rounded-md shadow-md hover:bg-red-800 transition duration-200"
            >
              {toggle ? "Home" : "Search Movie"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;


