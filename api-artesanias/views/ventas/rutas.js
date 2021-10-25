import Express from 'express';
import {
    queryAllVenta,
    crearVenta,
    editarVenta,
    eliminarVenta } from '../../controllers/Ventas/controller.js';

const rutasVenta = Express.Router();

const genericCallback = (res)=> (err, result) => {
        if(err){
            res.status(500).send('error consultando Ventas')
        }
        else{
            res.json(result);
        }
};

rutasVenta.route('/ventas').get((req, res)=>{
    console.log('alguien hiz get en la ruta /ventas');
    queryAllVenta(genericCallback(res));
});


rutasVenta.route('/ventas').post((req, res)=>{
    crearVenta(req.body, genericCallback(res));
});

rutasVenta.route('/ventas/:id').get((req, res)=>{
    console.log('alguien hiz get en la ruta /ventas');
    consultarVenta(req.params.id, genericCallback(res));
});

rutasVenta.route('/ventas/:id').patch((req, res) =>{
    editarVenta(req.params.id, req.body, genericCallback(res));
});

rutasVenta.route('/ventas/:id').delete((req, res) => {
    eliminarVenta(req.params.id, genericCallback(res));
});

export default rutasVenta;