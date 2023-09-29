import Roles from "../models/rol.model.js";
import Usuario from "../models/usuario.model.js";


const esRolValido = async (rol = '') => {
    const existeRolModel = await Roles.findOne({ rol });
    if (!existeRolModel) {
        throw new Error('El rol no es válido');
    }
}


const existeEmail = async (correo = '') => {
    const email = await Usuario.findOne({ correo });
    if (email) {
        throw new Error('El email ya está registrado');
    }
}


const existeUsuarioPorId = async (idUsario = '') => {
    const usuarioId = await Usuario.findById(idUsario);
    if (!usuarioId) {
        throw new Error('El id no existe')
    }

}



export { esRolValido, existeEmail, existeUsuarioPorId };