const express = require("express")
const { requireLogin } = require("../controllers/authController")
const router = express.Router()
const { create,getAllblog,singlgBlog,remove,update } = require("../controllers/blogController")

router.post("/create",requireLogin,create)
//การเรียกใช้งาน
router.get("/blogs",getAllblog)
router.get("/blog/:slug",singlgBlog)

router.delete("/blog/:slug",requireLogin, remove)
router.put("/blog/:slug", requireLogin,update)

module.exports = router