function fetchBerita() {
  const apiKey = '34a98c1662134d0eb725485245187849'; // API key dari gnews.io
  const url = `https://gnews.io/api/v4/top-headlines?category=technology&lang=id&country=id&apikey=${apiKey}`; // URL endpoint API berita

  fetch(url) // Mengirim request ke API
    .then(res => res.json()) // Mengubah response ke format JSON
    .then(data => {
      const container = document.getElementById('beritaList'); // Ambil elemen untuk menampilkan daftar berita
      container.innerHTML = ""; // Kosongkan kontainer sebelum menampilkan berita baru

      const berita = data.articles.slice(0, 3); // Ambil 3 berita pertama dari hasil API
      berita.forEach(item => {
        const card = document.createElement('div'); // Buat elemen div baru untuk setiap berita
        card.className = "d-flex p-2 bg-light rounded shadow-sm"; // Tambahkan styling Bootstrap

        card.innerHTML = `
        <div class="d-flex flex-column flex-sm-row w-100">
            <img src="${item.image}" alt="${item.title}" class="rounded me-sm-3 mb-2 mb-sm-0" style="width: 120px; height: 80px; object-fit: cover;"> <!-- Gambar thumbnail berita -->
            <div class="flex-grow-1 text-wrap">
            <h6 class="fw-semibold mb-1">${item.title.slice(0, 80)}...</h6> <!-- Judul berita dipotong -->
            <p class="small text-muted mb-1">${item.description.slice(0, 100)}...</p> <!-- Deskripsi berita dipotong -->
            <a href="${item.url}" target="_blank" class="small text-decoration-none d-block text-break" style="word-break: break-word;">${item.url}</a> <!-- Tautan ke berita asli -->
            </div>
        </div>
        `;

        container.appendChild(card); // Tambahkan elemen berita ke dalam kontainer
      });
    })
    .catch(err => {
      console.error("Gagal memuat berita:", err); // Tampilkan error jika gagal memuat berita
      document.getElementById('beritaList').innerHTML = `<div class="text-danger">Gagal memuat berita dari API.</div>`; // Pesan fallback ke pengguna
    });
}

window.addEventListener('DOMContentLoaded', fetchBerita); // Jalankan fungsi fetchBerita saat halaman selesai dimuat
