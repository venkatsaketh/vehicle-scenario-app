import { useEffect, useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';


function EditScenario(props) {
  const ID = sessionStorage.getItem("Id");
  const formRef = useRef();
  const [data,setData] = useState({
    scenarioName: '',
    time: '',
   }) 
  const ScenarioSchema = Yup.object().shape({
      scenarioName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      time: Yup.number()
        .required('Required'),
    });

    useEffect(()=>{
           axios.get('http://localhost:4000/scenarios'+`/${ID}`)
           .then(res=>res.data)
           .then(res=> {
            delete res.id;
            setData(res);
           })
    },[])

    const updateScen = () => {
        if(Object.keys(formRef.current.errors).length===0 && Object.keys(formRef.current.touched).length!==0) {
          axios.put('http://localhost:4000/scenarios'+`/${ID}`, formRef.current.values)
          .then(alert("Data Updated"))
        }
      }
     
      const reset = () => {
        formRef.current?.resetForm();
      }


    return (
        <div className="addscenario">
        <h1>Edit Scenario</h1>

        <div className='form'>
        <Formik
        innerRef={formRef}
       initialValues={{
        scenarioName: data.scenarioName,
        time: data.time,
       }}
       enableReinitialize
       validationSchema={ScenarioSchema}
       onSubmit={values => {
         // same shape as initial values
         console.log(values);
       }}
     >
       {({ errors, touched }) => (
         <Form>
            <div className='inpt'>
            <label>Scenario Name</label>
           <Field name="scenarioName" />
           {errors.scenarioName && touched.scenarioName ? (
             <div className='err'>{errors.scenarioName}</div>
           ) : null}
           </div>
           <div className='inpt'>
           <label>Scenario Time (seconds)</label>
           <Field name="time" type='number'/>
           {errors.time && touched.time ? (
             <div className='err'>{errors.time}</div>
           ) : null}
           </div>    
         </Form>
       )}
     </Formik>
     </div>

     
        <div className='btnGrp'>
        <button onClick={updateScen} style={{backgroundColor:'#198754'}}>update</button>
        {/* <button onClick={reset} style={{backgroundColor:'#fd7e14'}}>Reset</button> */}
        <button onClick={props.close} style={{backgroundColor:'#0d6efd'}}>Close</button>
    </div>
    </div>
    )
}
export default EditScenario