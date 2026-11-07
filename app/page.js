import Link from "next/link";
import { getAllPosts } from "@/db/posts";
import { getAllCategories } from "@/db/categories";

export default async function Home() {
  const posts = getAllPosts().slice(0, 6);
  const categories = getAllCategories();
  return (
  <main className="max-w-6xl mx-auto py-10 px-6">

    <section className="mb-12">
      <h1 className="text-5xl font-bold mb-4">
        Это не графомания! Все ссылки на источники в конце статей
      </h1>

      <p className="text-gray-600 text-lg max-w-2xl">
        История, наука, технологии, культура, языки и десятки других тем
        Только статьи с проверенными источниками (википедия)
      </p>
    </section>
    <Link
      href="/random"
      className="inline-block mb-8 px-6 py-3 rounded-xl bg-black text-white hover:opacity-90 transition"
    >
      🎲 Удиви меня
    </Link>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">
        Категории
      </h2>

      <div className="flex flex-wrap gap-3">
        {categories.map(category => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="px-4 py-2 border rounded-full hover:bg-black hover:text-white transition"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>

    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          Последние статьи
        </h2>

        <Link
          href="/articles"
          className="text-blue-600"
        >
          Смотреть все →
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {posts.map(post => (

          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="border rounded-xl overflow-hidden hover:shadow-lg transition"
          >

            {post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-52 object-cover"
              />
            )}

            <div className="p-5">

              <h3 className="font-bold text-xl mb-2">
                {post.title}
              </h3>

              <p className="text-gray-600">
                {post.description}
              </p>

            </div>

          </Link>

        ))}

      </div>
    </section>

  </main>
);
}