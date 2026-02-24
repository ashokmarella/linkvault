import * as cheerio from "cheerio";

export async function fetchMetadata(url: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const metadata_title = $("title").text() || null;

    const favicon =
      $("link[rel='icon']").attr("href") ||
      $("link[rel='shortcut icon']").attr("href") ||
      null;

    const domain = new URL(url).hostname;

    return {
      metadata_title,
      favicon_url: favicon,
      domain,
    };
  } catch {
    return {
      metadata_title: null,
      favicon_url: null,
      domain: null,
    };
  }
}