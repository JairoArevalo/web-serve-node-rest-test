import { request, response } from "express";
import Usuario from "../models/usuario.model.js";

const isAdminRol = async (req = request, res = response, next) => {
    const uid = req.uid;
    const usuario = await Usuario.findById(uid);

    if (usuario && (usuario.rol == 'ADMIN_ROLE' || usuario.rol == 'ADMIN_ROL' || usuario.rol == 'USER_ROL')) {
        
        next();
    }

    return res.status(401).json({
        ok: false,
        mjs: `El usuario no tiene el rol administrador`
    })


}


export { isAdminRol };