const CACHE_NAME = 'volt-master-v2';
const ASSETS = [
  'index.html',
  'shabashki.html',
  'signa.html',
  'prais.html'
];

// Установка и кэширование
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Активация
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Слушатель пуш-уведомлений извне
self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : { title: 'VOLT MASTER', body: 'Обновление в системе!' };
    const options = {
        body: data.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/355/355980.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/355/355980.png',
        vibrate: [200, 100, 200],
        data: { url: 'index.html' }
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
});

// Клик по уведомлению открывает приложение
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url));
});
