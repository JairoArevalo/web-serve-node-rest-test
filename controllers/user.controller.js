import { request, response } from "express";


const getUsuarios = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msj: "Hola mundo controlador get api usuarios"
    })
}


const postUsuarios = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msj: "Hola mundo controlador post api"
    })
}

const putUsuarios = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msj: "Hola mundo put controlador usuarios api"
    })
}


const deleteUsuarios = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msj: "Hola mundo delete controlador usuarios api"
    })
}
export { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios }