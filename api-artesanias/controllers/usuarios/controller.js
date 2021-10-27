import { ObjectId } from 'mongodb';
import { getDb } from '../../db/db.js';
import jwt_decode from 'jwt-decode';

const queryAllUsuario = async (callback) => {
    const baseDeDatos = getDb();
    console.log('query');
    await baseDeDatos.collection("usuario").find().toArray(callback);
};

const crearUsuario = async(datosUsuario, callback)=>{
    const baseDeDatos = getDb();
    await baseDeDatos.collection('usuario').insertOne(datosUsuario, callback);
};

const consultarUsuario = async (id, callback) =>{
    const baseDeDatos = getDb();
    await baseDeDatos.collection("usuario").findOne({_id:ObjectId(id)},callback);
}

const ConsultarOCrearusuario = async (req, callback)=>{
    const token = req.headers.authorization.split('Bearer')[1];
    const user = jwt_decode(token)['htpp://localhost/userData'];
    console.log(user);

    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').findOne({email: user.email}, async (err, response) => {
        if(response){
            callback(err, response);
        }else{
            user.auth0ID = user._id;
            delete user._id;
            user.rol = 'sin rol';
            user.estado = 'pendiente'
            await crearUsuario(user, (err, respuesta) => callback(err, user));
        }
    })
}

const editarUsuario = async (id, edicion, callback) => {
    const filtroUsuario = { _id: new ObjectId(id)};
    const operacion = {
        $set:edicion,
    };
    const baseDeDatos = getDb();
    await baseDeDatos
    .collection('usuario')
    .findOneAndUpdate(filtroUsuario, operacion, {upsert: true, returnOriginal: true}, callback);
}

const eliminarUsuario = async ( id, callback ) => {
    const filtroUsuario = {_id: new ObjectId(id)};
    const baseDeDatos = getDb();
    baseDeDatos.collection('usuario').delete(filtroUsuario, callback);
}


export {queryAllUsuario, crearUsuario, editarUsuario, eliminarUsuario, consultarUsuario, ConsultarOCrearusuario};