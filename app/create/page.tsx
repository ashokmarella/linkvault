"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function CreateLink() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    setLoading(true);
    setMessage("");

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      setMessage("You must be logged in.");
      setLoading(false);
      return;
    }

    try {
      // 🔥 Call server-side API for metadata
      const metadataResponse = await fetch("/api/metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const metadata = await metadataResponse.json();

      const { error } = await supabase.from("links").insert([
        {
          user_id: userData.user.id,
          title,
          description,
          url,
          visibility,
          slug: crypto.randomUUID(),
          metadata_title: metadata.metadata_title || null,
          domain: metadata.domain || null,
          favicon_url: metadata.favicon_url || null,
        },
      ]);

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("✅ Link created successfully!");
        router.push("/dashboard");
      }
    } catch{
      setMessage("Something went wrong while creating link.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create New Link 🔗
        </h1>

        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          className="w-full border p-2 rounded mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="URL"
          className="w-full border p-2 rounded mb-4"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded mb-4"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>

        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          {loading ? "Creating..." : "Create Link"}
        </button>

        {message && (
          <p className="mt-4 text-sm text-center text-red-500">{message}</p>
        )}
      </div>
    </main>
  );
}