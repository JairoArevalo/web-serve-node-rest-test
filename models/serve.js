import express from "express";
import cors from "cors";
import { dbConecction } from "../database/config.db.js";
import { router } from "../routes/user.routes.js";
import { routerAuth } from "../routes/auth.routes.js";
const port = process.env.PORT;

import "dotenv/config";

class Server {
    constructor() {
        this.app = express();
        this.port = port;
        this.usuariosApi    =  `/api/usuarios`;
        this.authRoute      =  `/api/auth`
        // conectar a base de datos
        this.conectarDB();

        //Middleware
        this.middlewares();


        //Rutas de la aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConecction();
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
        this.app.use( `${this.authRoute}`, routerAuth);
        this.app.use( `${this.usuariosApi}`, router);



    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on this.port ${this.port}`)
        })
    }

}

export { Server }