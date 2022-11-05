import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
import NavBarComponent from "./NavBarComponent";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getToken } from "../services/authorize";

function EditComponent() {
    const params = useParams();
    const [content,setContent] =useState('')
    const [state, setState] = useState({
    title: "",
    author: "",
    slug:""
  });
  const { title,author,slug } = state;

  const submitContent = (e) =>{
    setContent(e)
  }

  //ดึงข้อมูลที่ต้องกาาแก้ไข
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API}/blog/${params.slug}`)
    .then(response=>{
        const {title,content,author,slug} = response.data
        setState({...state,title,author,slug})
        setContent(content)
    })
    .catch(err=> alert(err))
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

const showUpdateForm = () =>( // ใช้ () แทน {} เพื่อให้ใช้ HTML
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
        <input type="submit" value="อัพเดท" className="btn btn-primary"></input>
    </form>
)

  //กำหนดค่าให้กับ State
  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log("API URL =", process.env.REACT_APP_API);
    axios
      .put(`${process.env.REACT_APP_API}/blog/${slug}`, { title, content, author },
      {
        headers: {
            authorization: `Bearer ${getToken()}` //แนบ Token เข้าไป
        }
      }
      )
      .then((response) => {
        Swal.fire('แจ้งเตือน','อัพเดทข้อมูลเรียบร้อย','success')
        const {title,content,author,slug} = response.data
        setState({...state,title,author,slug})
        setContent(content)
      })
      .catch((err) => {
        alert(err)
      });
  };

  return (
    <div className="container p-5">
      <NavBarComponent />
      <h1>แก้ไขบทความ</h1>
      {showUpdateForm()}
    </div>
  );
}

export default EditComponent;
