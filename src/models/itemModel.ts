import db from '@config/db';

interface Item {
  name: string;
  description?: string;
  price: number;
}

export const getAllItems = async (): Promise<any[]> => {
  const [results] = await db.query('SELECT * FROM items');
  return results as any[];
};

export const getItemById = async (id: number): Promise<any> => {
  const [results] = await db.query('SELECT * FROM items WHERE id = ?', [id]);
  return results;
};

export const createItem = async (item: Item): Promise<any> => {
  const { name, description, price } = item;
  const [results] = await db.query(
    'INSERT INTO items (name, description, price) VALUES (?, ?, ?)',
    [name, description, price]
  );
  return results;
};

export const updateItem = async (id: number, item: Item): Promise<any> => {
  const { name, description, price } = item;
  const [results] = await db.query(
    'UPDATE items SET name = ?, description = ?, price = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
    [name, description, price, id]
  );
  return results;
};

export const deleteItem = async (id: number): Promise<any> => {
  const [results] = await db.query('DELETE FROM items WHERE id = ?', [id]);
  return results;
};