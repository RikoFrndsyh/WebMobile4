self.addEventListener("install", event => { // Event listener saat service worker di-install
  event.waitUntil((async () => {
    const cache = await caches.open("siakad-riko-cache"); // Membuka cache dengan nama "siakad-riko-cache"
    try {
      await cache.addAll([ // Menyimpan seluruh aset ke dalam cache (pre-cache)
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
      "./offline.html", // Halaman offline yang akan ditampilkan saat tidak ada koneksi
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css", // Bootstrap CSS dari CDN
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js" // Bootstrap JS dari CDN
    ]);
    } catch (err) {
      console.error("Gagal menyimpan cache:", err); // Menampilkan pesan error jika gagal menyimpan cache
    }
  })());
});


self.addEventListener("fetch", event => { // Event listener untuk setiap permintaan jaringan (fetch)
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request); // Jika ada di cache, kembalikan dari cache. Jika tidak, ambil dari jaringan
    }).catch(() => {
      // Jika request HTML dan gagal (misal: sedang offline)
      if (event.request.mode === 'navigate') {
        return caches.match("/offline.html"); // Tampilkan halaman offline sebagai fallback
      }
    })
  );
});
