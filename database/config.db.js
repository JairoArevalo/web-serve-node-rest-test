import mongoose from 'mongoose'
const mongoConexion = process.env.MONGODD_CN;
const dbConecction = async ()=> {
    try {

        await mongoose.connect( mongoConexion , {
            
        } );

        console.log("Base de datos online");
        
    } catch (error) {
        console.log(error);
        throw new Error("Error al conectar en la base de datos")
        
    }

}


export {dbConecction}