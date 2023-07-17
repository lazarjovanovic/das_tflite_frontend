//npx create-react-app das_tflite_frontend --use-npm
//npm start --port 11000
//"type": "module", in package.json

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import Register from "./Register";
import Login from "./Login";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from './logo.svg';
//import './styles/App.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  function handleOnCLickLogIn()
  {
    setIsLogin(true);
    setIsRegister(false);
  };

  function handleOnCLickRegister()
  {
    setIsLogin(false);
    setIsRegister(true);
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <div className="title">Derma App</div>
      <hr/>
      <form>
        <div className="button-container">
        <Button variant="primary" style={{margin:5, width:"80px"}} onClick={handleOnCLickLogIn}>Log in</Button>
        </div>
        <div className="button-container">
        <Button variant="success" style={{margin:5}} onClick={handleOnCLickRegister}>Register</Button>
        </div>
      </form>
    </div>
  );

  const renderLoginRegisterForm = (
    <div className="form">
    <div className="title">Derma App</div>
    <form>
      <button
        type="button"
        className="btn primary"
        onClick={handleOnCLickLogIn}
      >Sign In</button>
      <button
        type="button"
        className="btn primary"
        onClick={handleOnCLickRegister}
      >Register</button>
    </form>
  </div>
  )

  return (
    <div className="app">
      <div className="login-form">
      {isLogin ? <Login/> :
      isRegister ? <Register/> : renderForm}
      </div>
    </div>
  );
}

export default App;
