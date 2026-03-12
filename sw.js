/**
 * SERVICE WORKER - TURBINE LOGSHEET PRO
 * Strategi: Stale-While-Revalidate
 */

// 1. IDENTITAS CACHE (Ubah v8 ke v9 jika ada update besar)
const APP_VERSION = 'v11';
const CACHE_NAME = `turbine-logsheet-${APP_VERSION}`;

// 2. DAFTAR ASSETS (Wajib memasukkan app.js agar aplikasi tidak blank saat offline)
const assets = [
  './',
  './index.html',
  './style.css',
  './app.js',         // File logika baru Anda
  './manifest.json'
];

// --- EVENT: INSTALL ---
// Menyimpan file inti ke dalam cache HP
self.addEventListener('install', e => {
  self.skipWaiting(); // Langsung aktifkan SW baru tanpa menunggu tab ditutup
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('SW: Membungkus assets ke dalam cache...');
      return cache.addAll(assets);
    })
  );
});

// --- EVENT: ACTIVATE ---
// Membersihkan sampah cache versi lama agar memori HP tidak penuh
self.addEventListener('activate', e => {
  e.waitUntil(
    clients.claim().then(() => {
      return caches.keys().then(keys => {
        return Promise.all(
          keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
        );
      });
    })
  );
});

// --- EVENT: FETCH ---
// Logika pengambilan data: Ambil dari Cache dulu (cepat), lalu update dari Internet
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      
      const fetchPromise = fetch(e.request).then(networkResponse => {
        // Hanya simpan respon yang valid ke cache
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(e.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Jika internet mati dan file tidak ada di cache (offline error)
        console.log('SW: Sedang Offline & file tidak ditemukan di cache.');
      });

      // Tampilkan cache dulu (supaya cepat), kalau tidak ada baru ambil hasil fetch internet
      return cachedResponse || fetchPromise;
    })
  );
});
