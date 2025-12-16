export default async function handler(req, res) {
  const BACKEND_URL = process.env.BACKEND_URL;
  if (!BACKEND_URL) {
    return res.status(500).json({
      error:
        "BACKEND_URL environment variable not set. Add it to Vercel project settings.",
    });
  }

  const url = `${BACKEND_URL}/api/products`;
  const headers = { ...req.headers };
  delete headers.host;

  let body = undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    body = Buffer.concat(chunks.length ? chunks : []);
  }

  const forwarded = await fetch(url, {
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
