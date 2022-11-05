import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState, } from "react";
import NavBarComponent from './NavBarComponent';
import 'react-quill/dist/quill.snow.css';
// import renderHTML from 'react-render-html';

function SingleComponent() {
    const params = useParams();
    const [blog,setBlog] = useState('')

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${params.slug}`)
        .then(response=>{
            setBlog(response.data)
        })
        .catch(err=> alert(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className='container p-5'>
            <NavBarComponent/>
            {blog && 
            <div>
                <h1>{blog.title}</h1>
                <div className='pt-3'>{(blog.content)}</div>
                <p className="text-muted">ผู้เขียน : {blog.author}, เผยแพร่ : {new Date(blog.createdAt).toLocaleString("th")}</p>
            </div>}
        </div>
  )
}

export default SingleComponent