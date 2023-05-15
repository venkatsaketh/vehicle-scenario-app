import { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewScenario.css';
import Icon from "react-crud-icons";
import EditScenario from './EditScenario';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';


import "./../../../node_modules/react-crud-icons/dist/css/react-crud-icons.css";
// node_modules\react-crud-icons\dist\css\react-crud-icons.css
function ViewScenario() {
    const scenarioURL = 'http://localhost:4000/scenarios';
    const vehicleURL = 'http://localhost:4000/vehicles';
    const navigate = useNavigate();
    const [scens,setScens] = useState([]);
    const [vehs,setVehs] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    
    function openModal(id) {
        sessionStorage.setItem("Id", id);
        setIsOpen(true);
      }
    
      function closeModal() {
        setIsOpen(false);
        getScenarios();
      }

    const getScenarios = () => {
        axios.get(scenarioURL)
        .then(res=>res.data)
        .then(res=> {
                  setScens(res);
        })
    }
    useEffect(()=>{
        getScenarios();
        axios.get(vehicleURL)
        .then(res=>res.data)
        .then(res=> {
           setVehs(res);
        })
    },[])


    const countVehicles = (name) => {
        return vehs.reduce((acc,cur)=> {
            if(cur.scenariosList===name)
              {
                acc+=1;
              }
            return acc;
        },0)
    }

    const deleteVehicle = (id) => {
        const msg = prompt("Enter 'Ok' if you want to delete");
        if(msg && msg.toLowerCase()==='ok')
        {
             axios.delete(scenarioURL+`/${id}`);
             getScenarios();
       }
    }

    return (
      <div className="view-content">
        <h2>All Scenarios</h2>

        <table>
          <tr className="Thead">
            <td>Scenario Id</td>
            <td>Scenario Name</td>
            <td>Scenario Time</td>
            <td>Number of Vehicles</td>
            <td>Add Vehicle</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
          {scens.length > 0 &&
            scens.map((x) => {
              return (
                <tr className="table-data" id={x.id}>
                  <td>{x.id}</td>
                  <td>{x.scenarioName}</td>
                  <td>{x.time}</td>
                  <td>{countVehicles(x.scenarioName)}</td>
                  <td>
                    <Icon
                      name="add"
                      theme="light"
                      size="medium"
                      onClick={() => navigate("/AddVehicle")}
                    />
                  </td>
                  <td>
                    <Icon
                      name="edit"
                      theme="light"
                      size="medium"
                      onClick={() => openModal(x.id)}
                    ></Icon>
                  </td>
                  <td>
                    <Icon
                      name="delete"
                      theme="light"
                      size="medium"
                      onClick={() => deleteVehicle(x.id)}
                    />
                  </td>
                </tr>
              );
            })}
        </table>

        <Modal isOpen={modalIsOpen} contentLabel="Example Modal" style={{
            content: {
              backgroundColor: 'black',
              color:'white'
            }}}
            >
          <div>
            <EditScenario close={closeModal} />
          </div>
        </Modal>
      </div>
    );
}

export default ViewScenario;