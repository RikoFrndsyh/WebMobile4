registerSW(); // Memanggil fungsi untuk mendaftarkan service worker saat file dimuat

async function registerSW() {
  if ('serviceWorker' in navigator) { // Mengecek apakah browser mendukung Service Worker
    try {
      const registration = await navigator.serviceWorker.register("sw.js"); // Mendaftarkan file sw.js sebagai service worker
    } catch (error) {
      showResult("Error while registering: " + error.message); // Menampilkan pesan error jika pendaftaran gagal
    }
  } else {
    showResult("Service workers API not available"); // Jika service worker tidak didukung browser
  }
};

function showResult(text) {
  document.querySelector("output").innerHTML = text; // Menampilkan pesan (hasil/error) ke elemen <output> di halaman
}
