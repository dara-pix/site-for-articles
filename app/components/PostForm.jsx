"use client";
import { useRef, useState } from "react";
import { uploadContentImage } from "@/actions/posts";

export default function PostForm({
  action,
  post = {},
  categories = [],
}) {
  const textareaRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  async function handleImageUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const imagePath = await uploadContentImage(formData);

      const textarea = textareaRef.current;

      if (!textarea) return;

      const markdown = `![${file.name}](${imagePath})`;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      textarea.setRangeText(
        markdown,
        start,
        end,
        "end"
      );

      textarea.focus();
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <form action={action} className="space-y-6">

      <div>
        <label className="block mb-2 font-semibold">
          Заголовок
        </label>

        <input
          name="title"
          type="text"
          defaultValue={post.title}
          className="w-full border rounded-lg p-3"
          placeholder="Введите заголовок..."
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">
          Описание
        </label>

        <textarea
          name="description"
          rows={3}
          defaultValue={post.description}
          className="w-full border rounded-lg p-3"
          placeholder="Краткое описание статьи..."
        />
      </div>

      {post?.cover_image && (
        <img
          src={post.cover_image}
          alt={post.title}
          className="w-64 rounded-lg mb-4"
        />
      )}

      <div>
        <label className="block mb-2 font-medium">
          Обложка
        </label>

        <input
          type="file"
          name="coverImage"
          accept="image/*"
          className="w-full border rounded-lg p-2"
        />
        
        <input
          type="hidden"
          name="existingCoverImage"
          defaultValue={post?.cover_image || ""}
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">
          Категория
        </label>

        <select
          name="categoryId"
          defaultValue={post.category_id || ""}
          className="w-full border rounded-lg p-3"
        >
          <option value="">
            Без категории
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 font-semibold">
          Текст статьи
        </label>

        <div className="mb-3 rounded-lg border bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold text-gray-800 mb-2">
            Как оформлять текст:
          </p>

          <div className="space-y-1">
            <p><code>**текст**</code> — <strong>жирный текст</strong></p>
            <p><code>*текст*</code> — <em>курсив</em></p>
            <p><code>## текст</code> — заголовок</p>
            <p><code>### текст</code> — подзаголовок</p>
            <p><code>- текст</code> — маркированный список</p>
            <p><code>1. текст</code> — нумерованный список</p>
            <p><code>&gt; текст</code> — цитата</p>
            <p><code>[текст](ссылка)</code> — ссылка</p>
            <p><code>---</code> — разделитель</p>
            <p><code>![описание](путь)</code> — изображение</p>
          </div>

          <p className="mt-3">
            🖼️ Для загрузки изображения используй кнопку
            «Вставить изображение» — оно автоматически вставится
            в место курсора.
          </p>
        </div>

        <textarea
          ref={textareaRef}
          name="content"
          rows={18}
          defaultValue={post.content}
          className="w-full border rounded-lg p-3 font-mono"
          placeholder="Пишите Markdown..."
        />
        <div className="flex items-center gap-4">
          <label className="border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-100">
            {uploading ? "Загрузка..." : "🖼️ Вставить изображение"}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>

          <span className="text-sm text-gray-500">
            Картинка вставится в место курсора
          </span>
        </div>
      </div>

      <button
        type="submit"
        className="border rounded-lg px-6 py-3 hover:bg-gray-100"
      >
        💾 Сохранить
      </button>

    </form>
  );
}