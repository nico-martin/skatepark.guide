/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("/workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/workbox-v3.6.3"});

importScripts(
  "/precache-manifest.76e898668b0774af1b083aefd707dae2.js"
);

workbox.skipWaiting();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("index.html");

workbox.routing.registerRoute(/https:\/\/skateparkguide.ch.*.(jpg|jpeg|png|gif|svg)/, workbox.strategies.cacheFirst({ "cacheName":"spg-image-cache", plugins: [] }), 'GET');
workbox.routing.registerRoute(/\.(?:png|gif|jpg|svg)$/, workbox.strategies.cacheFirst({ "cacheName":"image-cache", plugins: [] }), 'GET');
