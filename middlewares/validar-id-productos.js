import { request, response } from "express";
import Productos from "../models/producto.model.js";



const isIdProducto = async (req = request, res = response, next) => {
    const uid = req.params.id;
    const producto = await Productos.findById(uid);
    // console.log(producto);
    if (!producto.estado) {
        return res.status(401).json({
            ok: false,
            mjs: `El id ${uid}, no existe para un producto`
        })
        
    } else {

        next();
    }

   


}


export { isIdProducto };