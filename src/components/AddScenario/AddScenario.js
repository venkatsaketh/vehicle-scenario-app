import './AddScenario.css';
import { useRef } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';

function AddScenario() {

    const formRef = useRef();

    const ScenarioSchema = Yup.object().shape({
        scenarioName: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        time: Yup.number()
          .required('Required'),
      });

      const addScen = () => {
        if(Object.keys(formRef.current.errors).length===0 && Object.keys(formRef.current.touched).length!==0) {
        //   console.log(formRef.current.values );
          axios.post('http://localhost:4000/scenarios', formRef.current.values)
          .then(formRef.current?.resetForm())
        }
      }
     
      const reset = () => {
        formRef.current?.resetForm();
      }

    return (
    <div className="addscenario">
        <h1>Add Scenario</h1>

        <div className='form'>
        <Formik
        innerRef={formRef}
       initialValues={{
        scenarioName: '',
        time: '',
       }}
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
            <button onClick={addScen} style={{backgroundColor:'#198754'}}>Add</button>
            <button onClick={reset} style={{backgroundColor:'#fd7e14'}}>Reset</button>
            <button style={{backgroundColor:'#0d6efd'}}>Go Back</button>
        </div>
    </div>
    );
}

export default AddScenario;