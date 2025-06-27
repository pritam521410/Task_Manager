import express from "express";
import {registerTask, getallTask, updateTask ,deleteTask, getsingletaskbyid} from "../controllers/taskControllers.js";

const route = express.Router();
route.post("/registertask" ,registerTask);
route.get("/getalltaskbytitle" ,getallTask);
route.put("/updatetask/:id" ,updateTask);
route.delete("/deletetask/:id" ,deleteTask);
route.get("/getsingletaskbyid/:id" ,getsingletaskbyid);
export default route;

