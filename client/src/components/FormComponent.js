import React, { useState } from "react";
import NavBarComponent from "./NavBarComponent";
import axios from "axios";
import Swal from 'sweetalert2'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getUser,getToken } from "../services/authorize";


function FormComponent() {
  const [state, setState] = useState({
    title: "",
    author: getUser()
  });
  const { title, author } = state;
  const [content,setContent] =useState('')

  //กำหนดค่าให้กับ State
  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };
  const submitContent = (e) =>{
    setContent(e)
  }

  const submitForm = (e) => {
    e.preventDefault();
    console.log("API URL =", process.env.REACT_APP_API);
    axios
      .post(`${process.env.REACT_APP_API}/create`,
      {title, content, author},
      {
        headers: {
            authorization: `Bearer ${getToken()}` //แนบ Token เข้าไป
        }
      }
      )
      .then((response) => {
        Swal.fire('แจ้งเตือน','บันทึกข้อมูลเรียบร้อย','success')
        setState({...state,title:"",author:""})
        setContent('')
      })
      .catch((err) => {
        Swal.fire('แจ้งเตือน',err.response.data.error,'error')
      });
  };

  return (
    <div className="container p-5">
      <NavBarComponent />
      <h1>เขียนบทความ</h1>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>ชื่อบทความ</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={inputValue("title")}
          ></input>
        </div>
        <div className="form-group">
          <label>รายละเอียด</label>
          <ReactQuill 
              value={content}
              onChange={submitContent}
              theme = "snow"
              className="pb-5 mb-3"
              placeholder="เขียนรายละเอียดบทความของคุณ"
              style={{border: '1px solid #666'}}
          />
        </div>
        <div className="form-group">
          <label>ชื่อผู้แต่ง</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={inputValue("author")}
          ></input>
        </div>
        <br />
        <input type="submit" value="บันทึก" className="btn btn-primary"></input>
      </form>
    </div>
  );
}

export default FormComponent;
