import { createCategory } from "@/actions/categories";

export default function NewCategory() {
  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">
        Новая категория
      </h1>

      <form action={createCategory}>
        <input
          type="text"
          name="name"
          placeholder="Название категории"
          className="w-full border rounded-lg p-3 mb-6"
          required
        />

        <button
          className="bg-black text-white px-5 py-3 rounded-lg"
        >
          Создать
        </button>
      </form>
    </div>
  );
}