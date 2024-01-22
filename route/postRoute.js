import express from "express"
import createPost from "../controller/postController.js"

const router = express.Router()

router.post("/createpost", createPost)

export default router