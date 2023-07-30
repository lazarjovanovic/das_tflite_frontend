import React, { useState, useEffect } from "react";
import DoctorMenu from "./DoctorMenu";
import UpdateTherapy from "./UpdateTherapy";
import axios from 'axios';
import Button from "react-bootstrap/Button";
import { ThreeDots  } from 'react-loader-spinner'
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import Icon from "react-crud-icons";
import 'react-data-table-component-extensions/dist/index.css';

function ViewAllTherapies(user){
    const [isAddNew, setIsAddNew] = useState(false);
    const [isViewAll, setIsViewAll] = useState(false);
    const [isBack, setIsBack] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isReload, setIsReload] = useState(false);
    const [data, setUserTherapies] = useState([]);
    const [updateData, setUpdateData] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);
    const user_id = user.user_id;

    const columns = [
      {
        name: 'ID',
        selector: 'id',
        sortable: true,
        width: "5%"
      },
      {
        name: 'Disease',
        selector: 'disease',
        sortable: true,
        width: "8%",
        wrap: true
      },
      {
        name: 'Location',
        selector: 'location',
        sortable: true,
        width: "8%",
        wrap: true
      },
      {
        name: 'Length of existence in weeks',
        selector: 'length_of_existence_weeks',
        sortable: true,
        width: "7%",
        wrap: true
      },
      {
        name: 'Width dimension in mm',
        selector: 'dimension_width_mm',
        sortable: true,
      },
      {
        name: 'Height dimension in mm',
        selector: 'dimension_height_mm',
        sortable: true,
      },
      {
        name: 'Patient age',
        selector: 'patient_age',
        sortable: true,
      },
      {
        name: 'Gender',
        selector: 'gender',
        sortable: true,
      },
      {
        name: 'Number of instances',
        selector: 'number_of_instances',
        sortable: true,
      },
      {
        cell:(row) => <Icon name="delete" tooltip="Delete" theme="light" size="medium" onClick={() => handleClickDelete(row.id)} />,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
      {
        cell:(row) => <Icon name="edit" tooltip="Edit" theme="light" size="medium" onClick={() => handleClickUpdate(row)} />,
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

      const url_string = 'http://localhost:10000/get_therapies_by_doctor_id/' + user_id

      const response = await axios.get(url_string, axiosConfig);
      const userData = response.data;
      setUserTherapies(userData);

      setIsLoading(false);
    }

    useEffect(() => {
      fetchData();
    }, []);

    const handleClickDelete = async (id) => {
      setIsLoading(true);
      console.log(`Deleting therapy with id ${id}`);

      const axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Authorization": user_id,
        }
      };
    
      const url_string = 'http://localhost:10000/delete_therapy_by_id/' + id
    
      const response = await axios.delete(url_string, axiosConfig);
      fetchData();
      setIsLoading(false);
      setIsReload(true);
    };
    const handleClickUpdate = (row) => {
      console.log(`Updating therapy with id ${row.id}`);
      
      setUpdateData(row);
      setIsUpdate(true);
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
          {isBack ? <DoctorMenu user_id={user_id}/> : (isReload ? <ViewAllTherapies user_id={user_id}/> : (isUpdate ? <UpdateTherapy user_id={user_id} update_data={updateData}/>: (isLoading ? ThreeDots : renderForm)))}
      </div>
    );
}

export default ViewAllTherapies;
