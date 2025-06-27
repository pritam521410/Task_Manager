import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./db.js";
import taskRoute from "./route/taskRoute.js";
dotenv.config();
const app=express();


app.use(express.json());
const PORT= process.env.PORT ||5000;
connectDB();
app.use("/api" , taskRoute);


app.listen(PORT, ()=>{
    console.log("app is listening port 5000");
})