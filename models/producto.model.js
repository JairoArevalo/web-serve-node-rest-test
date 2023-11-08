import { Schema, model } from "mongoose";


const ProductosSchema = Schema({
    nombre: { type: String, unique: true, require: [true, 'El nombre es obligatorio'] },
    estado: { type: Boolean, default: true, require: [true, 'El nombre es obligatorio'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios', require: [true, 'El usuario es requerido'] },
    precio: {type: Number, default: 0},
    categoria: {type: Schema.Types.ObjectId, ref: 'Categorias', require: [true, 'la categoria es requerida']},
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    description: { type: String, default: '' },
    disponible: {type: Boolean, default: true}

});

export default model('Productos', ProductosSchema);


//Tarea hacer get de productos
// obtener producto por id
// crear producto
// actualizar producto
// eliminar producto usar populate, enviar id para categorias y usuario validacion de token y ids