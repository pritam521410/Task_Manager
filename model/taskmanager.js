import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";
const taskmanagerSchema = new mongoose.Schema({
 
    id:{
        type:String,
        default:()=>`user-${uuidv4()}`
    }, 

    title:{
        type:String,
        required:true
    },
    description:{
     type:String,
     required:true
    },
    status:{
        type:String,
        enum :["pending" , "done" ] 
    },
    duedate:{
       type: Date,
       required:true
    }
}, {timestamps:true});

export default mongoose.model("Taskmanager" , taskmanagerSchema);