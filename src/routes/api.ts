import express from 'express';
import * as ItemController from '@controllers/itemController';

const app = express();
const Router = express.Router();

Router.route('/items')
    .get(ItemController.index)
    .post(ItemController.create);

Router.route('/items/:id')
    .get(ItemController.show)
    .put(ItemController.update)
    .delete(ItemController.destroy);

app.use('/api', Router);

export default app;