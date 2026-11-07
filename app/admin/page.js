import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-10">
        Админ-панель
      </h1>

      <div className="grid gap-6">

        <Link
          href="/admin/new"
          className="border rounded-xl p-6 hover:shadow-md transition"
        >
          <h2 className="text-2xl font-semibold">
            ➕ Новая статья
          </h2>

          <p className="text-gray-500 mt-2">
            Создать новую публикацию
          </p>
        </Link>

        <Link
          href="/admin/posts"
          className="border rounded-xl p-6 hover:shadow-md transition"
        >
          <h2 className="text-2xl font-semibold">
            📝 Все статьи
          </h2>

          <p className="text-gray-500 mt-2">
            Посмотреть и редактировать статьи
          </p>
        </Link>

      </div>
    </div>
  );
}