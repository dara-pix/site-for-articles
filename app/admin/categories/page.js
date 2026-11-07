import Link from "next/link";
import { getAllCategories } from "@/db/categories";
import { removeCategory } from "@/actions/categories";

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Категории
        </h1>

        <Link
          href="/admin/categories/new"
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          + Добавить
        </Link>
      </div>

      <div className="space-y-3">
        {categories.map(category => {
          const deleteAction = removeCategory.bind(null, category.id);

          return (
          <div
            key={category.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <span>{category.name}</span>

            <div className="flex gap-4">
              <Link
                  href={`/admin/categories/${category.id}`}
                  className="text-blue-600"
              >
                  Изменить
              </Link>

              <form action={deleteAction}>
                <button className="text-red-600 hover:underline">
                    Удалить
                </button>
            </form>
          </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}