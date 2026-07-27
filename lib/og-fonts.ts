const FONT_CACHE = new Map<string, Promise<ArrayBuffer>>();

async function fetchGoogleFont(query: string, text: string): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${query}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(cssUrl)).text();

  const match = css.match(/src: url\(([^)]+)\) format\('(opentype|truetype|woff2?)'\)/);
  if (!match) {
    throw new Error(`Could not find font source for query: ${query}`);
  }

  const response = await fetch(match[1]);
  if (!response.ok) {
    throw new Error(`Failed to download font asset: ${match[1]}`);
  }
  return response.arrayBuffer();
}

/**
 * Loads a subsetted Google Font (as ttf/otf bytes) for use with next/og's
 * ImageResponse (Satori), which cannot load system or @font-face fonts.
 */
export function loadGoogleFont(query: string, text: string): Promise<ArrayBuffer> {
  const key = `${query}::${text}`;
  let cached = FONT_CACHE.get(key);
  if (!cached) {
    cached = fetchGoogleFont(query, text);
    FONT_CACHE.set(key, cached);
  }
  return cached;
}
