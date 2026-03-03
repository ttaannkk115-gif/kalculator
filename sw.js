importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js');

// 1. НАСТРОЙКА FIREBASE
firebase.initializeApp({
    apiKey: "AIzaSyD-dIC8bm8y4kaY7RXmMrys2wOMLA5o8vY",
    databaseURL: "https://voltmaster-332c0-default-rtdb.firebaseio.com",
    projectId: "voltmaster-332c0",
    messagingSenderId: "312337098429",
    appId: "1:312337098429:web:663e0f6787bd62d19bf9d4"
});

const messaging = firebase.messaging();

// 2. ОБРАБОТКА ПУШЕЙ (теперь они здесь официально)
messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title || "VoltMaster";
    const notificationOptions = {
        body: payload.notification.body || "Новое уведомление",
        icon: 'logo.png',
        badge: 'logo.png',
        data: { url: '/' }
    };
    return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});

// 3. ТВОЙ КЭШ (версия v6)
const CACHE_NAME = 'voltmaster-v6';
const ASSETS = ['./', './index.html', './manifest.json', './logo.png'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
