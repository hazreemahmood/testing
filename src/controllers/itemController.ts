import { Request, Response } from 'express';
import { createItem, getAllItems, getItemById, updateItem, deleteItem } from '@models/itemModel';
import { itemSchema } from '@utils/validation';

export const index = async (req: Request, res: Response) => {
  try {
    const items = await getAllItems();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve items', error: err });
  }
};

export const create = async (req: Request, res: Response) => {
  const item = req.body;
  try {
    const validated = await itemSchema.validateAsync(item);
    const results = await createItem(item);
    res.status(201).json({
      id: results[0].id,
      ...item,
      message: 'Item created successfully'
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create item', error: err });
  }
};

export const show = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const item = await getItemById(id as any);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
    } else {
      res.status(200).json(item);
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve item', error: err });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = req.body;
  try {
    await itemSchema.validateAsync(item);
    await updateItem(id as any, item);
    res.status(200).json({ message: 'Item updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update item', error: err });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteItem(id as any);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete item', error: err });
  }
};