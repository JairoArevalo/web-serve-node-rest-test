import { Schema, model } from "mongoose";


const CategoriaSchema = Schema({
    nombre: { type: String, unique: true, require: [true, 'El nombre es obligatorio'] },
    estado: { type: Boolean, default: true, require: [true, 'El nombre es obligatorio'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios', require: [true, 'El usuario es requerido'] },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    description: { type: String, default: '' },
});

CategoriaSchema.options.strictPopulate = false;
export default model('Categorias', CategoriaSchema);
