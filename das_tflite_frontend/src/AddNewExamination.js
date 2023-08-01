import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import PatientMenu from "./PatientMenu";
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { ThreeDots  } from 'react-loader-spinner'
import Textarea from '@mui/joy/Textarea';

function AddNewExamination(user){
    const [errorMessages, setErrorMessages] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isBack, setIsBack] = useState(false);
    const [location, setLocation] = useState("Head");
    const [gender, setGender] = useState("Male");
    const [image, setImage] = useState([]);
    const user_id = user.user_id;

    function onImageChange(e)
    {
        setImage([...e.target.files]);
    }

    const createNotification = (type) => {
      if (type ==='success')
      {
        NotificationManager.success('Successful examination', 'Examination successful', 3000);
      }
      else
      {
        NotificationManager.error('Failed examination', 'Examination failed', 3000);
      }
    };

    const errors = {
      unable_to_perform_examination: "Unable to perform examination"
    };

    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

    const onOptionChangeLocation = e => {
        setLocation(e.target.value)
      };

    const onOptionChangeGender = e => {
        setGender(e.target.value)
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setIsProcessing(true);
    
        var {label_loe, label_width, label_height, label_age, label_instances_number} = document.forms[0];
        var bodyFormData = new FormData();
        bodyFormData.append('image', image[0], image[0].name);
        bodyFormData.append('location', location);
        bodyFormData.append('length_of_existence_weeks', parseInt(label_loe.value));
        bodyFormData.append('dimension_width_mm', parseInt(label_width.value));
        bodyFormData.append('dimension_height_mm', parseInt(label_height.value));
        bodyFormData.append('patient_age', parseInt(label_age.value));
        bodyFormData.append('gender', gender);
        bodyFormData.append('number_of_instances', parseInt(label_instances_number.value));
        bodyFormData.append('patient_id', user_id);

        const axiosConfig = {
          headers: {
              'Content-Type': 'multipart/form-data',
              "Authorization": user_id,
          }
        };
        const response = await axios.post('http://localhost:10000/process_examination', bodyFormData, axiosConfig);
        const userData = response.data
        //TODO: FETCH RESULTS AND PRESENT THERAPIES
        setIsLoading(false);
        setIsProcessing(false);
          if (userData) {
            if (userData.status_flag === true) {
              createNotification("success");
            } else {
              createNotification("error");
              setErrorMessages({ name: "unable_to_perform_examination", message: errors.unable_to_perform_examination });
            }
          } else {
            createNotification("error");
            setErrorMessages({ name: "unable_to_perform_examination", message: errors.unable_to_perform_examination });
          }
    };

    const renderForm = (
        <div className="login-form" style={{width:"-webkit-fill-available"}}>
          <div className="form">
            <h2 className="title">New examination</h2>
            <hr/>
            <form onSubmit={handleSubmit}>
              <div className="input-container" style={{flexDirection:"row"}}>
                <label style={{margin:"auto"}}>Image to process </label>
                <input type="file" multiple accept="image/*" onChange={onImageChange} required/>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"auto"}}>Location </label>
                  <Form.Select aria-label="Default select example" onChange={onOptionChangeLocation}>
                    <option value="Head">Head</option>
                    <option value="Neck">Neck</option>
                    <option value="Arms">Arms</option>
                    <option value="Hands">Hands</option>
                    <option value="Chest">Chest</option>
                    <option value="Stomach">Stomach</option>
                    <option value="Intimate region">Intimate region</option>
                    <option value="Back">Back</option>
                    <option value="Legs">Legs</option>
                    <option value="Feet">Feet</option>
                  </Form.Select>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                <label>Length of existence in weeks </label>
                <Form.Control type="number" pattern="[0-9]*" name="label_loe" required />
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                <label>Width (mm) </label>
                <Form.Control type="number" pattern="[0-9]*" name="label_width" required />
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                <label>Height (mm) </label>
                <Form.Control type="number" pattern="[0-9]*" name="label_height" required />
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                <label>Age </label>
                <Form.Control type="number" pattern="[0-9]*" name="label_age" required />
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
                <label>Number of instances </label>
                <Form.Control type="number" pattern="[0-9]*" name="label_instances_number" required />
              </div>
              
              <div className="button-container">
                  <Button type="submit" style={{margin:5}} variant="success" disabled={isProcessing}>Perform examination</Button>
              <div>
                  {renderErrorMessage("unable_to_perform_examination")}
              </div>
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
          {/* {isBack ? <PatientMenu user_id={user_id}/> : (isProcessing ? <ThreeDots/>: renderForm)} */}
          {isBack ? <PatientMenu user_id={user_id}/> : renderForm}
        </div>
    );
}

export default AddNewExamination;
