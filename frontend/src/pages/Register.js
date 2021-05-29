import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import api from '../services/forum-api';


function Register() {

  const initialValues = {
    username: "",
    password: "",
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required().max(255),
    password: Yup.string().required().min(6).max(55),
  });

  const onSubmit = (data) => {
    api.post("/auth", data).then(() => {
      console.log(data);
    });
  };

  return (
    <div className="defaultContainer" id="register">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">

          <label>Username</label>
          <ErrorMessage name="username" component="span" />
          <Field 
            id="defaultInput" 
            name="username"
            placeholder="Ex. Taguma..."
          />

          <label>Password</label>
          <ErrorMessage name="password" component="span" />
          <Field 
            id="defaultInput" 
            name="password"
            type="password"
            placeholder="Your Password..."
          />

          <button type="submit" id="bluebutton">Register</button>

        </Form>
      </Formik>
    </div>
  )
}

export default Register
