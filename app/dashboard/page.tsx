"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";

interface LinkItem {
  id: string;
  title: string;
  slug: string;
  domain: string;
  url: string;
  click_count: number;
  visibility: "public" | "private";
  favicon_url?: string;
}

export default function Dashboard() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    publicCount: 0,
    privateCount: 0,
    totalClicks: 0,
    topLink: null as LinkItem | null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("links").select("*");

      if (!data) return;

      const total = data.length;
      const publicCount = data.filter(l => l.visibility === "public").length;
      const privateCount = total - publicCount;
      const totalClicks = data.reduce((sum, l) => sum + (l.click_count || 0), 0);

      const topLink = data.sort((a, b) =>
        (b.click_count || 0) - (a.click_count || 0)
      )[0];

      setLinks(data);
      setStats({
        total,
        publicCount,
        privateCount,
        totalClicks,
        topLink,
      });
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link
            href="/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            + Create Link
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Links" value={stats.total} />
          <StatCard label="Public Links" value={stats.publicCount} />
          <StatCard label="Private Links" value={stats.privateCount} />
          <StatCard label="Total Clicks" value={stats.totalClicks} />
        </div>

        {stats.topLink && (
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="font-semibold mb-2">Most Clicked Link</h2>
            <p>{stats.topLink.title}</p>
            <p className="text-sm text-gray-500">
              Clicks: {stats.topLink.click_count || 0}
            </p>
          </div>
        )}

        {/* Link List */}
        <div className="space-y-4">
          {links.map(link => (
  <div key={link.id} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">

    {/* Top Section */}
    <div className="flex items-center justify-between mb-3">

      {/* Title + Favicon */}
      <div className="flex items-center gap-3">
        {link.favicon_url && (
          <Image
            src={link.favicon_url}
            alt="favicon"
            width={24}
            height={24}
          />
        )}
        <h3 className="font-semibold text-lg">{link.title}</h3>
      </div>

      {/* Visibility Badge */}
      <span
        className={`text-xs px-3 py-1 rounded-full ${
          link.visibility === "public"
            ? "bg-green-100 text-green-700"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {link.visibility.toUpperCase()}
      </span>
    </div>

    {/* URL */}
    <div className="flex items-center justify-between">
      <a
        href={link.url}
        target="_blank"
        className="text-indigo-600 text-sm break-all"
      >
        {link.url}
      </a>

      {/* Copy Button */}
      <button
        onClick={() => navigator.clipboard.writeText(link.url)}
        className="ml-3 text-xs bg-indigo-100 px-2 py-1 rounded hover:bg-indigo-200 transition"
      >
        Copy
      </button>
    </div>

    {/* Click Count */}
    <p className="text-xs text-gray-400 mt-3">
      Clicks: {link.click_count || 0}
    </p>
  </div>
))}
        </div>

      </div>
    </main>
  );
}

interface StatCardProps {
  label: string;
  value: number;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}