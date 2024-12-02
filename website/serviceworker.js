//set up cache name and files to add to it
// only change from here down
const CACHE_NAME = 'portfolio';
const CACHE_URLS =  ['/','index.html','qualification.html','skill.html','manifest.json','stiel.css','404.html','images/BG_CS_PV4_158.jpg','image/hackerman.jpg','image/emoji-spin.gif','image/mikaxd.jpg','image/mum =D.jpg', 'image/mentorship.png','image/pencil.png','image/sui.JPG', 'image/world-wide-web.png','image/wordle.png','image/competence.png', 'image/BUV .png', 'image/schale.png'];



//DO NOT change any of the code below 
//...

//add all URLs to cache when installed
self.addEventListener("install", function(event){
    console.log("Service worker installed");
    event.waitUntil(
        //create and open cache
        caches.open(CACHE_NAME)
            .then(function(cache){
                console.log("Cache opened");
                //add all URLs to cache
                return cache.addAll(CACHE_URLS);
        })
    );
});

//On activate update the cache with the new version and clean out old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName.startsWith('my-site-') && CACHE_NAME !== cacheName) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
  
//add all URLs to cache when installed
//...
//user has navigated to page - fetch required assets
self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            //check whether asset is in cache
            if(response){
                //asset in cache, so return it
                console.log(`Return ${event.request.url} from cache`);
                return response;
            }
            //asset not in cache so fetch asset from network
            console.log(`Fetch ${event.request.url} from network`);
            return fetch(event.request);
        })
    );
});
