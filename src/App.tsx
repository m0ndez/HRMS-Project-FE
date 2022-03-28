import { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { Login } from "pages";
import { Route, Routes } from "react-router-dom";

function App() {

  return (
   <Routes>
     <Route element={<Login />} index />
   </Routes>
  );
}

export default App;
