import express from "express";
import cors from "cors";
import { router } from "../routes/user.routes.js";
const port = process.env.PORT;

import "dotenv/config";

class Server {
    constructor() {
        this.app = express();
        this.port = port;
        this.usuariosApi =  `/api/usuarios`;
        //Middleware
        this.middlewares();


        //Rutas de la aplicacion
        this.routes();
    }

    middlewares() {
        //Cors
        this.app.use(cors());

        //Read and parse body post

        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {

        //Rutas usuarios
        this.app.use( `${this.usuariosApi}`, router);



    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on this.port ${this.port}`)
        })
    }

}

export { Server }