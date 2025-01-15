import { Router, Express } from 'express';
import { createItems, getAllItem, getItemByIds, updateItems, deleteItems } from '@controllers/itemController';

const router = Router();

router.post('/api/items', createItems);
router.get('/api/items', getAllItem);
router.get('/api/items/:id', getItemByIds);
router.put('/api/items/:id', updateItems);
router.delete('/api/items/:id', deleteItems);

export const setItemRoutes = (app: any) => {
  app.use('/', router);
};