import Select from 'react-select'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Icon from "react-crud-icons";
import "./../../../node_modules/react-crud-icons/dist/css/react-crud-icons.css";
import Modal from 'react-modal';
import EditVehicle from './EditVehicle';

function ViewVehicle() {

    const [scenarios,setScenarios] = useState([]);
    const scenarioURL = 'http://localhost:4000/scenarios';
    const vehicleURL = 'http://localhost:4000/vehicles';
    const [vehs,setVehs] = useState([]);
    const  [selectedScen,setScen] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(id) {
        sessionStorage.setItem("VId", id);
        setIsOpen(true);
      }
    
      function closeModal() {
        setIsOpen(false);
        getVehicles(selectedScen)
      }


    useEffect(()=>{
        axios.get(scenarioURL)
        .then(data=>data.data)
        .then(res=> {
            res=res.map(x=>x.scenarioName);
            let scens = [];
            let i=""
            for (i of res){
                scens.push({value:i,label:i})
            }
            setScenarios(scens);
        })
    },[])

    const styles = {
        option: (provided, state) => ({
            ...provided,
          color: "rgb(145, 142, 142)",
          backgroundColor: "#313233",
        })
    }
   
    const getVehicles =  (scen) => {
        setScen(scen);
        axios.get(vehicleURL)
        .then(res=>res.data)
        .then(res=> {
            let data = res.filter(x=> x.scenariosList===scen)
           setVehs(data);
        })
    } 

    const deleteVehicle = (id) => {
        const msg = prompt("Enter 'Ok' if you want to delete");
        if(msg && msg.toLowerCase()==='ok')
        {
             axios.delete(vehicleURL+`/${id}`)
             .then(()=> getVehicles(selectedScen))
             
       }
    }

    return (
      <div>
        <div className="Scenario-list">
          <label>Scenario</label>
          <Select
            id="scenarios"
            type={"text"}
            options={scenarios}
            styles={styles}
            onChange={(option) => getVehicles(option.value)}
          />
        </div>
        <table>
          <tr className="Thead">
            <td>Vehicle Id</td>
            <td>Vehicle Name</td>
            <td>Position X</td>
            <td>Position Y</td>
            <td>Speed</td>
            <td>Direction</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
          {vehs.length > 0 &&
            vehs.map((x) => {
              return (
                <tr className="table-data" id={x.id}>
                  <td>{x.id}</td>
                  <td>{x.VehicleName}</td>
                  <td>{x.positionX}</td>
                  <td>{x.positionY}</td>
                  <td>{x.speed}</td>
                  <td>{x.direction}</td>
                  <td>
                    <Icon name="edit" theme="light" size="medium" onClick={() => openModal(x.id)}></Icon>
                  </td>
                  <td>
                    <Icon name="delete" theme="light" size="medium" onClick={() => deleteVehicle(x.id)}/>
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
            <EditVehicle close={closeModal} />
          </div>
        </Modal>

      </div>
    );
}

export default ViewVehicle;