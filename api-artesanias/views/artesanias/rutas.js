import Express from 'express';
import {
    queryAllArtesanias,
    crearArtesania,
    editarArtesania,
    eliminarVehiculo } from '../../controllers/artesanias/controller.js';

const rutasArtesanias = Express.Router();

const genericCallback = (res)=> (err, result) => {
        if(err){
            res.status(500).jsone({error : err });
        }
        else{
            res.json(result);
        }
};

rutasArtesanias.route('/artesanias').get((req, res)=>{
    console.log('alguien hiz get en la ruta /artesanias');
    queryAllArtesanias(genericCallback(res));
});


rutasArtesanias.route('/artesanias').post((req, res)=>{
    crearArtesania(req.body, genericCallback(res));
});

rutasArtesanias.route('/artesanias/:id').get((req, res)=>{
    console.log('alguien hiz get en la ruta /artesanias');
    consultarArtesania(req.params.id, genericCallback(res));
});

rutasArtesanias.route('/artesanias/:id').patch((req, res) =>{
    editarArtesania(req.params.id, req.body, genericCallback(res));
});

rutasArtesanias.route('/artesanias/:id').delete((req, res) => {
    eliminarVehiculo(req.params.id, genericCallback(res));
});

export default rutasArtesanias;