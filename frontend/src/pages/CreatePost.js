import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";

import api from '../services/forum-api';

function CreatePost() {
  
  let history = useHistory();

  const initialValues = {
    title: "",
    postText: "",
    username: ""
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required().max(255),
    postText: Yup.string().required().max(1000),
    username: Yup.string().required().max(255)
  });

  const onSubmit = (data) => {
    api.post("/posts", data).then((res) => {
      history.push("/");
    });
  };

  return (
    <div className="createPost">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title</label>
          <ErrorMessage name="title" component="span" />
          <Field 
            id="inputCreatePost" 
            name="title"
            placeholder="Add Title..."
          />
          
          <ErrorMessage name="postText" component="span" />
          <Field as="textarea"
            id="inputPostBody" 
            name="postText"
            placeholder=""
          >
          </Field>

          <label>Username</label>
          <ErrorMessage name="username" component="span" />
          <Field 
            id="inputCreatePost" 
            name="username"
            placeholder="Ex. Taguma..."
          />

          <button type="submit" id="bluebutton">Create Post</button>

        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost
