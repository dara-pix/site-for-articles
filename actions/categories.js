"use server";

import { redirect } from "next/navigation";
import {
  createCategory as dbCreateCategory,
  updateCategory as dbUpdateCategory,
  deleteCategory as dbDeleteCategory,
} from "@/db/categories";

export async function createCategory(formData) {
  const name = formData.get("name");

  const slug = name
    .toLowerCase()
    .replace(/[^a-zа-я0-9\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-");

  dbCreateCategory({
    name,
    slug,
  });

  redirect("/admin/categories");
}

export async function updateCategory(id, formData) {
  const name = formData.get("name");

  const slug = name
    .toLowerCase()
    .replace(/[^a-zа-я0-9\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-");

  dbUpdateCategory({
    id,
    name,
    slug,
  });

  redirect("/admin/categories");
}

export async function removeCategory(id) {
  dbDeleteCategory(id);

  redirect("/admin/categories");
}