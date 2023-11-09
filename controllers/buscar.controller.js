import { request, response } from "express";
import Productos from "../models/producto.model.js";
import Usuario from "../models/usuario.model.js";
import Categorias from "../models/categoria.model.js";


const coleccionesPermitidas = [
    'categorias',
    'productos',
    'usuarios',

]


const buscarUsuarios = async (termino = '', res = response) => {
   return res.status(200).json({
    ok:true,
    msj: `DAta`
   })


}


//GET OBTENER TODAS Los productos 
const getBusqueda = async (req = request, res = response) => {
    const { coleccion, termino } = req.params;
    if (!coleccionesPermitidas.includes(coleccion)) {
        res.status(400).json({
            ok: false,
            mjs: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }
    switch (coleccion) {
        case "usuarios":
            buscarUsuarios(termino).then((data)=> {
                res.json(data)
            });
            break;
        case "productos":

            break;
        case "categorias":

            break;

        default:
            res.send(500).json({
                ok: false,
                msj: `Busqueda no implementada`

            })
    }


}



/**
 * 
 * @param {peticion} req peteicion al controllador
 * @param {respuesta} res respuesta en formato json 
 * Get Categorias por id
 */
const getProductosById = async (req = request, res = response) => {
    const id = req.params.id
    const producto = await Productos.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');



    res.status(200).json({
        ok: true,
        msj: `Get producto by id`,
        producto
    })
}


/**
 * 
 * @param {request} req request
 * @param {response} res 
 * crear categoria con token valido
 */
const postCrearProducto = async (req = request, res = response) => {
    console.log(req.params);
    const nombre = req.body.nombre?.toUpperCase();

    // const productoDb = await Productos.findOne({ nombre });
    // if (productoDb) {
    //     res.status(400).json({
    //         ok: false,
    //         mjs: `El producto ya existe`
    //     })
    // }

    //Generar data a guardar

    const usuario = await Usuario.findById(req.uid);
    const categoria = await Categorias.findById(req.body.idCategoria);
    const data = { nombre, usuario: usuario._id, categoria: categoria._id }
    const producto = new Productos(data);
    await producto.save();


    res.status(201).json({
        ok: true,
        msj: `Producto creado con exito ${nombre}`,
        nombre,
        usuario,
        categoria,
        producto
    })
}


/**
 * 
 * @param {request} req 
 * @param {response} res
 * Actualizar una categoria por id 
 */
const putActualizarProducto = async (req = request, res = response) => {
    const id = req.params.id;
    const producto = {
        nombre: req.body.nombre,
        estado: req.body.estado,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        disponible: req.body.disponible,
    };

    const productoDb = await Productos.findByIdAndUpdate(id, producto, { new: true });
    const prodcutoUpdate = await Productos.findById(id);

    res.status(200).json({
        ok: true,
        msj: "Se ha actualizado el producto",
        prodcutoUpdate
    })
}


const eliminarProducto = async (req = request, res = response) => {
    const id = req.params.id;
    const producto = {
        estado: false
    };

    const prodcutoDb = await Productos.findByIdAndUpdate(id, producto);
    const prodcutoUpdate = await Productos.findById(id);

    res.status(200).json({
        ok: true,
        msj: "Se ha eliminado el prodcuto",
        prodcutoDb
    })

}

export {
    getBusqueda

};

