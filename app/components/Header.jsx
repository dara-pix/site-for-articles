import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <nav className="max-w-6xl mx-auto flex justify-between items-center p-5">
        <Link href="/" className="font-bold text-xl">
          Перо
        </Link>

        <div className="flex gap-6">
          <Link href="/">Главная</Link>
          <Link href="/blog">Статьи</Link>
          <Link href="/projects">Проекты</Link>
          <Link href="/about">Обо мне</Link>
          <Link href="/contacts">Контакты</Link>
          <Link
            href="/admin"
            className="text-sm text-gray-500 hover:text-black transition"
          >
            Админка
          </Link>
        </div>
      </nav>
    </header>
  );
}