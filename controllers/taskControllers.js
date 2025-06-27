import Taskmanager from "../model/taskmanager.js";

export const registerTask = async(req ,res)=>{
    const {title , description , status , duedate} = req.body;
    try {
        const existingTask = await Taskmanager.findOne({title});
        if(existingTask){
            return res.status(404).json({message:"already Task exist"});
        }
            const task= new  Taskmanager({title , description , status , duedate});
            await task.save();
            res.status(201).json({message: "Task save successfully",task});
        
    } catch (error) {
         res.status(500).json({message:"internal error" ,error:error.message});
    }
}



export const getallTask = async (req, res) => {
  const { title } = req.query;

  try {
    const filter = {};

    if (title) {
      filter.title = new RegExp(title, "i"); 
    }

    const tasks = await Taskmanager.find(filter);

    res.status(200).json({
      message: "Tasks fetched successfully",tasks
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

export const updateTask = async(req ,res)=>{
    const {id} = req.params;
    const{title , description , status , duedate} = req.body;
    try {
        const task = await Taskmanager.findOneAndUpdate({id} ,{title , description , status , duedate} , {new:true})
        res.status(200).json({message: "data updated", task});
    } catch (error) {
        res.status(500).json({
      message: "Internal server error",
      error: error.message
        });
    }
}

export const deleteTask = async(req , res)=>{
    const {id} = req.params;
    try {
        const task = await Taskmanager.findOneAndDelete({id});
        res.status(500).json({message: "deleted successfully" , task});
    } catch (error) {
        res.status(500).json({
      message: "Internal server error",
      error: error.message
        });
    }
}

export const getsingletaskbyid = async(req ,res)=>{
    const {id} = req.params;
    try {
        const task = await Taskmanager.findOne({id});
        res.status(500).json({message: "single task fetch successfully" , task});
    } catch (error) {
       res.status(500).json({
      message: "Internal server error",
      error: error.message 
       });
    }
} 

