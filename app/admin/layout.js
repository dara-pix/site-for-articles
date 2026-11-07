import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r p-6">
        <h2 className="text-2xl font-bold mb-8">
          Админка
        </h2>

        <nav className="space-y-3">
          <Link href="/admin" className="block hover:underline">
            🏠 Главная
          </Link>

          <Link href="/admin/posts" className="block hover:underline">
            📝 Статьи
          </Link>

          <Link href="/admin/new" className="block hover:underline">
            ➕ Новая статья
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}