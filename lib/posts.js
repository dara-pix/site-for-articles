import {
  getAllPosts as dbGetAllPosts,
  getPostBySlug as dbGetPostBySlug,
} from "@/db/posts";

export function getAllPosts() {
  return dbGetAllPosts();
}

export function getPostBySlug(slug) {
  return dbGetPostBySlug(decodeURIComponent(slug));
}