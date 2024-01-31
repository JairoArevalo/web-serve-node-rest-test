import { request, response } from "express";
import { subirArchivo } from "../helpers/file-validator.helper.js";
import Usuario from "../models/usuario.model.js";
import Productos from "../models/producto.model.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import fs from 'fs';


const cargarArchivo = async (req = request, res = response) => {


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json('No hay archivos.');
        return;
    }

    try {
        const pathArchivoCargado = await subirArchivo(req.files);

        res.status(200).json({
            ok: true,
            msj: `Se cargo el archivo ${pathArchivoCargado}`
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msj: error
        })
    }

}


const servirArchivo = async (req = request, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;
    
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    ok: false,
                    msj: `El id ${id} no corresponde a un id de un usuario registrado`
                })
            }

            break;
        case 'productos':
            modelo = await Productos.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    ok: false,
                    msj: `El id ${id} no corresponde a un id de un producto registrado`
                })
            }

            break;

        default:
            return res.status(500).json({
                ok: false,
                msj: 'No está dentro de las validaciones'
            });
    }

    

    //LIMPIAR IMG PREVIAS
    if (modelo.img) {
        //Eliminar img
        const imgPath = modelo.img.slice(0, modelo.img.length - 3);
        const extension = modelo.img.substring(modelo.img.length - 3);
        //Eliminar img
        const pathImg = path.join(__dirname, `../uploads/${coleccion}`, imgPath + '.' + extension);
        if (fs.existsSync(pathImg)) {
            res.status(200).sendFile(pathImg);
        } 
        
        
    }
    const pathImg = path.join(__dirname, `../assets/no-image.jpg`);
    res.sendFile(pathImg)
    console.log("entra");



}



const actualizarArchivo = async (req = request, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json('No hay archivos.');
        return;
    }
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    ok: false,
                    msj: `El id ${id} no corresponde a un id de un usuario registrado`
                })
            }

            break;
        case 'productos':
            modelo = await Productos.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    ok: false,
                    msj: `El id ${id} no corresponde a un id de un producto registrado`
                })
            }

            break;

        default:
            return res.status(500).json({
                ok: false,
                msj: 'No está dentro de las validaciones'
            });
    }



    //LIMPIAR IMG PREVIAS
    if (modelo.img) {
        const imgPath = modelo.img.slice(0, modelo.img.length - 3);
        const extension = modelo.img.substring(modelo.img.length - 3);
        //Eliminar img
        const pathImg = path.join(__dirname, `../uploads/${coleccion ?? '/'}`, imgPath + '.' + extension);
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        }

    }



    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();

    res.status(200).json({
        ok: true,
        mjs: `Cambiado archivo ${modelo}`
    })


}

export { cargarArchivo, actualizarArchivo, servirArchivo };