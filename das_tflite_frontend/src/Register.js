//npx create-react-app das_tflite_frontend --use-npm
//npm start --port 11000
//"type": "module", in package.json

import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { ThreeDots  } from 'react-loader-spinner'
import DoctorMenu from "./DoctorMenu";
import PatientMenu from "./PatientMenu";

import logo from './logo.svg';
import './styles/App.css';
import App from "./App";

function Register() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = useState("Male")
  const [role, setRole] = useState("Patient")
  const [startDate, setStartDate] = useState(new Date());
  const [isBack, setIsBack] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [user_id, setUserId] = useState("");

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
        const tmp_user_id = userData.user_id
        setUserId(tmp_user_id)
        setIsSubmitted(true);
        if (user_role === 'Doctor')
        {
          setIsDoctor(true);
        }
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
    <div className="login-form">
      <div className="form">
        <div className="title">Register</div>
        <hr/>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Name </label>
            <Form.Control type="text" name="rname" required />
          </div>
          <div className="input-container">
            <label>Surname </label>
            <Form.Control type="text" name="rsurname" required />
          </div>
          <div className="input-container">
            <label>Username </label>
            <Form.Control type="text" name="rusername" required />
          </div>
          <div className="input-container">
            <label>Password </label>
            <Form.Control type="password" name="rpassword" required />
            {renderErrorMessage("invalid_register_label")}
          </div>
          <div className="input-container" style={{flexDirection:"row"}}>
            <Form.Check
              inline
              type="radio"
              id="custom-switch"
              value="Male"
              label="Male"
              defaultChecked
              checked={gender === "Male"}
              onChange={onOptionChangeGender}
            />
            <Form.Check
              inline
              type="radio"
              value="Female"
              label="Female"
              id="disabled-custom-switch"
              checked={gender === "Female"}
              onChange={onOptionChangeGender}
            />
          </div>
          <div className="input-container">
          <label>Date of Birth</label>
          </div>
          <div className="input-container">
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
          <div className="input-container" style={{flexDirection:"row"}}>
            <Form.Check
              inline
              type="radio" 
              name="optradiorole"
              value="Patient"
              label="Patient"
              checked={role === "Patient"}
              onChange={onOptionChangeRole}
              defaultChecked
            />    
            <Form.Check
              inline
              type="radio" 
              name="optradiorole"
              label="Doctor"
              value="Doctor"
              checked={role === "Doctor"}
              onChange={onOptionChangeRole}
            />
          </div>
          <div></div>
          <div className="button-container">
            <Button type="submit"variant="success" disabled={isLoading}>Register</Button>
          </div>
          <div className="button-container">
            <Button type="button" style={{margin:5}} variant="primary" onClick={() => setIsBack(true)}>Back</Button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="register">
        {/* {isLoading ? <ThreeDots /> : (isSubmitted ? <div>User is successfully registered</div> : (isBack? <App/> : renderForm))} */}
        {isLoading ? <ThreeDots/> : (isSubmitted ? (isDoctor ? <DoctorMenu user_id={user_id}/> : <PatientMenu user_id={user_id}/>) : (isBack ? <App/> : renderForm))}
    </div>
  );
}

export default Register;
