import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import AddNewTherapy from "./AddNewTherapy";
import ViewAllTherapies from "./ViewAllTherapies";
import App from "./App";
import AddNewExamination from "./AddNewExamination";

function PatientMenu(user){
  const [isPerformExamination, setIsPerformExamination] = useState(false);
  const [isViewAllExaminations, setIsViewAllExaminations] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const user_id = user.user_id;

  const renderForm = (
      <div className="login-form">
        <div className="form">
          <h2 className="title">Patient menu</h2>
          <hr/>
          <form>
              <div className="button-container">
                <Button type="button" style={{margin:5}} variant="primary" onClick={() => setIsPerformExamination(true)}>Perform examination</Button>
            </div>
            <div className="button-container">
                <Button type="button" style={{margin:5}} variant="primary" onClick={() => setIsViewAllExaminations(true)}>View all examinations</Button>
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
        {isPerformExamination ? <AddNewExamination user_id={user_id}/> : (isViewAllExaminations ? <ViewAllTherapies user_id={user_id}/> : (isBack ? <App/>: renderForm))}
      </div>
  );
}

export default PatientMenu;
