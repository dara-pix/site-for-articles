import db from "./database.js";

export function getAllPosts() {
  return db
    .prepare(`
      SELECT
          posts.*,
          categories.name AS category_name,
          categories.slug AS category_slug
      FROM posts
      LEFT JOIN categories
      ON posts.category_id = categories.id
      ORDER BY posts.created_at DESC
    `)
    .all();
}

export function searchPosts(query) {
  return db
    .prepare(`
      SELECT *
      FROM posts
      WHERE title LIKE ?
         OR description LIKE ?
      ORDER BY created_at DESC
    `)
    .all(`%${query}%`, `%${query}%`);
}

export function getPostBySlug(slug) {
  return db
    .prepare(`
      SELECT
          posts.*,
          categories.name AS category_name,
          categories.slug AS category_slug
      FROM posts
      LEFT JOIN categories
      ON posts.category_id = categories.id
      WHERE posts.slug = ?
    `)
    .get(slug);
}

export function createPost(post) {
  db.prepare(`
    INSERT INTO posts (
      title,
      slug,
      description,
      content,
      published,
      created_at,
      updated_at,
      cover_image,
      category_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    post.title,
    post.slug,
    post.description,
    post.content,
    post.published,
    post.created_at,
    post.updated_at,
    post.cover_image,
    post.category_id,
  );
}

export function updatePost(post) {
  db.prepare(`
    UPDATE posts
    SET
      title = ?,
      description = ?,
      content = ?,
      updated_at = ?,
      published = ?,
      cover_image = ?,
      category_id = ?
    WHERE slug = ?
  `).run(
    post.title,
    post.description,
    post.content,
    post.updated_at,
    post.published,
    post.cover_image,
    post.category_id,
    post.slug
  );
}

export function deletePost(slug) {
  db.prepare(`
    DELETE FROM posts
    WHERE slug = ?
  `).run(slug);
}

export function getPostsByCategory(categoryId) {
  return db
    .prepare(`
      SELECT
        posts.*,
        categories.name AS category_name,
        categories.slug AS category_slug
      FROM posts
      LEFT JOIN categories
        ON posts.category_id = categories.id
      WHERE posts.category_id = ?
      ORDER BY created_at DESC
    `)
    .all(categoryId);
}

export function getRandomPost() {
  return db
    .prepare(`
      SELECT slug
      FROM posts
      WHERE published = 1
      ORDER BY RANDOM()
      LIMIT 1
    `)
    .get();
}