import { Router } from "express";

import UserController from "./controllers/UserController";
import TravelController from "./controllers/TravelController";

import auth from "./middlewares/auth";
import SessionsController from "./controllers/SessionsController";


const routes = new Router();

routes.post('/sessions', SessionsController.create);
routes.post('/users', UserController.create);

routes.use(auth);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.remove);
routes.post('/users/:user_id/travels', TravelController.addDestinations);
routes.get('/users/:user_id/travels', TravelController.index);
routes.get('/users/:user_id/travels/:id', TravelController.show);
routes.put('/users/:user_id/travels/:id', TravelController.update);
routes.post('/users/:user_id/travels/calculate-distances', TravelController.calculaDistancia);
routes.delete('/users/:user_id/travels/:id', TravelController.remove);
routes.delete('/users/:user_id/travels', TravelController.removeAll);
routes.get('/users/:user_id/travels/route/:id', TravelController.calculaDistancia);

export default routes;