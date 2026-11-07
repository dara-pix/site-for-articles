import { getCategoryById } from "@/db/categories";
import { updateCategory } from "@/actions/categories";

export default async function EditCategory({ params }) {
  const { id } = await params;
  const category = getCategoryById(id);

  if (!category) {
    return <h1>Категория не найдена</h1>;
  }

  const action = updateCategory.bind(null, category.id);

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">
        Редактирование категории
      </h1>

      <form action={action}>
        <input
          type="text"
          name="name"
          defaultValue={category.name}
          className="w-full border rounded-lg p-3 mb-6"
          required
        />

        <button className="bg-black text-white px-5 py-3 rounded-lg">
          Сохранить
        </button>
      </form>
    </div>
  );
}