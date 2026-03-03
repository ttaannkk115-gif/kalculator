importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js');

// 1. Оставляем инициализацию (твои ключи)
firebase.initializeApp({
    apiKey: "AIzaSyD-dIC8bm8y4kaY7RXmMrys2wOMLA5o8vY",
    databaseURL: "https://voltmaster-332c0-default-rtdb.firebaseio.com",
    projectId: "voltmaster-332c0",
    messagingSenderId: "312337098429",
    appId: "1:312337098429:web:663e0f6787bd62d19bf9d4"
});

const messaging = firebase.messaging();

// 2. ФОНОВЫЙ ПРИЕМ (когда приложение закрыто)
messaging.onBackgroundMessage((payload) => {
    console.log('Получен фоновый пуш:', payload);
    const title = payload.notification.title || "VoltMaster";
    const options = {
        body: payload.notification.body || "Новая шабашка!",
        icon: 'logo.png',
        badge: 'logo.png',
        data: {
            // Прямая ссылка для iPhone
            url: "https://ttaannkk115-gif.github.io/shabashki.html"
        }
    };
    return self.registration.showNotification(title, options);
});

// 3. ОБРАБОТКА КЛИКА (чтобы открывались шабашки)
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    // Ссылка, куда должен перейти мастер
    const targetUrl = "https://ttaannkk115-gif.github.io/shabashki.html";

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            // Если вкладка с шабашками уже открыта — переключаем фокус на неё
            for (let client of windowClients) {
                if (client.url === targetUrl && 'focus' in client) {
                    return client.focus();
                }
            }
            // Если такой вкладки нет — открываем новую
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});

// 4. КЭШИРОВАНИЕ (чтобы работало без интернета)
const CACHE_NAME = 'volt-v6';
const ASSETS = [
    'index.html',
    'prais.html',
    'shabashki.html',
    'izmerenie.html',
    'logo.png',
    'manifest.json'
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
