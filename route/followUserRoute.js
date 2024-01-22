import express from "express"
import followUser from "../controller/followUserController.js"

const router = express.Router()

router.post("/followuser", followUser)

export default router