import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", browser: "Neo-Internet Explorer 11" });
  });

  // Proxy endpoint to allow browsing any URL without X-Frame-Options restriction
  app.get("/api/proxy", async (req, res) => {
    const targetUrl = req.query.url as string;
    if (!targetUrl) {
      res.status(400).send("URL parameter is required");
      return;
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(targetUrl.startsWith("http") ? targetUrl : `https://${targetUrl}`);
    } catch {
      res.status(400).send("Invalid URL");
      return;
    }

    try {
      const response = await fetch(parsedUrl.toString(), {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Neo-IE/11.0",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
      });

      const contentType = response.headers.get("content-type") || "";

      // If it's an image or binary, stream directly
      if (!contentType.includes("text/html")) {
        const buffer = await response.arrayBuffer();
        res.setHeader("Content-Type", contentType);
        res.send(Buffer.from(buffer));
        return;
      }

      let html = await response.text();

      // Inject base tag so relative resources and stylesheets resolve properly
      const baseHref = `${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname}`;
      const baseTag = `<base href="${baseHref}">`;

      // Inject small navigation helper script to route clicks back through proxy
      const scriptInjector = `
        <script>
          document.addEventListener('click', function(e) {
            var target = e.target.closest('a');
            if (target && target.href && !target.href.startsWith('javascript:')) {
              e.preventDefault();
              window.parent.postMessage({ type: 'ULTRAMARINE_NAVIGATE', url: target.href }, '*');
            }
          });
        </script>
      `;

      if (html.includes("<head>")) {
        html = html.replace("<head>", `<head>${baseTag}${scriptInjector}`);
      } else if (html.includes("<html>")) {
        html = html.replace("<html>", `<html><head>${baseTag}${scriptInjector}</head>`);
      } else {
        html = baseTag + scriptInjector + html;
      }

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.removeHeader("X-Frame-Options");
      res.removeHeader("Content-Security-Policy");
      res.send(html);
    } catch (err: any) {
      res.status(502).send(`
        <div style="font-family: 'Segoe UI', Tahoma, sans-serif; padding: 40px; color: #333; max-width: 600px; margin: auto;">
          <h2 style="color: #0078D7; font-weight: normal; font-size: 24px;">This page can't be displayed</h2>
          <p style="color: #666; font-size: 14px; margin-top: 10px;">Neo-Internet Explorer 11 was unable to connect to <strong>${targetUrl}</strong>.</p>
          <ul style="font-size: 13px; color: #555; line-height: 1.8; margin-top: 20px;">
            <li>Make sure the web address is correct</li>
            <li>Check your network connection</li>
            <li>The remote server might be temporarily unavailable</li>
          </ul>
          <div style="margin-top: 25px;">
            <button onclick="window.location.reload()" style="padding: 6px 16px; background: #0078D7; color: #fff; border: 1px solid #005A9E; cursor: pointer; font-family: inherit;">Fix connection problems</button>
          </div>
        </div>
      `);
    }
  });

  // Search suggestions / autocomplete endpoint
  app.get("/api/suggest", async (req, res) => {
    const q = (req.query.q as string) || "";
    if (!q) {
      res.json([]);
      return;
    }
    // Return sample browser history and search completions
    const defaults = [
      "wikipedia.org",
      "google.com",
      "github.com",
      "news.ycombinator.com",
      "w3schools.com",
      "reddit.com",
      "youtube.com",
      "msn.com",
      "bing.com",
      "archive.org",
      "chrome://version",
      "chrome://flags",
      "chrome://settings",
      "chrome://downloads",
      "about:tabs",
      "about:blank",
    ];
    const filtered = defaults.filter((item) => item.toLowerCase().includes(q.toLowerCase()));
    res.json(filtered);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Ultramarine Explorer server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
