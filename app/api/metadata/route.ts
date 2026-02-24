import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const metadata_title = $("title").text() || null;

    const favicon =
      $("link[rel='icon']").attr("href") ||
      $("link[rel='shortcut icon']").attr("href") ||
      null;

    const domain = new URL(url).hostname;

    return NextResponse.json({
      metadata_title,
      favicon_url: favicon,
      domain,
    });
  } catch{
    return NextResponse.json(
      { error: "Failed to fetch metadata" },
      { status: 500 }
    );
  }
}