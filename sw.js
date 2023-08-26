const CACHE_NAME = "v1_cache_panel_adm"
urlsToCache = [
    "https://script.google.com/macros/s/AKfycbyARUmTvL-0F2VJR8MaWquDC3npzVog8JCaDPJdvD-QeUPX1QFJ9Xqj8h2QV7-s0yuK4w/exec",
    "./manifest.json"
]

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache).then(() => self.skipWaiting())
            })
            .catch((err) => "failed to register the cache", err)
    )
})

self.addEventListener("activate", (e) => {
    const cacheWhitelist = [CACHE_NAME]
    e.waitUntil(
        caches.keys().then((cachesNames) => {
            cachesNames.map((cachesName) => {
                if(cachesName.indexOf(cachesName) === -1) {
                    return caches.delete(cachesName)
                }
            })
        })
    )
})


self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            if(res) {
                return res
            }
            return fetch(e.request)
        })
    )
})