//ติดต่อกับฐานข้อมูล// ดำเนินการกับฐานข้อมูล
const slugify = require("slugify")
const Blogs = require('../models/blogs') // แปลง title ให้เป็น รูปแบบ url
const { v4: uuidv4 } = require('uuid');
//บันทึกข้อมูล
exports.create = (req,res)=>{
    const {title,content,author} = req.body
    let slug = slugify(title)

    //ตรวจสอบความถูกต้องของข้อมูล
    if(!slug)slug=uuidv4();
 
    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนบทความ"})
            break;
        case !author:
            return res.status(400).json({error:"กรุณาใส่ชื่อ"})
            break;
    }
    //บันทึกข้อมูล
    Blogs.create({title,content,author,slug},(err,blog)=>{
        if(err){
            res.status(400).json({error:"มีชื่อบทความซ้ำกัน"})
        }
        res.json(blog)

    })
}
//ดึงข้อมูลบทความทั้งหมด
exports.getAllblog = (req,res) => {
    Blogs.find({}).exec((err,blogs)=>{
        res.json(blogs)
    })
}

//ดึงบทความที่สนใจอ้างอิงผ่าน slug
exports.singlgBlog = (req,res) => {
    const {slug} = req.params
    Blogs.findOne({slug}).exec((err,blog)=>{
        res.json(blog)
    })
}
//ลบข้อมูล อ้างอิงผ่าน slug
exports.remove = (req,res) => {
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json({
            message: "ลบบทความเรียบร้อย"
        })
    })
}
//อัพเดท แก้ไขข้อมูล 
exports.update =(req,res) => {
    const {slug} = req.params //ส่งข้อมูล  title,content,authot
    const {title,content,author} = req.body
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true})
    .exec((err, blog)=>{
        if(err) console.log(err)
        res.json(blog)
    })
}