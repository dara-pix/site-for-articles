import { createPost } from "@/actions/posts";
import PostForm from "@/app/components/PostForm";
import { getAllCategories } from "@/db/categories";

export default function NewPost() {
  const categories = getAllCategories();
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">
        Новая статья
      </h1>

      <PostForm
        action={createPost}
        categories={categories}
      />
    </div>
  );
}