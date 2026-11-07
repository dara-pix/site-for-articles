import db from "./database.js";

export function getAllCategories() {
  return db
    .prepare(`
      SELECT *
      FROM categories
      ORDER BY name
    `)
    .all();
}

export function getCategoryById(id) {
  return db
    .prepare(`
      SELECT *
      FROM categories
      WHERE id = ?
    `)
    .get(id);
}

export function createCategory(category) {
  db.prepare(`
    INSERT INTO categories (
      name,
      slug
    )
    VALUES (?, ?)
  `).run(
    category.name,
    category.slug
  );
}

export function updateCategory(category) {
  db.prepare(`
    UPDATE categories
    SET
      name = ?,
      slug = ?
    WHERE id = ?
  `).run(
    category.name,
    category.slug,
    category.id
  );
}

export function deleteCategory(id) {
  db.prepare(`
    DELETE FROM categories
    WHERE id = ?
  `).run(id);
}

export function getCategoryBySlug(slug) {
  return db
    .prepare(`
      SELECT *
      FROM categories
      WHERE slug = ?
    `)
    .get(slug);
}