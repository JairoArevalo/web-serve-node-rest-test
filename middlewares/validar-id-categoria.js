import { request, response } from "express";
import Categorias from "../models/categoria.model.js";



const isIdCategoria = async (req = request, res = response, next) => {
    const uid = req.params.id;
    const categoria = await Categorias.findById(uid);
    // console.log(categoria);
    if (!categoria.estado) {
        return res.status(401).json({
            ok: false,
            mjs: `El id ${uid}, no existe para una categoria`
        })
        
    } else {

        next();
    }

   


}


export { isIdCategoria };