import { redirect } from "next/navigation";
import { getRandomPost } from "@/db/posts";

export default async function RandomPage() {
  const post = getRandomPost();

  if (!post) {
    redirect("/");
  }

  redirect(`/blog/${post.slug}`);

  return null;
}