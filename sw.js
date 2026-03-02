const CACHE_NAME = 'voltmaster-v6'; // Обновили версию для сброса старых данных
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
    self.skipWaiting(); // Принудительно активируем новый воркер
});

// Активация: удаляем старые версии кэша
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});

// Стратегия: Сначала сеть, если нет сети — кэш
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});

// Удаляем обработку push отсюда, так как она теперь в firebase-messaging-sw.js
// Это освободит "канал" для Firebase сообщений.
