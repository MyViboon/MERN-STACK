const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const BlogRouter = require("./routes/blog")
const authRouter = require("./routes/auth")

const app = express()

//connect cluod database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: false
})
.then(()=>console.log("เชื่อมต่อเรียบร้อย"))
.catch((err)=>console.log(err))

//middeleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//route
app.use('/api',BlogRouter)
app.use('/api',authRouter)

const port = process.env.PORT || 8080
app.listen(port,()=>console.log(`Start server in port ${port}`))





