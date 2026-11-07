import db from "./database.js";

db.exec(`
  ALTER TABLE posts
  ADD COLUMN category_id INTEGER;
`);

console.log("Колонка category_id добавлена.");