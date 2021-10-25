import { ObjectId } from 'mongodb';
import { getDb } from '../../db/db.js';

const queryAllArtesanias = async (callback) => {
    const baseDeDatos = getDb();
    await baseDeDatos.collection("Artesanias").find().toArray(callback);
};

const crearArtesania = async(datosArtesanias, callback)=>{
        if(
            Object.keys(datosArtesanias).includes("codigo") &&
            Object.keys(datosArtesanias).includes("nombre") &&
            Object.keys(datosArtesanias).includes("cantidad") &&
            Object.keys(datosArtesanias).includes("precio")
        ){
            const baseDeDatos = getDb();
            await baseDeDatos.collection('Usuario').insertOne(datosArtesanias, callback);
        } else {
            return 'error';
        }
}

const consultarArtesania = async (id, callback) =>{
    const baseDeDatos = getDb();
    await baseDeDatos.collection("Artesanias").findOne({_id:ObjectId(id)},callback);
}

const editarArtesania = async (id, edicion, callback) => {
    const filtroArtesanias = { _id: new ObjectId(id)};
    const operacion = {
        $set:edicion,
    };
    const baseDeDatos = getDb();
    await baseDeDatos
    .collection('Artesanias')
    .findOneAndUpdate(filtroArtesanias, operacion, {upsert: true, returnOriginal: true}, callback);
}

const eliminarVehiculo = async ( id, callback ) => {
    const filtroArtesanias = {_id: new ObjectId(id)};
    const baseDeDatos = getDb();
    baseDeDatos.collection('Artesanias').delete(filtroArtesanias, callback);
}


export {queryAllArtesanias, crearArtesania, editarArtesania, eliminarVehiculo, consultarArtesania};