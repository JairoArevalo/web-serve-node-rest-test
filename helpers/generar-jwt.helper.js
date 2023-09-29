import jwt from 'jsonwebtoken';
import "dotenv/config";


const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETKEYJWT, {
            expiresIn: '365d',

        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('No se pudo generar el jwt');

            } else {
                resolve(token)
            }
        })
    })
}


export { generarJWT }