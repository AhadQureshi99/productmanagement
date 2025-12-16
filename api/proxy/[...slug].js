export default async function handler(req, res) {
  const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";
  const slug = req.query.slug || [];
  const path = Array.isArray(slug) ? slug.join("/") : String(slug);
  const query = req.url.split("?")[1] || "";
  const dest = `${BACKEND_URL.replace(/\/$/, "")}/${path}${
    query ? `?${query}` : ""
  }`;

  const headers = { ...req.headers };
  delete headers.host;

  let body = undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    body = Buffer.concat(chunks.length ? chunks : []);
  }

  const forwarded = await fetch(dest, {
    method: req.method,
    headers,
    body,
  });

  res.status(forwarded.status);
  forwarded.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  const out = await forwarded.arrayBuffer();
  res.end(Buffer.from(out));
}
