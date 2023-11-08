import { Schema, model } from "mongoose";

const usuarioSchema = Schema({
    nombre: { type: String, require: [true, 'El nombre es obligatorio'] },
    correo: { type: String, require: [true, 'El correo es requerido'], unique: true },
    password: { type: String, require: [true, 'La contraseña es obligatorio'] },
    img: { type: String, },
    rol: { type: String, require: [true, 'El rol es obligatorio'], enum:['ADMIN_ROLE','USER_ROLE'] },
    estado: { type: Boolean, default: true },
    google: { type: Boolean, default: false },
});


usuarioSchema.methods.toJSON = function () {
    const { __v , password, _id , ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}


usuarioSchema.options.strictPopulate = false;

export default model('Usuarios', usuarioSchema);