function fetchBerita() {
  const apiKey = '34a98c1662134d0eb725485245187849';
  const url = `https://gnews.io/api/v4/top-headlines?category=technology&lang=id&country=id&apikey=${apiKey}`;
  
  fetch(url)
    .then(res => {
      // Periksa jika respons dari jaringan tidak oke (misal: error 404, 500)
      if (!res.ok) {
        // Lemparkan error agar ditangkap oleh blok .catch()
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      // Kosongkan container setelah yakin fetch berhasil
      container.innerHTML = "";

      // ---- KODE PERBAIKAN DIMULAI DI SINI ----

      // 1. Lakukan pengecekan apakah 'data.articles' ada dan merupakan sebuah array
      if (data && data.articles && Array.isArray(data.articles) && data.articles.length > 0) {
        
        const berita = data.articles.slice(0, 3); // Ambil 3 berita pertama

        berita.forEach(item => {
          const card = document.createElement('div');
          // Menambahkan margin bawah agar ada jarak antar kartu
          card.className = "d-flex p-2 bg-light rounded shadow-sm mb-3";

          // 2. Gunakan "Optional Chaining (?.)" dan "Nullish Coalescing (??)" untuk data yang mungkin kosong
          const imageUrl = item.image ?? 'https://via.placeholder.com/120x80.png?text=No+Image';
          const title = item.title?.slice(0, 80) ?? 'Judul tidak tersedia';
          const description = item.description?.slice(0, 100) ?? 'Deskripsi tidak tersedia.';

          card.innerHTML = `
            <div class="d-flex flex-column flex-sm-row w-100">
                <img src="${imageUrl}" alt="${title}" class="rounded me-sm-3 mb-2 mb-sm-0" style="width: 120px; height: 80px; object-fit: cover;">
                <div class="flex-grow-1 text-wrap">
                  <h6 class="fw-semibold mb-1">${title}${item.title && item.title.length > 80 ? '...' : ''}</h6>
                  <p class="small text-muted mb-1">${description}${item.description && item.description.length > 100 ? '...' : ''}</p>
                  <a href="${item.url}" target="_blank" class="small text-decoration-none d-block text-break" style="word-break: break-word;">${item.url}</a>
                </div>
            </div>
          `;

          container.appendChild(card);
        });

      } else {
        // Tampilkan pesan jika tidak ada artikel yang ditemukan
        container.innerHTML = `<div class="text-info">Tidak ada berita yang ditemukan.</div>`;
        console.warn("Tidak ada artikel yang ditemukan atau struktur data tidak sesuai:", data);
      }
      // ---- AKHIR DARI KODE PERBAIKAN ----
    })
    .catch(err => {
      console.error("Gagal memuat berita:", err);
      // Tampilkan pesan error yang lebih informatif di halaman
      container.innerHTML = `<div class="alert alert-danger">Maaf, gagal memuat berita. Silakan coba lagi nanti.</div>`;
    });
}

// Panggil fungsi saat konten halaman selesai dimuat
window.addEventListener('DOMContentLoaded', fetchBerita);
