import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field,useFormikContext } from 'formik';
import * as Yup from 'yup';
import './AddVehicle.css';
import Select from 'react-select'

function AddVehicle() {
    const formRef = useRef();
    const directions = [
        { value: 'Towards', label: 'Towards' },
  { value: 'Backwads', label: 'Backwards' },
  { value: 'Upwards', label: 'Upwards' },
  { value: 'Downwards', label: 'Downwards' }
    ]
    const [scenarios,setScenarios] = useState([{ value: 'Towards', label: 'Towards' },]);

    useEffect(()=>{
        axios.get('http://localhost:4000/scenarios')
        .then(data=>data.data)
        .then(res=> {
            res=res.map(x=>x.scenarioName);
            let scens = [];
            let i=""
            for (i of res){
                scens.push({value:i,label:i})
            }
            console.log(scens);
            setScenarios(scens);
        })
    },[])

    const VehicleSchema = Yup.object().shape({
        scenariosList: Yup.string()
          .required(),
        VehicleName : Yup.string().required(),
        speed : Yup.number().required(),
        positionX : Yup.number().required().
        max(800,"Position X should not be > 800 and < 0")
        .min(0,"Position X should not be > 800 and < 0"),
        positionY : Yup.number().required().
        max(800,"Position Y should not be > 800 and < 0")
        .min(0,"Position Y should not be > 800 and < 0"),
        direction: Yup.string()
          .required(),
      });

      const addVeh = () => {
        // console.log(formRef.current.values );
        // console.log(formRef.current.errors );
        if(Object.keys(formRef.current.errors).length===0 && Object.keys(formRef.current.touched).length!==0) {
        //   console.log(formRef.current.values );
          axios.post('http://localhost:4000/vehicles', formRef.current.values)
          .then(formRef.current?.resetForm())
        }
      }
     
      const reset = () => {
        formRef.current?.resetForm();
      }
      const styles = {
        option: (provided, state) => ({
            ...provided,
          color: "rgb(145, 142, 142)",
          backgroundColor: "#313233",
        })
    }
    return (
    <div className="addscenario">
        <h1>Add Vehicle</h1>

        <div className='form'>
        <Formik
        innerRef={formRef}
       initialValues={{
        scenariosList:"",
        VehicleName:"",
        speed:"",
        positionX:"",
        positionY:"",
        direction:"",
       }}
       validationSchema={VehicleSchema}
       onSubmit={values => {
         // same shape as initial values
         console.log(values);
       }}
     >
       {({ values,errors, touched,setFieldValue }) => (
         <Form className='form-1'>
            <div className='row-1'>
            <div className='inpt'>
            <label>Scenarios List</label>
            <Select id="scenarios" type={"text"} options={scenarios}  styles={styles} onChange={option => setFieldValue("scenariosList", option.value)}/>
           {errors.scenariosList && touched.scenariosList ? (<div className='err'>{errors.scenariosList}</div>) : null}
           </div>
           <div className='inpt'>
           <label>Vehicle Name</label>
           <Field name="VehicleName"/>
           {errors.VehicleName && touched.VehicleName ? (<div className='err'>{errors.VehicleName}</div>) : null}
           </div>    
           <div className='inpt'>
           <label>Speed</label>
           <Field name="speed" type="number"/>
           {errors.speed && touched.speed ? (<div className='err'>{errors.speed}</div>) : null}
           </div>    
           </div>
           <div className='row-1 mt-20'>
            <div className='inpt'>
            <label>Position X</label>
           <Field name="positionX" type="number"/>
           {errors.positionX && touched.positionX ? (<div className='err'>{errors.positionX}</div>) : null}
           </div>
           <div className='inpt'>
           <label>Position Y</label>
           <Field name="positionY" type="number"/>
           {errors.positionY && touched.positionY ? (<div className='err'>{errors.positionY}</div>) : null}
           </div>    
           <div className='inpt'>
           <label>Direction</label>
           <Select id="direction" type={"text"} options={directions}  styles={styles} onChange={option => setFieldValue("direction", option.value)}/>
           {values.direction==""? (<div className='err'>{errors.direction}</div>) : null}
           </div>    
           </div>
         </Form>
       )}
     </Formik>


        </div>
        <div className='btnGrp'>
            <button onClick={addVeh} style={{backgroundColor:'#198754'}}>Add</button>
            <button onClick={reset} style={{backgroundColor:'#fd7e14'}}>Reset</button>
            <button style={{backgroundColor:'#0d6efd'}}>Go Back</button>
        </div>
    </div>
    );
}

export default AddVehicle;