import express from "express"
import getAllUsers from "../controller/getAllUsersController.js";

const router = express.Router()

router.get("/allusers", getAllUsers)

export default router;