//ชื่อบทความ(title), เนือหา(content), ผู้เขียน(author), ulr(slug)

const mongoose = require('mongoose')

//ออกแบบสร้าง Field ในตาราง
const blogSchema = mongoose.Schema({
    title: {
        type:String,
        require:true
    },
    content: {
        type: {},
        require:true        
    },
    author: {
        type:String,
        default:"Admin" 
    },
    slug: {
        type:String,
        lowercase:true,
        unique:true,
    }
},{timestamps:true})

module.exports = mongoose.model("Blogs",blogSchema)