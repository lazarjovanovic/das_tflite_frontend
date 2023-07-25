import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import AddNewTherapy from "./AddNewTherapy";
import ViewAllTherapies from "./ViewAllTherapies";
import App from "./App";

function DoctorMenu(user){
    const [isAddNew, setIsAddNew] = useState(false);
    const [isViewAll, setIsViewAll] = useState(false);
    const [isBack, setIsBack] = useState(false);
    const [doctorId, setDoctorId] = useState(user.user_id);

    const renderForm = (
        <div className="login-form">
          <div className="form">
            <h2 className="title">Doctor menu</h2>
            <hr/>
            <form>
                <div className="button-container">
                  <Button type="button" style={{margin:5}} variant="primary" onClick={() => setIsAddNew(true)}>Add new therapy</Button>
              </div>
              <div className="button-container">
                  <Button type="button" style={{margin:5}} variant="primary" onClick={() => setIsViewAll(true)}>View all therapies</Button>
              </div>
              <div className="button-container">
                  <Button type="button" style={{margin:5}} variant="primary" onClick={() => setIsBack(true)}>Log Out</Button>
              </div>
            </form>
          </div>
        </div>
      );


    return (
        <div>
          {isAddNew ? <AddNewTherapy user_id={doctorId}/> : (isViewAll ? <ViewAllTherapies/> : (isBack ? <App/>: renderForm))}
        </div>
    );
}

export default DoctorMenu;
