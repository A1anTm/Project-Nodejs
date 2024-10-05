import express, { json } from 'express';
import {config} from 'dotenv';
import mongoose from 'mongoose';
import userRoutes  from '../routes/userRoutes.js'
import taskRoutes from '../routes/taskRoutes.js';
import cors from 'cors';

config({path: './Config/.env'});

const corsOption = {
    origin: ["http://localhost:3001"], //dominios permitidos
    optionsSuccessStatus: 200, // Código de éxito para respuestas preflight OPTIONS
    methods: ["GET", "POST", "PUT","PATCH", "DELETE"], // Métodos HTTP permitidos
    allowedHeaders: ["Content-Type", "Authorization"] // Headers permitidos
}



const app = express();
app.use(cors(corsOption))

const port = process.env.PORT


app.use(json());

app.use("/Users", userRoutes)

app.use("/Task", taskRoutes)


try {
    mongoose.connect(process.env.DATABASE_URL);
} catch (error) {
    
}


app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})