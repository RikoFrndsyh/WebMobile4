self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open("siakad-riko-cache");
    await cache.addAll([
      "/",
      "./index.html",
      "./beranda.html",
      "./matkul.html",
      "./css/style.css",
      "./img/riko.png",
      "./app.js",
      "./matkul-db.js",
      "./berita-api.js",
      "./manifest.json",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    ]);
  })());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => {
        return new Response("Offline dan resource tidak tersedia", { status: 404 });
      })
  );
});

