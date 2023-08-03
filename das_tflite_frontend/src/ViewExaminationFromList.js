import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { ThreeDots  } from 'react-loader-spinner'
import 'react-notifications/lib/notifications.css';
import ViewAllExaminations from "./ViewAllExaminations";

function ViewExaminationFromList(user){
    const [isBack, setIsBack] = useState(false);
    const user_id = user.user_id;
    const examination = user.examination;
    const [image, setImage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchData() {
        setIsLoading(true);
        const axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Authorization": user_id,
          },
          responseType: 'blob'
        };
  
        const url_string = 'http://localhost:10000/get_examination_image/' + examination.image_name
  
        const response = await axios.get(url_string, axiosConfig);
        const userData = response.data;
        var imageUrl = URL.createObjectURL(userData);

        setImage(imageUrl);
        setIsLoading(false);
      }
  
      useEffect(() => {
        fetchData();
      }, []);

    const renderForm = (
        <div className="login-form" style={{width:"-webkit-fill-available"}}>
          <div className="form">
            <h2 className="title">Performed examination</h2>
            <hr/>
            <form>
              <div className="input-container" style={{flexDirection:"row", "justify-content": "center"}}>
                  <img src={image} style={{width:"60%", height: "60%"}}/>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"left"}}>Disease </label>
                  <label style={{margin:"auto"}}>{examination.image_class} </label>
              </div>
              <div className="input-container" style={{flexDirection:"row"}}>
                  <label style={{margin:"left"}}>Processed at </label>
                  <label style={{margin:"auto"}}>{examination.processed_at} </label>
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
          {isBack ? <ViewAllExaminations user_id={user_id}/> : (isLoading ? <ThreeDots/> : renderForm)}
        </div>
    );
}

export default ViewExaminationFromList;
