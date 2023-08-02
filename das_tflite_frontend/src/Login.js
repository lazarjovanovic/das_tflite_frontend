//npx create-react-app das_tflite_frontend --use-npm
//npm start --port 11000
//"type": "module", in package.json

import React, { useState } from "react";
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { ThreeDots  } from 'react-loader-spinner'
import './styles/App.css';
import App from "./App";
import DoctorMenu from "./DoctorMenu";
import PatientMenu from "./PatientMenu";

function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [user_id, setUserId] = useState("");

  const errors = {
    invalid_login: "Invalid login"
  };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();
    setIsLoading(true);

    var { uname, pass } = document.forms[0];

    const encoded_pwd = btoa(pass.value)

    const requestOptions = {
      username: uname.value, 
      password: encoded_pwd
    };

    const response = await axios.post('http://localhost:10000/login', requestOptions);
    const userData = response.data
    setIsLoading(false);

    if (userData) {
      if (userData.user_id === null) {
        setErrorMessages({ name: "invalid_login_label", message: errors.invalid_login });
      } else {
        const user_role = userData.user_role
        const tmp_user_id = userData.user_id
        setUserId(tmp_user_id)
        setIsSubmitted(true);
        if (user_role === 'Doctor')
        {
          setIsDoctor(true);
        }
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
    <div className="login-form">
      <div className="form">
        <h2 className="title">Sign In</h2>
        <hr/>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Username </label>
            <Form.Control type="text" name="uname" required />
          </div>
          <div className="input-container">
            <label>Password </label>
            <Form.Control type="password" name="pass" required />
            {renderErrorMessage("invalid_login_label")}
          </div>
          <div className="button-container">
              <Button type="submit"variant="success" disabled={isLoading}>Sign In</Button>
          </div>
          <div className="button-container">
              <Button type="button" style={{margin:5}} variant="primary" onClick={() => setIsBack(true)}>Back</Button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
      <div>
        {isLoading ? <ThreeDots/> : (isSubmitted ? (isDoctor ? <DoctorMenu user_id={user_id}/> : <PatientMenu user_id={user_id}/>) : (isBack ? <App/> : renderForm))}
      </div>
  );
}

export default Login;
