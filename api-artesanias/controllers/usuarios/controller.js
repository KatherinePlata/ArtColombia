import { ObjectId } from 'mongodb';
import { getDb } from '../../db/db.js';

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


export {queryAllUsuario, crearUsuario, editarUsuario, eliminarUsuario, consultarUsuario};