const dbName = "siakad-db";
const dbVersion = 2;
let db;

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
    const request = indexedDB.open(dbName, 2); // Pastikan versi sudah dinaikkan

    request.onerror = () => reject("DB gagal dibuka");

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    // Logika ini sekarang lebih baik
    request.onupgradeneeded = e => {
      const db = e.target.result;
      let store;

      // Jika object store belum ada, buat.
      if (!db.objectStoreNames.contains("matkul")) {
        store = db.createObjectStore("matkul", { keyPath: "kode" });
      } else {
        // Jika sudah ada, ambil referensinya dari transaksi yang sedang berjalan.
        store = e.target.transaction.objectStore("matkul");
      }

      // Bersihkan data lama untuk memastikan data selalu fresh saat upgrade
      store.clear(); 

      // Masukkan data baru dari variabel matkulData
      matkulData.forEach(item => store.add(item));

      console.log("Database upgrade/setup selesai.");
    };
  });
}

function displayMatkul(limit = null) {
  openDB().then(() => {
    const tx = db.transaction("matkul", "readonly");
    const store = tx.objectStore("matkul");
    const request = store.getAll();

    request.onsuccess = () => {
      let data = request.result;
      if (limit !== null) data = data.slice(0, limit);

      const tbody = document.getElementById("matkulBody");
      if (tbody) {
        tbody.innerHTML = "";
        data.forEach(item => {
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
  // Cek halaman
  if (window.location.pathname.includes("beranda.html")) {
    displayMatkul(3); // hanya 3 data di beranda
  } else {
    displayMatkul();  // semua data di matkul.html
  }
});
