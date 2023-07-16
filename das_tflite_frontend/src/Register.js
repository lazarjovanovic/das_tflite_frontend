//npx create-react-app das_tflite_frontend --use-npm
//npm start --port 11000
//"type": "module", in package.json

import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

import logo from './logo.svg';
import './styles/App.css';

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner">
      </div>
    </div>
  );
}

function Register() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = useState("Male")

  const errors = {
    invalid_registration: "Invalid registration"
  };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();
    setIsLoading(true);

    var { rname, rsurname, rusername, rpassword } = document.forms[0];

    const encoded_pwd = btoa(rpassword.value)

    const requestOptions = {
        name: rname.value,
        surname: rsurname.value,
        username: rusername.value,
        password: encoded_pwd
    };

    const response = await axios.post('http://localhost:10000/register', requestOptions);
    const userData = response.data
    setIsLoading(false);

    if (userData) {
      if (userData.user_id === null) {
        setErrorMessages({ name: "invalid_register_label", message: errors.invalid_registration });
      } else {
        const user_role = userData.user_role
        setIsSubmitted(true);
        // TODO redirect to another page
      }
    } else {
      setErrorMessages({ name: "invalid_register_label", message: errors.invalid_registration });
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
          <label>Name </label>
          <input type="text" name="name" required />
        </div>
        <div className="input-container">
          <label>Surname </label>
          <input type="text" name="surname" required />
        </div>
        <div className="input-container">
          <label>Surname </label>
          <input type="text" name="username" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("invalid_register_label")}
        </div>

        <div class="radio-buttons">
            <input 
                type="radio" 
                name="optradio"/><label>Male</label>
        
            <input 
                type="radio" 
                name="optradio"/><label>Female</label>
        </div>
        <div className="button-container">
          <input type="submit" disabled={isLoading}/>
        </div>
      </form>
    </div>
  );

  return (
    <div className="register">
        <div className="title">Log In</div>
        {isLoading ? <LoadingSpinner /> : (isSubmitted ? <div>User is successfully registered</div> : renderForm)}
    </div>
  );
}

export default Register;
