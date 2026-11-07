import Link from "next/link";
import { getAllPosts, searchPosts } from "@/db/posts";
import { deletePost } from "@/actions/posts";

export default async function AdminPosts({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || "";

  const posts = query
    ? searchPosts(query)
    : getAllPosts();
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">
        Все статьи
      </h1>
      <form method="GET" className="mb-6">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Поиск по статьям..."
          className="w-full border rounded-lg px-4 py-3"
        />
      </form>

      <div className="space-y-4">

  <Link
    href="/admin/new"
    className="inline-block border rounded-lg px-4 py-2 hover:bg-gray-100"
  >
    + Новая статья
  </Link>

  

  {posts.length === 0 ? (
    <p className="text-gray-500">
      По вашему запросу ничего не найдено.
    </p>
  ) : (
    posts.map((post) => (
    <div
      key={post.slug}
      className="border rounded-lg p-5 flex justify-between items-center"
    >
      <div className="flex gap-4 items-start">
        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-36 h-24 object-cover rounded-lg"
          />
        )}

        <div>
          <h2 className="text-2xl font-semibold">
            {post.title}
          </h2>

          <p className="text-gray-500">
            {post.date}
          </p>

          <p className="mt-2">
            {post.description}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Link
            href={`/admin/edit/${post.slug}`}
            className="border rounded px-3 py-1 hover:bg-gray-100"
        >
            ✏️
        </Link>
        <form
          action={async () => {
            "use server";
            await deletePost(post.slug);
          }}
        >
          <button
            className="border rounded px-3 py-1 hover:bg-red-100"
            type="submit"
          >
            🗑️
          </button>
        </form>
      </div>
    </div>
  ))
  )}

</div>
    </div>
  );
}