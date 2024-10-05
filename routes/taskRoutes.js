import { Router } from "express";
import {  createTask, getTasks, updateTask, softDeletedTask } from "../controllers/taskController.js";
import { isAuth } from "../middlewares/auth.js";
const taskRoutes = Router()



//Crear Tarea
taskRoutes.post("/tasks", isAuth, createTask)

//Obtener todas las tareas del usuario autenticado
taskRoutes.get("/tasks", isAuth, getTasks)

//Actualizar una tarea por ID

taskRoutes.patch("/tasks/:taskId", isAuth, updateTask)

//Eliminar Tarea

taskRoutes.delete("/tasks/:taskId", isAuth, softDeletedTask)







export default taskRoutes;