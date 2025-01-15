import { Request, Response } from 'express';
import { createItem, getAllItems, getItemById, updateItem, deleteItem } from '@models/itemModel';
import { validateItem } from '@utils/validation';

export const createItems = async (req: Request, res: Response) => {
  const { name, description, price } = req.body;

  const { error } = validateItem({ name, description, price });
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  try {
    const results = await createItem({ name, description, price });
    const result_data = {
      id: results.insertId,
      name: name,
      description: description,
      price: price,
      message: 'Item created successfully'
    };
    res.status(201).json(result_data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create item', error: err });
  }
};

export const getAllItem = async (req: Request, res: Response) => {
  try {
    const items = await getAllItems();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve items', error: err });
  }
};

export const getItemByIds = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const item = await getItemById(id as any);
    if (item.length === 0) {
      res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve item', error: err });
  }
};

export const updateItems = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  const { error } = validateItem({ name, description, price });
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  try {
    await updateItem(id as any, { name, description, price });
    res.status(200).json({ message: 'Item updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update item', error: err });
  }
};

export const deleteItems = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteItem(id as any);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete item', error: err });
  }
};