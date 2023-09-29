import { request, response } from "express";
import Usuario from "../models/usuario.model.js";
import bcryptjs from "bcryptjs";

const getUsuarios = async (req = request, res = response) => {
    const { limite = 10 } = req.query;
    const { desde = 0 } = req.query;
    const query = { estado: true }
    


    const [ total, usuarios]  = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .limit(Number(`${limite}`))
            .skip(Number(`${desde}`))
    ]);

    

    res.status(200).json({
        ok: true,
        msj: "Listado de usuarios",
        usuarios,
        total

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


const postUsuarios = async (req, res = response) => {

    const body = req.body;
    const { nombre, correo, password, rol } = body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // encriptar 
    const salt = await bcryptjs.genSalt();
    usuario.password = bcryptjs.hashSync(password, salt);
    // guardar contraseña
    await usuario.save();
    res.status(200).json({
        ok: true,
        msj: "Hola mundo controlador post api",
        usuario
    })
}

const putUsuarios = async (req = request, res = response) => {
    const id = req.params.idUsuario;
    const { _id, password, google, ...usuario } = req.body;

    if (password) {
        const salt = await bcryptjs.genSalt();
        usuario.password = bcryptjs.hashSync(password, salt);
    }

    const usuarioDb = await Usuario.findByIdAndUpdate(id, usuario);
    const usuarioUpdate = await Usuario.findById(id);

    res.status(200).json({
        ok: true,
        msj: "Se ha actualizado el usuario",
        usuarioUpdate
    })
}


const deleteUsuarios = async (req = request, res = response) => {
    const idUsario = req.params.idUsuario;
    const uid = req.uid;

    const usuarioAuth = await Usuario.findById(uid);

    if (!usuarioAuth || !usuarioAuth.estado) {
        return res.status(401).json({
            ok: true,
            msj: "El usuario no esta activo",
        })
    }

    const usuarioUpdate = await Usuario.findByIdAndUpdate( idUsario, {estado:false})
    const usuarioDelete = await Usuario.findById(idUsario);

    res.status(200).json({
        ok: true,
        msj: "El usuario ha sido eliminado",
        usuarioDelete,
        usuarioAuth,
    })
}





export { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios, getUsuariosParam }