import React, { useEffect, useState } from "react";
import NavBarComponent from "./NavBarComponent";
import axios from "axios";
import Swal from 'sweetalert2'
import {authenticate, getUser} from '../services/authorize'
import {useNavigate} from 'react-router-dom';

function LoginComponent() {

  const history = useNavigate();

  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const { username, password } = state;

  //กำหนดค่าให้กับ State
  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/login`, { username, password })
      .then((response) => {
        //login สำเร็จ
        authenticate(response, () => history('/create')) 
        console.log(response)
      })
      .catch((err) => {
        Swal.fire('แจ้งเตือน',err.response.data.error,'error')
      });
  };

  //ป้องกัน path('/login')หลังจากเข้าระบบ 
  useEffect(()=>{
    getUser() && history('/')
    // eslint-disable-next-line
  },[])

  return (
    <div className="container p-5">
      <NavBarComponent />
      <h1>เข้าสู่ระบบ | Admin</h1>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={inputValue("username")}
          ></input>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={inputValue("password")}
          ></input>
        </div>
        <br />
        <input
          type="submit"
          value="เข้าสู่ระบบ"
          className="btn btn-primary"
        ></input>
      </form>
    </div>
  );
}

export default LoginComponent;
