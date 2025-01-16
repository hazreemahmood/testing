import db from '@config/db';
import { items } from '@schema/items';
import { InferModel, eq, sql } from 'drizzle-orm';

type TItem = InferModel<typeof item>;

export const getAllItems = async (): Promise<any[]> => await db.select().from(items);

export const getItemById = async (id: number): Promise<any> => {
  const res = await db.select().from(items).where(eq(items.id, id));
  return res.length > 0 ? res[0] : null;
}

export const createItem = async (data: TItem): Promise<any> => await db.insert(items).values(data).$returningId();

export const updateItem = async (id: number, data: TItem): Promise<any> => await db.update(items).set({ ...data, updatedAt: sql`NOW()`}).where(eq(items.id, id));

export const deleteItem = async (id: number): Promise<any> => await db.delete(items).where(eq(items.id, id));