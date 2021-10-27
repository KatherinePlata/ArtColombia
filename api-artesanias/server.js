import Express from 'express';
import dotenv from 'dotenv';
import Cors from 'cors';
import { conectarBD } from './db/db.js';
import rutasArtesanias from './views/artesanias/rutas.js';
import rutasUsuario from './views/usuarios/rutas.js';
import rutasVenta from './views/ventas/rutas.js';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa'

dotenv.config({path: './.env'});

const app = Express();

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://misiontic-tiendaartesanias.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'api-autenticacion-tienda-artesanias',
  issuer: 'https://misiontic-tiendaartesanias.us.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck);

app.use(rutasArtesanias);
app.use(rutasUsuario);
app.use(rutasVenta);

const main = () => {
    return
    app.listen(process.env.PORT, () => {
        console.log(`escuchando puerto ${process.env.PORT}`);
    });
};

conectarBD(main);
