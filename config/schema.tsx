//schema.tsx
import { integer, json, pgTable, varchar,date } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
id: integer().primaryKey().generatedAlwaysAsIdentity(), 
name: varchar({ length: 255 }).notNull(),
email: varchar({ length: 255 }).notNull().unique(), 
credits:integer().default(5)
});


export const ProjectTable = pgTable('project', {
id: integer().primaryKey().generatedAlwaysAsIdentity(),
 projectId: varchar().notNull(),
userInput: varchar(),
device: varchar(),
createdOn: date('created_on').defaultNow(),
config:json(),
userId: varchar()
})