import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload'

import SessionController from './controllers/SessionController';

import HouseController from './controllers/HouseController'

import DashboardController from './controllers/DashboardController';

import ReserveController from './controllers/ReserveController';


const routes = new Router();
const upload = multer(uploadConfig)

routes.post('/sessions', SessionController.store);

routes.post('/house', upload.single('thumbnail') ,HouseController.store );

routes.get('/houses', HouseController.index);

routes.put('/houses/:house_id', upload.single('thumbnail'), HouseController.update);
//Passamos o nosso carregamento de imagem aqui caso ele queira atualizar a img

routes.delete('/houses', HouseController.destroy);

routes.get('/dashboard', DashboardController.show);

routes.post('/houses/:house_id/reserve', ReserveController.store);

routes.get('/reserves', ReserveController.index);

routes.delete('/reserves/cancel', ReserveController.destroy);

export default routes;