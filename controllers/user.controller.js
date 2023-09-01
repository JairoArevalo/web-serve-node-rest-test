import { request, response } from "express";


const getUsuarios = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msj: "Hola mundo controlador get api usuarios"
    })
}

const getUsuariosParam = (req = request, res = response) => {
    const params = req.query;
    res.status(200).json({
        ok: true,
        msj: "Hola mundo controlador get api usuarios",
        params
    })
}


const postUsuarios = (req, res = response) => {
    const body = req.body;
    res.status(200).json({
        ok: true,
        msj: "Hola mundo controlador post api",
        body
    })
}

const putUsuarios = (req = request, res = response) => {
    const id = req.params.idUsuario;
    res.status(200).json({
        ok: true,
        msj: "Hola mundo put controlador usuarios api",
        id
    })
}


const deleteUsuarios = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msj: "Hola mundo delete controlador usuarios api"
    })
}
export { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios, getUsuariosParam }