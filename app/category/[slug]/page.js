import Link from "next/link";
import {
  getCategoryBySlug,
} from "@/db/categories";
import {
  getPostsByCategory,
} from "@/db/posts";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const category = getCategoryBySlug(slug);

  if (!category) {
    return (
      <h1 className="text-3xl font-bold">
        Категория не найдена
      </h1>
    );
  }

  const posts = getPostsByCategory(category.id);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">
        {category.name}
      </h1>

      <p className="text-gray-500 mb-8">
        Статей: {posts.length}
      </p>

      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="overflow-hidden border rounded-xl hover:shadow-lg transition bg-white"
          >
            {post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
            )}

            <div className="p-5">
              <h2 className="text-2xl font-semibold">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-gray-500 text-sm mb-3">
                {post.date}
              </p>

              <p>
                {post.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}