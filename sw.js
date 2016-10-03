console.log("SW startup");


// importScripts('serviceworker-cache-polyfill.js');


var CACHE_NAME = 'Service-Worker-cache';
var urlsToCache = [      	     
      './images/sample.pdf',
      './images/1.png',
      './images/2.png',
      './images/3.png',
      './vedios/ServiceWorker.mp4'     	
      ]; 

//var version = 'v1::';	
self.addEventListener("install", function(event) {
  console.log("WORKER: install event in progress.");
  event.waitUntil(   
    caches 
    //  .open(version + 'fundamentals')   
      .open(CACHE_NAME)   
       .then(function(cache) {
	console.log("allow ?");       
   	//  return cache.put(urlsToCache, new Response("From the cache!"));    
   	 return cache.addAll(urlsToCache);     
      })
      .then(function() {
        console.log("WORKER: install completed");     
      })	
  );
});



 self.addEventListener('activate', function(event) {
console.log("Activating...");
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== CACHE_NAME;	    
        })
      //   console.log("Activated");
       .map(function(cacheName) {
        console.log('Deleting '+ cacheName);
     return caches(cacheName);
       }) 
      ); 
    })
  );
});
 	
self.addEventListener('fetch', function(event) {	
 event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return the response from the cached version
         console.log("Fetching...");
        if (response) {
          return response;
        }
        return fetch(event.request).then((response) => {
          return response || Response.error();
        });
      }
    )
  );  
}); 










