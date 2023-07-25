import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import DoctorMenu from "./DoctorMenu";
import Form from 'react-bootstrap/Form';

function AddNewTherapy(user){
    const [isLoading, setIsLoading] = useState(false);
    const [isBack, setIsBack] = useState(false);
    const [disease, setDisease] = useState("Psoriasis");
    const [location, setLocation] = useState("Head");
    const [loe, setLOE] = useState("0-2");
    const [age, setAge] = useState("0-20");
    const [instancesNumber, setInstancesNumber] = useState("0-5");
    const [gender, setGender] = useState("Male");
    const doctor_id = user.user_id;

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
    

    var {width, height} = document.forms[0];

    const requestOptions = {
        disease: disease,
        location: location,
        length_of_existence_weeks_from: parseInt(loe.split('-')[0]),
        length_of_existence_weeks_to: parseInt(loe.split('-')[1]),
        dimension_width_mm: parseInt(width.value),
        dimension_height_mm: parseInt(height.value),
        patient_age_from: parseInt(age.split('-')[0]),
        patient_age_to: parseInt(age.split('-')[1]),
        gender: gender,
        number_of_instances_from: parseInt(instancesNumber.split('-')[0]),
        number_of_instances_to: parseInt(instancesNumber.split('-')[1]),
        doctor_id: doctor_id
    };

    // TODO: IMPLEMENT POST REQUEST AND RETURN TO DOCTOR MENU
    const x = 5;
    };

    const renderForm = (
        <div className="login-form" style={{width:"-webkit-fill-available"}}>
          <div className="form">
            <h2 className="title">New therapy</h2>
            <hr/>
            <form onSubmit={handleSubmit}>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"auto"}}>Disease </label>
                  <Form.Select aria-label="Default select example" onChange={onOptionChangeDisease}>
                    <option value="Psoriasis">Psoriasis</option>
                    <option value="Basal cell cancer">Basal cell cancer</option>
                  </Form.Select>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"auto"}}>Location </label>
                  <Form.Select aria-label="Default select example">
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
                  <label style={{margin:"auto"}}>Length of existence in weeks </label>
                  <Form.Select aria-label="Default select example">
                    <option value="0-2">0-2</option>
                    <option value="2-4">2-4</option>
                    <option value="4-8">4-8</option>
                    <option value="8+">8+</option>
                  </Form.Select>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                <label>Width (mm) </label>
                <Form.Control type="number" pattern="[0-9]*" name="width" required />
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                <label>Height (mm) </label>
                <Form.Control type="number" pattern="[0-9]*" name="height" required />
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"auto"}}>Patient age </label>
                  <Form.Select aria-label="Default select example">
                    <option value="0-20">0-20</option>
                    <option value="20-40">20-40</option>
                    <option value="40-60">40-60</option>
                    <option value="60-80">60-80</option>
                    <option value="80+">80+</option>
                  </Form.Select>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"auto"}}>Number of instances </label>
                  <Form.Select aria-label="Default select example">
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
                defaultChecked
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
              <div className="button-container">
                  <Button type="submit" style={{margin:5}} variant="success" disabled={isLoading}>Add new therapy</Button>
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
          {isBack ? <DoctorMenu/> : renderForm}
        </div>
    );
}

export default AddNewTherapy;
