let addError = ( message, data ) => {
  self.clients.matchAll().then( (all ) => {
    return all.map( ( client ) => {
      return client.postMessage( message + data );
    });
  });
  console.log( message, data );
};

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
    }).catch( ( err ) => addError( "install error", err ) )
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
    }).catch( ( err ) => addError( "activate error", err ) )
  );
});

self.addEventListener( "fetch", ( ev ) => {
  ev.respondWith(
    caches.match( ev.request ).then( ( response ) => {
      addError( "fetch  ", !!response );
      return response || fetch( ev.request );
    }).catch( ( err ) => addError( "fetch error", err ) )
  );
});
