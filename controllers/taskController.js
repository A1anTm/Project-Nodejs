import Task from "../models/taskModel.js";
import mongoose from 'mongoose';


//Crear Tarea
export const createTask = async (req, res) => {

    const {title, description, status} = req.body;
    const userID = req.user._id;
    const newTask = new Task ({title, description, status, useriD: userID, fecha:Date.now(), isDelete: false});
    try{
        await newTask.save();
        res.status(201).json(newTask);
    }catch(error){
        res.status(400).json({message: error.message });
    }
}

//Obtener tareas
export const getTasks = async (req, res) => {
    const userID = req.user._id;
    
    const filter = {
        useriD: userID,
        isDelete: false
    };

    if (req.query.status) {
        filter.status = req.query.status; 
    }

    try {
        const tasks = await Task.find(filter); 
        res.status(200).json(tasks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//Actualizar una tarea por ID


export const updateTask = async (req, res) => {
    const { taskId } = req.params; 
    const updates = req.body; 

    try {
    
        const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true, runValidators: true });

        if (!updatedTask) {
            return res.status(404).json({ message: "Tarea no encontrada." });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



//Eliminar Tarea

export const softDeletedTask = async (req, res) => {
    const taskId = req.params.taskId; 

 
    if (!mongoose.isValidObjectId(taskId)) {
        return res.status(400).json({ message: "ID de tarea no válido." });
    }

    try {
        const updateTask = await Task.findByIdAndUpdate(taskId, { isDelete: true }, { new: true });

        if (!updateTask) {
            return res.status(404).json({ message: "No se encontró la tarea." });
        }

        res.status(200).json(updateTask); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
