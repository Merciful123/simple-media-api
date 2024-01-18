import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import cors from "cors";

import bodyParser from "body-parser";
import authRoute from "./route/authRoute.js";
dotenv.config();

const port = process.env.PORT;

const app = express();
// 
app.use(express.json());


app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });
// 

// middleware



app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


mongoose.connect(process.env.DB_URL).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});


// routes
app.get("/", (req,res) => {
  return res.json({message:"connected"})
})

app.use("/api", authRoute)

// app.use("/api", authRoute)