const staticPyPWA = "v240726g"   // verander versie voor iedere nieuwe release
const assets = [
    "/puzzel",
    "/puzzel/index.html",
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
    const cacheWhitelist = [staticPyPWA]  // behoud alleen de cache van deze versie

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

self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // caches.match() always resolves
        // but in case of success response will have value
        if (response !== undefined) {
          console.log(`fetch voor ${event.request.url} geleverd uit cache`)
          return response;
        } else {
          return fetch(event.request)
            .then((response) => {
              console.log(`fetch voor ${event.request.url} van server, opslaan in cache ${staticPyPWA}`)
              // response may be used only once
              // we need to save clone to put one copy in cache
              // and serve second one
              let responseClone = response.clone();
  
              caches.open(staticPyPWA).then((cache) => {
                cache.put(event.request, responseClone);
              });
              return response;
            })
            // .catch(() => caches.match("/gallery/myLittleVader.jpg"));
        }
      }),
    );
  });
