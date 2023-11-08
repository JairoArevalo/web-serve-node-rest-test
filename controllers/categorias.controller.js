import { request, response } from "express";
import Categorias from "../models/categoria.model.js";
import Usuario from "../models/usuario.model.js";



//GET OBTENER TODAS LAS CATEGORIAS 
const getCategorias = async (req = request, res = response) => {
    const { limite = 10 } = req.query;
    const { desde = 0 } = req.query;
    const query = { estado: true };
    // const populate = {path: 'Usuarios', select: 'nombre'}

    const [total, categorias] = await Promise.all([
        Categorias.countDocuments(query),
        Categorias.find(query)
            .populate('usuario', 'nombre')
            .limit(Number(`${limite}`))
            .skip(Number(`${desde}`))
    ]);
    res.status(200).json({
        ok: true,
        msj: `Get Categorias`,
        categorias,
        total,
    })
    
}



/**
 * 
 * @param {peticion} req peteicion al controllador
 * @param {respuesta} res respuesta en formato json 
 * Get Categorias por id
 */
const getCategoriasById = async (req = request, res = response) => {
    const id = req.params.id
    const categoria = await Categorias.findById(id).populate('usuario', 'nombre');



    res.status(200).json({
        ok: true,
        msj: `Get categorias by id`,
        categoria
    })
}


/**
 * 
 * @param {request} req request
 * @param {response} res 
 * crear categoria con token valido
 */
const postCrearCategoria = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDb = await Categorias.findOne({ nombre });
    if (categoriaDb) {
        res.status(400).json({
            ok: false,
            mjs: `La categoria ya existe`
        })
    }

    //Generar data a guardar

    const usuario = await Usuario.findById(req.uid);
    const data = { nombre, usuario: usuario._id }
    const categoria = new Categorias(data);
    await categoria.save();


    res.status(201).json({
        ok: true,
        msj: `Categoria creada con exito ${nombre}`,
        nombre,
        usuario,
        categoria
    })
}


/**
 * 
 * @param {request} req 
 * @param {response} res
 * Actualizar una categoria por id 
 */
const putActualizarCategoria = async (req = request, res = response) => {
    const id = req.params.id;
    const categoria = {
        nombre: req.body.nombre,
        estado: req.body.estado
    };

    const categoriaDb = await Categorias.findByIdAndUpdate(id, categoria);
    const categoriaUpdate = await Categorias.findById(id);

    res.status(200).json({
        ok: true,
        msj: "Se ha actualizado la categoria",
        categoriaUpdate
    })
}


const eliminarCategoria = async(req = request, res = response) => {
    const id = req.params.id;
    const categoria = {
        estado: false
    };

    const categoriaDb = await Categorias.findByIdAndUpdate(id, categoria);
    const categoriaUpdate = await Categorias.findById(id);

    res.status(200).json({
        ok: true,
        msj: "Se ha eliminado la categoria",
        categoriaUpdate
    })
    
}

export {
    getCategorias,
    getCategoriasById,
    postCrearCategoria,
    putActualizarCategoria,
    eliminarCategoria

};

