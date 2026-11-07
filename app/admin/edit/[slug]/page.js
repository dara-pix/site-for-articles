import { notFound } from "next/navigation";
import { getPostBySlug } from "@/db/posts";
import { getAllCategories } from "@/db/categories";
import PostForm from "@/app/components/PostForm";
import { updatePost } from "@/actions/posts";

export default async function EditPost({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const post = getPostBySlug(decodedSlug);
  const categories = getAllCategories();

  if (!post) {
    notFound();
  }

  async function action(formData) {
    "use server";
    await updatePost(decodedSlug, formData);
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">
        Редактирование статьи
      </h1>

      <PostForm
        post={post}
        action={action}
        categories={categories}
      />
    </div>
  );
}