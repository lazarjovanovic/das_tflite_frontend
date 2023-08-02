import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import _ from 'lodash'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import PatientMenu from "./PatientMenu";

function PresentExamination(user){
    const [isBack, setIsBack] = useState(false);
    const user_id = user.user_id;
    const disease = user.results.resulting_disease;
    const therapies = user.results.therapies;
    const image = user.image[0];
    const [selectedTherapy, setSelectedTherapy] = useState(therapies[0]);

    const onOptionChangeTherapy = e => {
      setSelectedTherapy(therapies[parseInt(e.target.value) - 1]);
    };

    const renderForm = (
        <div className="login-form" style={{width:"-webkit-fill-available"}}>
          <div className="form">
            <h2 className="title">Examination terapies</h2>
            <hr/>
            <form>
              <div className="input-container" style={{flexDirection:"row", "justify-content": "center"}}>
                  <img src={URL.createObjectURL(image)} style={{width:"25%", height: "25%"}}/>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"left"}}>Disease </label>
                  <label style={{margin:"auto"}}>{disease} </label>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"auto"}}>Therapy options </label>
                  <Form.Select aria-label="Default select example" onChange={onOptionChangeTherapy}>
                    { _.range(0, therapies.length).map(value => <option key={value+1} value={value+1}>{value+1}</option>) }
                  </Form.Select>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"left"}}>Therapy id </label>
                  <label style={{margin:"auto"}}>{selectedTherapy.id} </label>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"left"}}>Location </label>
                  <label style={{margin:"auto"}}>{selectedTherapy.location} </label>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"left"}}>Dimension width in mm </label>
                  <label style={{margin:"auto"}}>{selectedTherapy.dimension_width_mm} </label>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"left"}}>Dimension height in mm </label>
                  <label style={{margin:"auto"}}>{selectedTherapy.dimension_height_mm} </label>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"left"}}>Length of existence </label>
                  <label style={{margin:"auto"}}>{selectedTherapy.length_of_existence_weeks} </label>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"left"}}>Number of instances </label>
                  <label style={{margin:"auto"}}>{selectedTherapy.number_of_instances} </label>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"left"}}>Patient age </label>
                  <label style={{margin:"auto"}}>{selectedTherapy.patient_age} </label>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"left"}}>Doctor id </label>
                  <label style={{margin:"auto"}}>{selectedTherapy.doctor_id} </label>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"left"}}>Description </label>
                  <label style={{margin:"auto"}}>{selectedTherapy.description} </label>
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
          {isBack ? <PatientMenu user_id={user_id}/> : renderForm}
        </div>
    );
}

export default PresentExamination;
