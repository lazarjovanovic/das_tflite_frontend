//npx create-react-app das_tflite_frontend --use-npm
//npm start --port 11000
//"type": "module", in package.json

import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [role, setRole] = useState("Patient")
  const [startDate, setStartDate] = useState(new Date());

  const errors = {
    invalid_registration: "Invalid registration"
  };

  const onOptionChangeGender = e => {
    setGender(e.target.value)
  }

  const onOptionChangeRole = e => {
    setRole(e.target.value)
  }

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();
    setIsLoading(true);

    var { rname, rsurname, rusername, rpassword} = document.forms[0];

    const encoded_pwd = btoa(rpassword.value)

    const formattedDate = startDate.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).split('/').reverse().join('-');

    const requestOptions = {
        name: rname.value,
        surname: rsurname.value,
        username: rusername.value,
        password: encoded_pwd,
        gender: gender,
        dob: startDate,
        role: role
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
          <input type="text" name="rname" required />
        </div>
        <div className="input-container">
          <label>Surname </label>
          <input type="text" name="rsurname" required />
        </div>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="rusername" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="rpassword" required />
          {renderErrorMessage("invalid_register_label")}
        </div>

        <div class="radio-buttons">
            <input 
                type="radio" 
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={onOptionChangeGender}
                defaultChecked/><label>Male</label>
        
            <input 
                type="radio" 
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={onOptionChangeGender}/><label>Female</label>
        </div>
        <div className="input-container">
        <label>Date of Birth</label>
        </div>
        <div className="input-container">
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
        <div class="radio-buttons">
            <input 
                type="radio" 
                name="optradiorole"
                value="Patient"
                checked={role === "Patient"}
                onChange={onOptionChangeRole}
                defaultChecked/><label>Patient</label>
        
            <input 
                type="radio" 
                name="optradiorole"
                value="Doctor"
                checked={role === "Doctor"}
                onChange={onOptionChangeRole}/><label>Doctor</label>
        </div>
        <div></div>
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
