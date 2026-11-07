import db from "./database.js";

console.log(
  db.prepare("SELECT title, cover_image FROM posts").all()
);