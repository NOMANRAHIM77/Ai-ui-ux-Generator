//schema.tsx
import { integer, json, pgTable, varchar,date,text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
id: integer().primaryKey().generatedAlwaysAsIdentity(), 
name: varchar({ length: 255 }).notNull(),
email: varchar({ length: 255 }).notNull().unique(), 
credits:integer().default(5)
});


export const ProjectTable = pgTable('project', {
id: integer().primaryKey().generatedAlwaysAsIdentity(),
 projectId: varchar().notNull(),
 projectName : varchar(),
 theme : varchar(),
userInput: varchar(),
device: varchar(),
createdOn: date('created_on').defaultNow(),
projectVisualDescription:text(),
config:json(),
userId: varchar()
})


export const ScreenConfigTable=pgTable('screenConfig', {
id: integer().primaryKey().generatedAlwaysAsIdentity(),
projectId: varchar().references (() =>ProjectTable.projectId), 
screenId: varchar(),
screenName: varchar(),
purpose: varchar(),
screenDescription:varchar(),
code:text(),})