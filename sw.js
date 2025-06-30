// A more robust install event listener for debugging

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open("siakad-riko-cache");
    const urlsToCache = [
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
    ];

    // Instead of cache.addAll, we add them one by one
    for (const url of urlsToCache) {
      try {
        await cache.add(url);
      } catch (err) {
        console.error(`Gagal menyimpan cache untuk URL: ${url}`, err);
        // If one file fails, you might want to stop the whole process
        // by re-throwing the error, or just log it and continue.
      }
    }
  })());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
