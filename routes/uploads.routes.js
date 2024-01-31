import Router from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { actualizarArchivo, cargarArchivo, servirArchivo } from "../controllers/uploads.controller.js";
import { validarColeccionesPermitidas } from "../helpers/db-validators.helper.js";

const routerUpload = Router();


routerUpload.post( '/', [], cargarArchivo);
routerUpload.put( '/:coleccion/:id', [
    check('coleccion').custom( c  => validarColeccionesPermitidas( c, ['usuarios', 'productos'] )    ),
    check('id', 'el id debe ser un id válido de mongo').isMongoId(),
    validarCampos
], actualizarArchivo);

routerUpload.get('/:coleccion/:id',[
    check('coleccion').custom( c  => validarColeccionesPermitidas( c, ['usuarios', 'productos'] )    ),
    check('id', 'el id debe ser un id válido de mongo').isMongoId(),
    validarCampos
], servirArchivo);

export { routerUpload }