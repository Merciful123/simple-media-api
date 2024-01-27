import express from "express"
import getAllPosts from "../controller/getAllPostsController.js"

const router = express.Router()

router.get("/allposts/:userId", getAllPosts)

export default router