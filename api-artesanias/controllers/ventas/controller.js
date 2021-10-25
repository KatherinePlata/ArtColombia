import { ObjectId } from 'mongodb';
import { getDb } from '../../db/db.js';

const queryAllVenta = async (callback) => {
    const baseDeDatos = getDb();
    console.log('query');
    await baseDeDatos.collection("venta").find().toArray(callback);
};

const crearVenta = async(datosVenta, callback)=>{
    const baseDeDatos = getDb();
    await baseDeDatos.collection('venta').insertOne(datosVenta, callback);
};

const consultarVenta = async (id, callback) =>{
    const baseDeDatos = getDb();
    await baseDeDatos.collection("venta").findOne({_id:ObjectId(id)},callback);
}

const editarVenta = async (id, edicion, callback) => {
    const filtroVenta = { _id: new ObjectId(id)};
    const operacion = {
        $set:edicion,
    };
    const baseDeDatos = getDb();
    await baseDeDatos
    .collection('venta')
    .findOneAndUpdate(filtroVenta, operacion, {upsert: true, returnOriginal: true}, callback);
}

const eliminarVenta = async ( id, callback ) => {
    const filtroVenta = {_id: new ObjectId(id)};
    const baseDeDatos = getDb();
    baseDeDatos.collection('venta').delete(filtroVenta, callback);
}


export {queryAllVenta, crearVenta, editarVenta, eliminarVenta, consultarVenta};