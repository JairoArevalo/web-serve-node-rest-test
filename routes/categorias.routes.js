import Router from "express";
import { eliminarCategoria, getCategorias, getCategoriasById, postCrearCategoria, putActualizarCategoria } from "../controllers/categorias.controller.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { isIdCategoria } from "../middlewares/validar-id-categoria.js";


const routerCategorias = Router();


routerCategorias.get('/',[
    validarJWT,
    validarCampos
] ,getCategorias);

routerCategorias.get('/:id', [
    validarJWT,
    isIdCategoria,
    validarCampos
] ,getCategoriasById);

routerCategorias.post('/', [ 
    validarJWT, 
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
] ,postCrearCategoria);

routerCategorias.put('/:id',[
    validarJWT,
    isIdCategoria,
    validarCampos,
], putActualizarCategoria);

routerCategorias.post('/:id', [
    validarJWT,
    isIdCategoria,
    validarCampos
],
 eliminarCategoria);



export { routerCategorias };
