import Router from "express";
import { deleteUsuarios, getUsuarios, getUsuariosParam, postUsuarios, putUsuarios } from "../controllers/user.controller.js";

const router = Router();

router.get('/', getUsuarios);

router.put('/:idUsuario', putUsuarios);

router.post('/', postUsuarios);

router.delete('/', deleteUsuarios);

router.get('/param', getUsuariosParam);


export {router}