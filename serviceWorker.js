const staticPyPWA = "puzzel-v240726e"   // verander versie voor iedere nieuwe release
const assets = [
    // "",
    // "/puzzel",
    "/puzzel/index.html",
    "puzzel/puzzel.css",
    "/puzzel/puzzel.css",
    "/puzzel/puzzel.js",
    "/puzzel/marloes_en_frans_kleur.png",
    "/puzzel/pwa-scaffold.js",
    "/puzzel/serviceWorker.js",
    "/puzzel/icons/icon-192x192.png",
    "/puzzel/icons/icon-512x512.png",
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

self.addEventListener('activate', event => {
    const cacheWhitelist = [staticPyPWA]  // behoud alleen de nieuwe cache

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log(`Deleting old cache: ${cacheName}`)
                        return caches.delete(cacheName)
                    }
                })
            )
        }).then(() => {
            return self.clients.claim()
        })
    )
  })

self.addEventListener("fetch", fetchEvent => {
    console.log('Fetch event for ', fetchEvent.request.url)
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        }).catch(err => console.log("Cache fetch error: ", err))
    )
})