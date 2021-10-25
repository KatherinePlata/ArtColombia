import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({path: '../.env'});

//const stringConexion = process.env.DATABASE_URL;
const stringConexion = "mongodb+srv://dsolis:diana2021@proyectotiendaartesania.bjhe4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(stringConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let baseDeDatos;

const conectarBD = (callback) => {
    client.connect((err, db) => {
        if (err) {
            console.error('Error conectando a la base de datos');
            return 'error';
            }
            baseDeDatos = db.db('artesanias');
            console.log('baseDeDatos exitosa')
            return callback;
    });
}

const getDb= () => {
    return baseDeDatos;
}
export { conectarBD, getDb };