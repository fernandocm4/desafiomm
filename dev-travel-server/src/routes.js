import { Router } from "express";

import TesteController from "./controllers/TesteController";
import UserController from "./controllers/UserController";
import TravelController from "./controllers/TravelController";

import auth from "./middlewares/auth";
import SessionsController from "./controllers/SessionsController";

import AutocompleteController from "./controllers/AutocompleteController";

const routes = new Router();

routes.post('/sessions', SessionsController.create);

routes.use(auth);

//routes.get('/teste', TesteController.index);
routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.remove);

routes.post('/users/:user_id/travels', TravelController.addDestinations);
routes.post('/users/:user_id/travels/origins', TravelController.addOrigins);
routes.get('/users/:user_id/travels/origins', TravelController.indexOrigins);
routes.get('/users/:user_id/travels', TravelController.index);


routes.get('/users/:user_id/travels/:id', TravelController.show);
routes.put('/users/:user_id/travels/:id', TravelController.update);

routes.post('/users/:user_id/travels/calculate-distances', TravelController.calculaDistancia);

//routes.put('/users/:user_id/travels/:position/', TravelController.updatePosition);

routes.delete('/users/:user_id/travels/:id', TravelController.remove);
routes.delete('/users/:user_id/origins', TravelController.removeAllOrigins)
routes.delete('/users/:user_id/travels', TravelController.removeAll);
routes.get('/users/:user_id/travels/route/:id', TravelController.calculaDistancia);



routes.post("/users/:user_id/autocomplete", AutocompleteController.index);


export default routes;