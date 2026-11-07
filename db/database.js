import Database from "better-sqlite3";
import path from "path";

const db = new Database(
  path.join(process.cwd(), "db", "blog.db")
);

export default db;