const CACHE_NAME = 'voltmaster-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

// Установка воркера и кэширование
self.addEventListener('install', (event) => {
    console.log('[SW] Установка...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Кэширование ресурсов');
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

// Активация и очистка старого кэша
self.addEventListener('activate', (event) => {
    console.log('[SW] Активация...');
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            );
        })
    );
    return self.clients.claim();
});

// Обработка Push-уведомлений
self.addEventListener('push', function(event) {
    console.log('[SW] Получен Push-сигнал');
    
    let data = { 
        title: 'VoltMaster', 
        body: 'Новая шабашка уже в приложении!', 
        icon: 'logo.png' 
    };

    if (event.data) {
        try {
            data = event.data.json();
            console.log('[SW] Данные пуша:', data);
        } catch (e) {
            data.body = event.data.text();
            console.log('[SW] Текст пуша:', data.body);
        }
    }

    const options = {
        body: data.body,
        icon: 'logo.png',
        badge: 'logo.png',
        vibrate: [200, 100, 200],
        sound: 'default',
        data: { url: './' },
        tag: 'volt-notif',
        renotify: true
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
        .then(() => console.log('[SW] Уведомление показано'))
        .catch(err => console.error('[SW] Ошибка показа уведомления:', err))
    );
});

// Клик по уведомлению
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('./')
    );
});
