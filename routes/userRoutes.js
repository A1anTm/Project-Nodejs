import { Router } from "express";
import { registerUser, loginUser  } from "../controllers/userController.js";
const userRoutes = Router()


//Registro de nuevos usuarios -> /auth/register
userRoutes.post("/auth/register", registerUser)

//Login Usuario
userRoutes.post("/auth/login", loginUser)


export default userRoutes;

