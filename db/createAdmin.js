import Database from "better-sqlite3";
import bcrypt from "bcrypt";
import path from "path";

const db = new Database(
  path.join(process.cwd(), "db", "blog.db")
);

const username = "admin";
const password = "123456"; // временный пароль

const hash = await bcrypt.hash(password, 10);

db.prepare(`
  INSERT INTO users (
    username,
    password,
    role,
    created_at
  )
  VALUES (?, ?, ?, ?)
`).run(
  username,
  hash,
  "owner",
  new Date().toISOString()
);

console.log("Администратор создан.");