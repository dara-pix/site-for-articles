import db from "./database.js";

const stmt = db.prepare(`
INSERT INTO categories (name, slug)
VALUES (?, ?)
`);

const categories = [
  ["Путешествия", "travel"],
  ["Учёба", "study"],
  ["Программирование", "programming"],
  ["Личное", "personal"],
  ["TentGuard", "tentguard"],
];

for (const category of categories) {
  try {
    stmt.run(...category);
  } catch {}
}

console.log("Категории добавлены.");