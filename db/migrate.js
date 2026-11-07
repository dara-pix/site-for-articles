import db from "./database.js";

db.exec(`
ALTER TABLE posts
ADD COLUMN cover_image TEXT;
`);

console.log("Колонка добавлена");