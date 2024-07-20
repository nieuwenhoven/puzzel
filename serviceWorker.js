const staticPyPWA = "puzzel"
const assets = [
    // "",
    // "/",
    "/puzzel.css",
    "/puzzel.js",
    "/marloes_en_frans.jpg",
    "/pwa-scaffold.js",
    "/serviceWorker.js",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticPyPWA).then(cache => {
            cache.addAll(assets).then(r => {
                console.log("Cache assets downloaded");
            }).catch(err => console.log("Error caching item", err))
            console.log(`Cache ${staticPyPWA} opened.`);
        }).catch(err => console.log("Error opening cache", err))
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        }).catch(err => console.log("Cache fetch error: ", err))
    )
})