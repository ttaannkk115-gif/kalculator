const CACHE_NAME = 'voltmaster-v1';
// Список файлов для офлайн-доступа
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './logo.png'
];

// Установка и кэширование
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

// ОБЯЗАТЕЛЬНО для установки PWA: обработка запросов
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});

// Твои уведомления
self.addEventListener('push', function(event) {
    const options = {
        body: 'Появилась новая работа!',
        icon: 'logo.png',
        badge: 'logo.png',
        vibrate: [200, 100, 200],
        tag: 'new-job',
        renotify: true
    };
    event.waitUntil(self.registration.showNotification('VoltMaster', options));
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});
