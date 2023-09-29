import Router from "express";
import { deleteUsuarios, getUsuarios, getUsuariosParam, postUsuarios, putUsuarios } from "../controllers/user.controller.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { esRolValido, existeEmail, existeUsuarioPorId } from "../helpers/db-validators.helper.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { isAdminRol } from "../middlewares/validar-rol.js";

const router = Router();

router.get('/', getUsuarios);

router.put('/:idUsuario', [
    check('idUsuario', 'No es un id válido').isMongoId(),
    check('idUsuario').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido), 
    validarCampos
] ,putUsuarios);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('password', 'El password es obligatorio y tener al menos 4 caracteres').notEmpty().isLength(4),
    check('correo', 'El correo no es valido').custom( existeEmail ).isEmail(),
    check('rol').custom( esRolValido ),
    validarCampos,
], postUsuarios);

router.delete('/:idUsuario', [
    validarJWT,
    isAdminRol,
    check('idUsuario', 'No es un id válido').isMongoId(),
    check('idUsuario').custom( existeUsuarioPorId ),
    validarCampos
] ,deleteUsuarios);

router.get('/param', getUsuariosParam);


export { router }