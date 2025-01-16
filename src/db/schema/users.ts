import { mysqlTable, int, serial, varchar, timestamp, sql } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const users = mysqlTable('users', {
  id: serial().primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  age: int(),
  email: varchar({ length: 100 }).notNull().unique(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow().$onUpdate(() => sql`now()`),
});