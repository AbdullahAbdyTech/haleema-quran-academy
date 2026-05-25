const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".webp": "image/webp",
};

const send = (response, status, body, contentType = "text/plain; charset=utf-8") => {
  response.writeHead(status, { "Content-Type": contentType });
  response.end(body);
};

const resolveFilePath = (pathname) => {
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const decodedPath = decodeURIComponent(requestedPath);
  const filePath = path.normalize(path.join(root, decodedPath));
  const safeRoot = `${root}${path.sep}`;

  if (filePath !== root && !filePath.startsWith(safeRoot)) {
    return null;
  }

  return filePath;
};

const server = http.createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url, `http://${request.headers.host || "localhost"}`);
    let filePath = resolveFilePath(requestUrl.pathname);

    if (!filePath) {
      send(response, 403, "Forbidden");
      return;
    }

    const stats = await fs.stat(filePath).catch(() => null);

    if (stats?.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    const extension = path.extname(filePath).toLowerCase();
    const content = await fs.readFile(filePath);

    response.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream",
      "Cache-Control": extension === ".html" ? "no-cache" : "public, max-age=3600",
    });
    response.end(content);
  } catch (error) {
    if (error.code === "ENOENT") {
      send(response, 404, "Not Found");
      return;
    }

    send(response, 500, "Server Error");
  }
});

server.listen(port, () => {
  console.log(`Haleema Quran Academy site running at http://localhost:${port}`);
});
