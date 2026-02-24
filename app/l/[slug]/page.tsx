import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function PublicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 🔥 unwrap params
  const { slug } = await params;

  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("slug", slug)
    .eq("visibility", "public")
    .single();

  if (!data || error) {
    return notFound();
  }

  await supabase
  .from("links")
  .update({ click_count: (data.click_count || 0) + 1 })
  .eq("id", data.id);


  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-2">{data.title}</h1>

        {data.description && (
          <p className="text-gray-600 mb-4">{data.description}</p>
        )}

        <a
          href={data.url}
          target="_blank"
          className="text-indigo-600 underline"
        >
          Visit Link
        </a>

        <p className="text-sm text-gray-400 mt-4">
          Total Clicks: {data.click_count + 1}
        </p>
      </div>
    </main>
  );
}