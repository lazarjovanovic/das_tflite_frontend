import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Textarea from '@mui/joy/Textarea';
import ViewAllTherapies from "./ViewAllTherapies";

function UpdateTherapy(user){
    const [errorMessages, setErrorMessages] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isBack, setIsBack] = useState(false);
    const [disease, setDisease] = useState("Psoriasis");
    const [location, setLocation] = useState("Head");
    const [loe, setLOE] = useState("");
    const [age, setAge] = useState("");
    const [instancesNumber, setInstancesNumber] = useState("");
    const [gender, setGender] = useState("");
    const user_id = user.user_id;
    const therapy = user.update_data;

    function setDefaultValues()
    {
        setLOE(therapy.length_of_existence_weeks);
        setAge(therapy.patient_age);
        setInstancesNumber(therapy.number_of_instances);
        setGender(therapy.gender);
    }

    useEffect(() => {
        setDefaultValues();
    }, []);

    const createNotification = (type) => {
      if (type ==='success')
      {
        NotificationManager.success('Successful addition', 'Therapy update successful', 3000);
      }
      else
      {
        NotificationManager.error('Failed addition', 'Therapy update failed', 3000);
      }
    };

    const errors = {
        unable_to_update_therapy: "Unable to update therapy"
    };

    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

    const onOptionChangeDisease = e => {
        setDisease(e.target.value)
      };

    const onOptionChangeLocation = e => {
        setLocation(e.target.value)
      };

    const onOptionChangeLOE = e => {
        setLOE(e.target.value)
      };

    const onOptionChangeAge = e => {
        setAge(e.target.value)
      };

    const onOptionChangeInstancesNo = e => {
        setInstancesNumber(e.target.value)
      };

    const onOptionChangeGender = e => {
        setGender(e.target.value)
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setIsProcessing(true);
    
        var {label_width, label_height, label_description} = document.forms[0];

        const requestOptions = {
            id: therapy.id,
            disease: therapy.disease,
            location: therapy.location,
            length_of_existence_weeks_from: loe.includes('-') ? parseInt(loe.split('-')[0]) : parseInt(loe.split('+')[0]),
            length_of_existence_weeks_to: loe.includes('-') ? parseInt(loe.split('-')[1]) : 200,
            dimension_width_mm: parseInt(label_width.value),
            dimension_height_mm: parseInt(label_height.value),
            patient_age_from: age.includes('-') ? parseInt(age.split('-')[0]) : parseInt(age.split('+')[0]),
            patient_age_to: age.includes('-') ? parseInt(age.split('-')[1]) : 200,
            gender: gender,
            number_of_instances_from: instancesNumber.includes('-') ? parseInt(instancesNumber.split('-')[0]) : parseInt(instancesNumber.split('+')[0]),
            number_of_instances_to: instancesNumber.includes('-') ? parseInt(instancesNumber.split('-')[1]) : 200,
            description: label_description.value,
            doctor_id: user_id
        };

        const axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Authorization": user_id,
          }
        };
        const response = await axios.put('http://localhost:10000/update_therapy', requestOptions, axiosConfig);
        const userData = response.data
        setIsLoading(false);
          if (userData) {
            if (userData.status_flag === true) {
              createNotification("success");
              //present div and return
            } else {
              createNotification("error");
              setErrorMessages({ name: "unable_to_update_therapy_label", message: errors.unable_to_update_therapy });
            }
          } else {
            createNotification("error");
            setErrorMessages({ name: "unable_to_update_therapy_label", message: errors.unable_to_update_therapy });
          }
    };

    const renderForm = (
        <div className="login-form" style={{width:"-webkit-fill-available"}}>
          <div className="form">
            <h2 className="title">Update therapy</h2>
            <hr/>
            <form onSubmit={handleSubmit}>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"left"}}>Disease </label>
                  <label style={{margin:"auto"}}>{therapy.disease} </label>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"left"}}>Location </label>
                  <label style={{margin:"auto"}}>{therapy.location} </label>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"auto"}}>Length of existence in weeks </label>
                  <Form.Select aria-label="Default select example" value={loe} onChange={onOptionChangeLOE}>
                    <option value="0-2">0-2</option>
                    <option value="2-4">2-4</option>
                    <option value="4-8">4-8</option>
                    <option value="8+">8+</option>
                  </Form.Select>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                <label>Width (mm) </label>
                <Form.Control type="number" pattern="[0-9]*" name="label_width" defaultValue={therapy.dimension_width_mm} required />
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                <label>Height (mm) </label>
                <Form.Control type="number" pattern="[0-9]*" name="label_height" defaultValue={therapy.dimension_height_mm} required />
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"auto"}}>Patient age </label>
                  <Form.Select aria-label="Default select example" value={age} onChange={onOptionChangeAge}>
                    <option value="0-20">0-20</option>
                    <option value="20-40">20-40</option>
                    <option value="40-60">40-60</option>
                    <option value="60-80">60-80</option>
                    <option value="80+">80+</option>
                  </Form.Select>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"auto"}}>Number of instances </label>
                  <Form.Select aria-label="Default select example" value={instancesNumber} onChange={onOptionChangeInstancesNo}>
                    <option value="0-5">0-5</option>
                    <option value="5-10">5-10</option>
                    <option value="10-20">10-20</option>
                    <option value="20+">20+</option>
                  </Form.Select>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                <Form.Check
                inline
                type="radio" 
                name="optradiogender"
                value="Male"
                label="Male"
                checked={gender === "Male"}
                onChange={onOptionChangeGender}
                />    
                <Form.Check
                inline
                type="radio" 
                name="optradiogender"
                label="Female"
                value="Female"
                checked={gender === "Female"}
                onChange={onOptionChangeGender}
                />
              </div>
              
              <div className="input-container" style={{flexDirection:"row"}}>
                <label style={{marginTop:"30px"}}>Description </label>
                <Textarea minRows={3} maxRows={3} style={{width:"260px"}} color="neutral" size="lg" name="label_description" defaultValue={therapy.description} required />
              </div>

              <div className="button-container">
                  <Button type="submit" style={{margin:5}} variant="success" disabled={isProcessing}>Update therapy</Button>
                  {renderErrorMessage("unable_to_update_therapy_label")}
              </div>
              <div className="button-container">
                  <Button type="button" style={{margin:5}} variant="primary" onClick={() => setIsBack(true)}>Back</Button>
              </div>
            </form>
            <NotificationContainer/>
          </div>
        </div>
      );


    return (
        <div>
          {isBack ? <ViewAllTherapies user_id={user_id}/> : renderForm}
        </div>
    );
}

export default UpdateTherapy;
