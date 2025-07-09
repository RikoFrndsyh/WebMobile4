const dbName = "siakad-db"; // Nama database IndexedDB
const dbVersion = 2; // Versi database
let db; // Variabel global untuk menyimpan instance database

// Data awal mata kuliah
const matkulData = [
  { kode: "IF01", nama: "PEMROGRAMAN WEB MOBILE", sks: 2, jadwal: "Kamis, 13:00" },
  { kode: "IF02", nama: "FRAMEWORK WEB", sks: 3, jadwal: "Senin, 10:00" },
  { kode: "IF03", nama: "BAHASA INGGRIS 4", sks: 2, jadwal: "Rabu, 10:00" },
  { kode: "IF04", nama: "REKAYASA PERANGKAT LUNAK", sks: 2, jadwal: "Senin, 08:00" },
  { kode: "IF05", nama: "WORKSHOP", sks: 1, jadwal: "Selasa, 13:00" },
  { kode: "IF06", nama: "BIG DATA ANALYTICS", sks: 3, jadwal: "Jumat, 10:00" }
];

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 2); // Membuka atau membuat database versi 2

    request.onerror = () => reject("DB gagal dibuka"); // Jika gagal membuka database

    request.onsuccess = () => {
      db = request.result; // Simpan instance database
      resolve(db); // Resolve promise
    };

    request.onupgradeneeded = e => { // Trigger saat versi DB lebih tinggi dari versi lama
      const db = e.target.result;
      let store;

      // Jika object store belum ada, buat baru
      if (!db.objectStoreNames.contains("matkul")) {
        store = db.createObjectStore("matkul", { keyPath: "kode" });
      } else {
        // Jika sudah ada, ambil referensinya dari transaksi saat ini
        store = e.target.transaction.objectStore("matkul");
      }

      store.clear(); // Bersihkan data lama agar data tetap fresh

      // Tambahkan data mata kuliah ke dalam object store
      matkulData.forEach(item => store.add(item));

      console.log("Database upgrade/setup selesai.");
    };
  });
}

function displayMatkul(limit = null) {
  openDB().then(() => {
    const tx = db.transaction("matkul", "readonly"); // Buat transaksi baca saja
    const store = tx.objectStore("matkul"); // Ambil object store
    const request = store.getAll(); // Ambil semua data

    request.onsuccess = () => {
      let data = request.result;
      if (limit !== null) data = data.slice(0, limit); // Batasi jumlah data jika perlu

      const tbody = document.getElementById("matkulBody"); // Elemen <tbody> tempat menampilkan data
      if (tbody) {
        tbody.innerHTML = ""; // Bersihkan isi sebelumnya
        data.forEach(item => {
          // Tambahkan baris tabel baru untuk setiap data mata kuliah
          tbody.innerHTML += `
            <tr>
              <td>${item.kode}</td>
              <td>${item.nama}</td>
              <td>${item.sks}</td>
              <td>${item.jadwal}</td>
            </tr>
          `;
        });
      }
    };
  });
}

window.addEventListener("DOMContentLoaded", () => {
  // Saat halaman sudah dimuat
  if (window.location.pathname.includes("beranda.html")) {
    displayMatkul(3); // Tampilkan hanya 3 data untuk halaman beranda
  } else {
    displayMatkul(); // Tampilkan semua data untuk halaman matkul.html
  }
});
