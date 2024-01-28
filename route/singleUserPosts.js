import express from "express";

import singleUserPosts from "../controller/singleUserPostsController.js";

const router = express.Router()

router.get("/singleuserposts/:userId", singleUserPosts)

export default router;