import Router from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { isIdProducto } from "../middlewares/validar-id-productos.js";
import { eliminarProducto, getProductos, getProductosById, postCrearProducto, putActualizarProducto } from "../controllers/productos.controller.js";


const routerProductos = Router();


routerProductos.get('/',[
    validarJWT,
    validarCampos
] ,getProductos);

routerProductos.get('/:id', [
    validarJWT,
    isIdProducto,
    validarCampos
] ,getProductosById);

routerProductos.post('/', [ 
    validarJWT, 
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('idCategoria', 'El idCategoria es obligatorio').notEmpty(),
    validarCampos
] ,postCrearProducto);

routerProductos.put('/:id',[
    validarJWT,
    isIdProducto,
    validarCampos,
], putActualizarProducto);

routerProductos.post('/:id', [
    validarJWT,
    isIdProducto,
    validarCampos
],
eliminarProducto);



export { routerProductos };
