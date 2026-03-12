/** * SERVICE WORKER - TURBINE LOGSHEET PRO
 * Optimasi: Bypass Cache untuk API Google Script
 */

const APP_VERSION = 'v13'; // Update versi setiap ada perubahan file statis
const CACHE_NAME = `turbine-logsheet-${APP_VERSION}`;

const assets = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json'
];

// --- INSTALL: Simpan UI ke Cache ---
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// --- ACTIVATE: Hapus cache versi lama ---
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
});

// --- FETCH: Logika Cerdas Memilih Sumber Data ---
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // 1. JIKA API (Google Script): Jangan pernah pakai cache
  if (url.hostname === 'script.google.com') {
    e.respondWith(
      fetch(e.request).catch(() => {
        // Jika offline, kembalikan response kosong/error
        return new Response(JSON.stringify({ error: "Offline" }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  // 2. JIKA ASSETS (HTML/CSS/JS): Gunakan Cache-First
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      return cachedResponse || fetch(e.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(e.request, responseToCache);
          });
        }
        return networkResponse;
      });
    })
  );
});
