const CACHE_NAME = "fstore-pro-v1";
const ASSETS_TO_CACHE = [
    "./",
    "./index.html",
    "./admin.html",
    "./delivery.html",
    "https://cdn.tailwindcss.com",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
    "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
];

// 1. Install Event (Files ko cache me store karna)
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching App Shell...");
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// 2. Fetch Event (Offline hone par cache se file dena)
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Agar cache me hai to wahi de do, nahi to internet se lao
            return response || fetch(event.request);
        })
    );
});

// 3. Activate Event (Purana cache delete karna update par)
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});