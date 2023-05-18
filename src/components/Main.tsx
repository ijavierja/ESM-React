import React from "react";
import Profile from "./Profile";
import Employees from "./Employees";

const Main = () => {
  return (
    <div className="h-screen w-screen flex">
      <Profile />
      <Employees />
    </div>
  );
};

export default Main;
