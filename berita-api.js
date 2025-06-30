function fetchBerita() {
  const apiKey = '34a98c1662134d0eb725485245187849'; // Ganti dengan API key aslimu dari gnews.io
  const url = `https://gnews.io/api/v4/top-headlines?category=technology&lang=id&country=id&apikey=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('beritaList');
      container.innerHTML = "";

      const berita = data.articles.slice(0, 3); // Ambil 3 berita pertama
      berita.forEach(item => {
        const card = document.createElement('div');
        card.className = "d-flex p-2 bg-light rounded shadow-sm";

        card.innerHTML = `
        <div class="d-flex flex-column flex-sm-row w-100">
            <img src="${item.image}" alt="${item.title}" class="rounded me-sm-3 mb-2 mb-sm-0" style="width: 120px; height: 80px; object-fit: cover;">
            <div class="flex-grow-1 text-wrap">
            <h6 class="fw-semibold mb-1">${item.title.slice(0, 80)}...</h6>
            <p class="small text-muted mb-1">${item.description.slice(0, 100)}...</p>
            <a href="${item.url}" target="_blank" class="small text-decoration-none d-block text-break" style="word-break: break-word;">${item.url}</a>
            </div>
        </div>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Gagal memuat berita:", err);
      document.getElementById('beritaList').innerHTML = `<div class="text-danger">Gagal memuat berita dari API.</div>`;
    });
}

window.addEventListener('DOMContentLoaded', fetchBerita);
