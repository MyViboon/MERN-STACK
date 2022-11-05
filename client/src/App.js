import NavBarComponent from "./components/NavBarComponent";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { getUser, logout, getToken } from "./services/authorize";

function App() {
  const [blogs,setBlog] = useState([])
  
  const Navigation = useNavigate();

  const fetchData = ()=>{
    axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then(respone=>{
          setBlog(respone.data)
      })
      .catch(err=>alert(err));
  }
  useEffect(()=>{
    fetchData()
  },[])

  const confirmDelete = (slug) =>{
      Swal.fire({
        title: "คุณต้องการลบบทความหรือไม่ ?",
        icon: "warning",
        showCancelButton:true
      }).then((resrlt)=>{
        //กดปุ่ม OK หรือ ตกลง 
        if(resrlt.isConfirmed){
          deleteBlog(slug)
        }
      })
  }
  const deleteBlog = (slug) => {
    // ทำการส่ง Request ไปที่ api เพื่อลบข้อมูล
    axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`,
      {
        headers: {
            authorization: `Bearer ${getToken()}` //แนบ Token เข้าไป
        }
      }
    )
    .then(response=>{
        Swal.fire("Deleteed",response.data.message,"success")
        fetchData() // fetch ไฟล์จากฐานข้อมูลมาใหม่
    }).catch(err=>console.log(err))
  }

  return (
    <div className="container p-5">
      <NavBarComponent/>
      {[...blogs].reverse().map((blog, index)=>( //เรียงจากล่างขึ้นบน ใหม่ => เก่า
      // {blogs.map((blog, index)=>( //เรียงจากบนลงล่าง เก่า => ใหม่
          <div className="row" key={index} style={{borderBottom:'1px solid silver'}}>
              <div className="col pt-3 pd-2" >
                <Link to={`/blog/${blog.slug}`}>
                    <h2>{blog.title}</h2>
                </Link>
                <div className="pt-3">{blog.content.substring(0,250)}</div> 
                <p className="text-muted">
                  ผู้เขียน : {blog.author}, เผยแพร่ : {new Date(blog.createdAt).toLocaleString("th")}</p>
        
              { getUser() && ( // ให้เปิดปุ่ม แก้ไข ลบ ต่อเมื่อ login เข้าระบบ
                <div onChange={()=>logout(()=> Navigation('/'))}>
                  <Link className="btn btn-outline-success" to={`/blog/edit/${blog.slug}`}>แก้ไขบทความ</Link> &nbsp;
                  <button className="btn btn-outline-danger" onClick={()=>confirmDelete(blog.slug)}>ลบบทความ</button>
                </div>
              )}

              </div>
          </div>
      ))}
    </div>
  );
}

export default App;
