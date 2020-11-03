importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.cleanupOutdatedCaches();
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST, {
    directoryIndex: null, // '/' will not check the precache for /index.html
    cleanURLs: false, // '/about' will not check the precache for /about.html
    ignoreUrlParametersMatching: [/.*/] // '?param=1' in '/trending?param=1' will be ignored
});

// https://github.com/GoogleChrome/workbox/issues/438#issuecomment-361947356
const routeHandler = new workbox.strategies.NetworkOnly();
workbox.routing.registerRoute(
    ({ event }) => event.request.mode === "navigate",
    args => {
        const defaultBase = "/index.html";
        return routeHandler
            .handle(args)
            .then(response =>
                !response
                    ? caches.match(workbox.precaching.getCacheKeyForURL(defaultBase))
                    : response
            )
            .catch(() =>
                caches.match(workbox.precaching.getCacheKeyForURL(defaultBase))
            );
    }
);
//sw cook book


// workbox.routing.registerRoute(
//     /assets\/(png|zeroState|svg)\/\S+\.(png|svg)$/,
//     new workbox.strategies.CacheFirst({
//         cacheName: "assets-cache",
//         plugins: [
//             new workbox.expiration.ExpirationPlugin({
//                 maxEntries: 50,
//                 maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
//                 purgeOnQuotaError: true
//             })
//         ]
//     }),
//     "GET"
// );