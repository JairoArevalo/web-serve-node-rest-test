import { Schema, model } from "mongoose";


const RoleSchema = Schema({
    roles: { type:String, require:[true, 'El rol es obligatorio'] }
});

export default model('Roles', RoleSchema);
