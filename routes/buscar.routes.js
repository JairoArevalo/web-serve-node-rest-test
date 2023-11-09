import Router from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { getBusqueda } from "../controllers/buscar.controller.js";


const routerBusquedas = Router();

routerBusquedas.get('/:coleccion/:termino',[
] ,getBusqueda);

export { routerBusquedas }