import { notFound } from "next/navigation";
import { getPostBySlug } from "@/db/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function Post({ params }) {
  const { slug } = await params;

  const post = getPostBySlug(decodeURIComponent(slug));

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-10">
      {post.cover_image && (
        <img
          src={post.cover_image}
          alt={post.title}
          className="w-full rounded-xl mb-8 object-cover max-h-[500px]"
        />
      )}
      {post.category_name && (
        <span className="inline-block mb-4 rounded-full bg-stone-200 px-3 py-1 text-sm font-medium text-stone-700">
          {post.category_name}
        </span>
      )}

      <h1 className="text-5xl font-bold mb-4">
        {post.title}
      </h1>

      <p className="text-gray-500 mb-8">
        {new Date(post.created_at).toLocaleDateString("ru-RU")}
      </p>

      <div className="max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }) => (
              <h2 className="text-3xl font-bold mt-10 mb-4">
                {children}
              </h2>
            ),

            h3: ({ children }) => (
              <h3 className="text-2xl font-semibold mt-8 mb-3">
                {children}
              </h3>
            ),

            p: ({ children }) => (
              <p className="text-lg leading-8 mb-5">
                {children}
              </p>
            ),

            ul: ({ children }) => (
              <ul className="list-disc pl-6 mb-6 space-y-2">
                {children}
              </ul>
            ),

            ol: ({ children }) => (
              <ol className="list-decimal pl-6 mb-6 space-y-2">
                {children}
              </ol>
            ),

            li: ({ children }) => (
              <li className="text-lg leading-7">
                {children}
              </li>
            ),

            blockquote: ({ children }) => (
              <blockquote className="border-l-4 pl-5 my-6 italic text-gray-600">
                {children}
              </blockquote>
            ),

            a: ({ href, children }) => (
              <a
                href={href}
                className="underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),

            hr: () => (
              <hr className="my-10" />
            ),

            table: ({ children }) => (
              <div className="overflow-x-auto my-8">
                <table className="w-full border-collapse text-left">
                  {children}
                </table>
              </div>
            ),

            thead: ({ children }) => (
              <thead className="border-b-2">
                {children}
              </thead>
            ),

            th: ({ children }) => (
              <th className="px-4 py-3 font-semibold">
                {children}
              </th>
            ),

            td: ({ children }) => (
              <td className="border-b px-4 py-3">
                {children}
              </td>
            ),

            pre: ({ children }) => (
              <pre className="bg-gray-100 rounded-xl p-5 overflow-x-auto my-6">
                {children}
              </pre>
            ),

            code: ({ children }) => (
              <code className="font-mono text-sm">
                {children}
              </code>
            ),

            strong: ({ children }) => (
              <strong className="font-bold">
                {children}
              </strong>
            ),

            img: ({ src, alt }) => (
              <img
                src={src}
                alt={alt || ""}
                className="w-full max-h-[600px] object-contain rounded-xl my-8"
              />
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}