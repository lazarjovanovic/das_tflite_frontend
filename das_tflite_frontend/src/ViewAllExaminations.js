import React, { useState, useEffect } from "react";
import DoctorMenu from "./DoctorMenu";
import JSZip from 'jszip';
import UpdateTherapy from "./UpdateTherapy";
import axios from 'axios';
import Button from "react-bootstrap/Button";
import { ThreeDots  } from 'react-loader-spinner'
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import Icon from "react-crud-icons";
import 'react-data-table-component-extensions/dist/index.css';

function ViewAllExaminations(user){
    const [isLoading, setIsLoading] = useState(true);
    const [isView, setIsView] = useState(false);
    const [isViewData, setViewData] = useState([]);
    const [isBack, setIsBack] = useState(false);
    const [data, setUserTherapies] = useState([]);
    const user_id = user.user_id;

    const columns = [
      {
        name: 'ID',
        selector: 'id',
        sortable: true,
        width: "15%"
      },
      {
        name: 'Image class',
        selector: 'image_class',
        sortable: true,
        wrap: true
      },
      {
        name: 'Image name',
        selector: 'image_name',
        sortable: true,
        wrap: true
      },
      {
        name: 'Processed at',
        selector: 'processed_at',
        sortable: true,
        wrap: true
      },
      {
        cell:(row) => <Icon name="show" tooltip="Show" theme="light" size="medium" onClick={() => handleClickViewExamination(row)} />,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      }
    ];

    async function fetchData() {
      setIsLoading(true);
      const axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Authorization": user_id,
        }
      };

      const url_string = 'http://localhost:10000/get_examinations_by_patient_id/' + user_id

      const response = await axios.get(url_string, axiosConfig);
      const userData = response.data;

      setUserTherapies(userData);
      setIsLoading(false);
    }

    useEffect(() => {
      fetchData();
    }, []);

    const handleClickViewExamination = (row) => {
      console.log(`Presenting examination id ${row.id}`);
      
      setViewData(row);
      setIsView(true);
    };

    const tableData = {
      columns,
      data
    };

    const renderForm = (
      <div>
        <DataTableExtensions {...tableData} export={false} print={false}>
          <DataTable
            columns={columns}
            data={data}
            //noHeader
            subHeaderWrap="true"
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
            className="crfypz"
          />
        </DataTableExtensions>
        <div className="button-container">
          <Button type="button" style={{margin:5}} variant="primary" onClick={() => setIsBack(true)}>Back</Button>
        </div>
      </div>
    );


    return (
      <div className="container" style={{maxWidth:"1520px"}}>
          {isBack ? <DoctorMenu user_id={user_id}/> : (isView ? <ViewAllExaminations user_id={user_id}/> : (isLoading ? ThreeDots : renderForm))}
      </div>
    );
}

export default ViewAllExaminations;
