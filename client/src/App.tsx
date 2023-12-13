import React from "react";
import "./App.css";
import { Tasks } from "./components/tasks";
import { Auth } from "./components/auth";

export const App = () => {
  return (
    <div className="app">
      <div className="app-header"><Auth /></div>
      <Tasks />
    </div>
  );
};
