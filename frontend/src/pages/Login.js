import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

import api from '../services/forum-api';

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  const login = () => {
    api.post("/auth/login", {
      username,
      password,
    }).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      }
      else {
        localStorage.setItem("accessToken", res.data);
        setAuthState(true);
        history.push("/");
      }
    });
  };

  return (
    <div className="defaultContainer" id="login">
      <h2>Login</h2>
      <input 
        type="text"
        id="defaultInput"
        placeholder="Username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input 
        type="password"
        id="defaultInput"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <button
        id="bluebutton"
        onClick={login}
      >
        Login
      </button>
    </div>
  )
}

export default Login
