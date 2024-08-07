// src/App.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import { auth } from "./config/firebaseConfig";
import { login, logout } from "./redux/actions/authActions";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  console.log(user);
  console.log("hello");


  return <div>{user ? <TodoList /> : <Login />}</div>;
};

export default App;
