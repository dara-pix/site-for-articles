import db from "./database.js";

db.exec(`
  ALTER TABLE posts
  ADD COLUMN category TEXT;
`);

console.log("Колонка category добавлена.");