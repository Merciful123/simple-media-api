import express from "express"
import getUserDetailsController from "../controller/getUserDetailsController.js"

const router = express.Router()

router.get("/getuserdetails/:userId", getUserDetailsController)

export default router