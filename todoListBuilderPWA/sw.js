let cacheName = "todoPWA";
let filesToCache = [
  "./",
  "./index.html",
  "./bundle.js",
  "./fonts.css",
  "./style.css",
  "https://fonts.gstatic.com/s/roboto/v16/d-6IYplOFocCacKzxwXSOJBw1xU1rKptJj_0jans920.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/isZ-wbCXNKAbnjo6_TwHToX0hVgzZQUfRDuZrPvH3D8.woff2"
];

self.addEventListener( "install", ( ev ) => {
  ev.waitUntil(
    caches.open( cacheName ).then(( cache ) => {
      return cache.addAll( filesToCache );
    })
  );
});

self.addEventListener( "activate", ( ev ) => {
  ev.waitUntil(
    caches.keys().then( ( keyList ) => {
      return Promise.all( keyList.map( ( key ) => {
        if( key !== cacheName  ) {
          return caches.delete( key );
        }
      }))
    })
  );
});

self.addEventListener( "fetch", ( ev ) => {
  ev.respondWith(
    caches.match( ev.request ).then( ( response ) => {
      console.log( "fetch responce", !!response );
      return response || fetch( ev.request );
    })
  );
});
