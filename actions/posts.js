"use server";

import {
  createPost as dbCreatePost,
  updatePost as dbUpdatePost,
  deletePost as dbDeletePost,
} from "@/db/posts";

import { redirect } from "next/navigation";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";


export async function createPost(formData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const content = formData.get("content");
  const coverImage = formData.get("coverImage");
  const categoryId = formData.get("categoryId");
  console.log(coverImage);
  console.log(coverImage?.name);
  console.log(coverImage?.size);

  let coverImagePath = "";

  if (coverImage && coverImage.size > 0) {
    const bytes = await coverImage.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const extension = coverImage.name.split(".").pop();
    const fileName = `${uuid()}.${extension}`;

    const uploadPath = path.join(
      process.cwd(),
      "public",
      "uploads",
      fileName
    );
  console.log(uploadPath);

  fs.writeFileSync(uploadPath, buffer);

  coverImagePath = `/uploads/${fileName}`;
}

  const slug = title
    .toLowerCase()
    .replace(/[^a-zа-я0-9\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-");

  const now = new Date().toISOString();

  dbCreatePost({
    title,
    slug,
    description,
    content,
    published: 1,
    created_at: now,
    updated_at: now,
    cover_image: coverImagePath,
    category_id: formData.get("categoryId") || null,
  });

  redirect("/admin/posts");
}

export async function updatePost(slug, formData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const content = formData.get("content");
  const categoryId = formData.get("categoryId");
  const coverImage = formData.get("coverImage");
  

  let coverImagePath = formData.get("existingCoverImage");

  if (coverImage && coverImage.size > 0) {
    const bytes = await coverImage.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const extension = coverImage.name.split(".").pop();
    const fileName = `${uuid()}.${extension}`;

    const uploadPath = path.join(
      process.cwd(),
      "public",
      "uploads",
      fileName
    );

    fs.writeFileSync(uploadPath, buffer);

    coverImagePath = `/uploads/${fileName}`;
  }

  const now = new Date().toISOString();

  dbUpdatePost({
    title,
    slug,
    description,
    content,
    category_id: categoryId || null,
    cover_image: coverImagePath,
    published: 1,
    updated_at: now,
  });

  redirect("/admin/posts");
}

export async function deletePost(slug) {
  dbDeletePost(slug);

  redirect("/admin/posts");
}

export async function uploadContentImage(formData) {
  const image = formData.get("image");

  if (!image || image.size === 0) {
    throw new Error("Изображение не выбрано");
  }

  if (!image.type.startsWith("image/")) {
    throw new Error("Можно загружать только изображения");
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const extension = image.name.split(".").pop();

  const fileName = `${uuid()}.${extension}`;

  const uploadPath = path.join(
    process.cwd(),
    "public",
    "uploads",
    fileName
  );

  fs.writeFileSync(uploadPath, buffer);

  return `/uploads/${fileName}`;
}