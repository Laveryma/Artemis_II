const CACHE_NAME = "artemis-family-tracker-v7";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icon.svg",
  "./images/reid-wiseman.jpg",
  "./images/victor-glover.jpg",
  "./images/christina-koch.jpg",
  "./images/jeremy-hansen.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).catch(() => caches.match("./index.html")))
  );
});
