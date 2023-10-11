import { response, request } from "express";
import Usuario from "../models/usuario.model.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generar-jwt.helper.js";
import { googleVerify } from "../helpers/google-verify.helper.js";

const login = async (req = request, res = response) => {
    const { correo, password, nombre } = req.body;
    const body = req.body;

    try {
        //Verificar si el correo exixste
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mjs: `No se encontro el usuario con el correo: ${correo}`
            })
        }

        //SI el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                ok: false,
                mjs: `El usuario con el correo: ${correo} no está activo`
            })
        }
        // contraseña 

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                mjs: `El usuario con el correo: ${correo} no es correcta la contraseñas`
            })
        }

        //Generar JWT

        const token = await generarJWT(usuario.id);

        res.status(200).json({
            ok: true,
            msj: `Login`,
            token,
            usuario
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            mjs: `${error}`
        })
    }


};

const googleSing = async (req = request, res = response) => {
    const { id_token } = await req.body;

    try {

        const { correo, nombre, img } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            const data = { ...usuario, google:true, password: '', };
            usuario =  new Usuario(data);
            await usuario.save()

        }

        if (!usuario.estado ) {
            return res.status(400).json({
                ok:false,
                msj: `El usuario no se encunetra activo hable con admin`
            })
        }

        //Generar JWT

        const token = await generarJWT(usuario.id);


        res.status(200).json({
            ok: true,
            id_token,
            token,
            usuario
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msj: `No se pudo validar el login con google ${error}`
        })
    }


}


export { login, googleSing }