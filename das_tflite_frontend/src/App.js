//npx create-react-app das_tflite_frontend --use-npm
//npm start --port 11000
//"type": "module", in package.json

import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

import logo from './logo.svg';
import './styles/App.css';

function App() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = {
    invalid_login: "Invalid login"
  };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    const encoded_pwd = btoa(pass.value)

    const requestOptions = {
      username: uname.value, 
      password: encoded_pwd
      //password: pass.value
    };
    const response = await axios.post('http://localhost:10000/login', requestOptions);
    const userData = response.data

    if (userData) {
      if (userData.user_id === null) {
        setErrorMessages({ name: "invalid_login_label", message: errors.invalid_login });
      } else {
        const user_role = userData.user_role
        setIsSubmitted(true);
        // TODO redirect to another page
      }
    } else {
      setErrorMessages({ name: "invalid_login_label", message: errors.invalid_login });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("invalid_login_label")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default App;
