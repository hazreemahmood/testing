import { mysqlTable, serial, varchar, decimal, timestamp } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const items = mysqlTable('items', {
  id: serial().primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  description: varchar({ length: 100 }),
  price: decimal({ precision: 10, scale: 2}).notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow().$onUpdate(() => sql`now()`),
});