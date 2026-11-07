import Link from "next/link";
import { getAllPosts, searchPosts } from "@/db/posts";

const posts = [
  {
    id: 1,
    title: "Почему я решила кодить",
    description: "Опоздала?"
  },
  {
    id: 2,
    title: "Как я изучаю программирование",
    description: "Что помогает не бросить обучение"
  },
  {
    id: 3,
    title: "Мои заметки об 11 классе",
    description: "Подготовка к поступлению и жизнь"
  }
];

export default async function Blog({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || "";

  const posts = query
    ? searchPosts(query)
    : getAllPosts();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Статьи</h1>
      <form method="GET" className="mb-8">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Поиск статей..."
          className="w-full border rounded-lg px-4 py-3"
        />
      </form>
      <div className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-gray-500">
            По вашему запросу ничего не найдено.
          </p>
        ) : (
          posts.map((post) => (
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

              {post.category_name && (
                <Link
                  href={`/category/${post.category_slug}`}
                  className="inline-block mb-2 rounded-full bg-stone-200 px-3 py-1 text-sm font-medium text-stone-700 hover:bg-stone-300 transition"
                >
                  {post.category_name}
                </Link>
              )}

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
          ))
        )}
      </div>
    </div>
  );
}