import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <h1 className="text-xl font-semibold tracking-wide">Pizza Shop Order System</h1>
        {user ? (
          <div className="flex items-center gap-4">
            <img
              className="w-10 h-10 rounded-full border-2 border-white"
              src="/static/images/avatar/1.jpg"
              alt={user.name}
            />
            <span className="text-sm font-medium">
              {`Logged in as ${user.role === "owner" ? "Owner" : "Customer"}`}
            </span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/")}
            className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
