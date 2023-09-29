import { request, response } from "express";
import jwt from 'jsonwebtoken';

const validarJWT = (req = request, res = response, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            ok: false,
            mjs: `No hay jwt valido`
        })
    }

    try {
        const payload = jwt.verify(token, process.env.SECRETKEYJWT);
        const { uid } = jwt.verify(token, process.env.SECRETKEYJWT);
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            mjs: `JWT no valido`
        })
    }

}


export { validarJWT }