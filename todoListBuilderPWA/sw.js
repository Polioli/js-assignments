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
  "./dist/main.bundle.js",
  "./dist/styles.css",
  "https://fonts.gstatic.com/s/materialicons/v27/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/0eC6fl06luXEYWpBSJvXCIX0hVgzZQUfRDuZrPvH3D8.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/Fl4y0QdOxyyTHEGMXX8kcYX0hVgzZQUfRDuZrPvH3D8.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/-L14Jk06m6pUHB-5mXQQnYX0hVgzZQUfRDuZrPvH3D8.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/I3S1wsgSg9YCurV6PUkTOYX0hVgzZQUfRDuZrPvH3D8.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/NYDWBdD4gIq26G5XYbHsFIX0hVgzZQUfRDuZrPvH3D8.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/Pru33qjShpZSmG3z6VYwnYX0hVgzZQUfRDuZrPvH3D8.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/Hgo13k-tfSpn0qi1SFdUfZBw1xU1rKptJj_0jans920.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/sTdaA6j0Psb920Vjv-mrzH-_kf6ByYO6CLYdB4HQE-Y.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/uYECMKoHcO9x1wdmbyHIm3-_kf6ByYO6CLYdB4HQE-Y.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/tnj4SB6DNbdaQnsM8CFqBX-_kf6ByYO6CLYdB4HQE-Y.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/_VYFx-s824kXq_Ul2BHqYH-_kf6ByYO6CLYdB4HQE-Y.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/NJ4vxlgWwWbEsv18dAhqnn-_kf6ByYO6CLYdB4HQE-Y.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/Ks_cVxiCiwUWVsFWFA3Bjn-_kf6ByYO6CLYdB4HQE-Y.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/oMMgfZMQthOryQo9n22dcuvvDin1pK8aKteLpeZ5c0A.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/ZLqKeelYbATG60EpZBSDy4X0hVgzZQUfRDuZrPvH3D8.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/oHi30kwQWvpCWqAhzHcCSIX0hVgzZQUfRDuZrPvH3D8.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/rGvHdJnr2l75qb0YND9NyIX0hVgzZQUfRDuZrPvH3D8.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/mx9Uck6uB63VIKFYnEMXrYX0hVgzZQUfRDuZrPvH3D8.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/mbmhprMH69Zi6eEPBYVFhYX0hVgzZQUfRDuZrPvH3D8.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/oOeFwZNlrTefzLYmlVV1UIX0hVgzZQUfRDuZrPvH3D8.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/RxZJdnzeo3R5zSexge8UUZBw1xU1rKptJj_0jans920.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/77FXFjRbGzN4aCrSFhlh3oX0hVgzZQUfRDuZrPvH3D8.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/isZ-wbCXNKAbnjo6_TwHToX0hVgzZQUfRDuZrPvH3D8.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/UX6i4JxQDm3fVTc1CPuwqoX0hVgzZQUfRDuZrPvH3D8.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/jSN2CGVDbcVyCnfJfjSdfIX0hVgzZQUfRDuZrPvH3D8.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/PwZc-YbIL414wB9rB1IAPYX0hVgzZQUfRDuZrPvH3D8.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/97uahxiqZRoncBaCEI3aW4X0hVgzZQUfRDuZrPvH3D8.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/d-6IYplOFocCacKzxwXSOJBw1xU1rKptJj_0jans920.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/WxrXJa0C3KdtC7lMafG4dRkAz4rYn47Zy2rvigWQf6w.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/OpXUqTo0UgQQhGj_SFdLWBkAz4rYn47Zy2rvigWQf6w.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/1hZf02POANh32k2VkgEoUBkAz4rYn47Zy2rvigWQf6w.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/cDKhRaXnQTOVbaoxwdOr9xkAz4rYn47Zy2rvigWQf6w.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/K23cxWVTrIFD6DJsEVi07RkAz4rYn47Zy2rvigWQf6w.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/vSzulfKSK0LLjjfeaxcREhkAz4rYn47Zy2rvigWQf6w.woff2",
  "https://fonts.gstatic.com/s/roboto/v16/vPcynSL0qHq_6dX7lKVByXYhjbSpvc47ee6xR_80Hnw.woff2"
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
