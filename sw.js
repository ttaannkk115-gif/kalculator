// 1. Подключаем библиотеки Firebase (версия compat для стабильности)
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js');

// 2. Твои настройки Firebase (обязательно заполни своими данными из Console)
const firebaseConfig = {
    apiKey: "ТВОЙ_API_KEY",
    authDomain: "kalculator-8e345.firebaseapp.com",
    databaseURL: "https://kalculator-8e345-default-rtdb.firebaseio.com/",
    projectId: "kalculator-8e345",
    storageBucket: "kalculator-8e345.appspot.com",
    messagingSenderId: "ТВОЙ_SENDER_ID",
    appId: "ТВОЙ_APP_ID"
};

// Инициализация
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 3. Установка и активация воркера
self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('activate', () => {
    self.clients.claim();
});

// 4. Обработка фоновых уведомлений (чтобы приходили, когда приложение закрыто)
messaging.onBackgroundMessage((payload) => {
    console.log('Получено фоновое сообщение:', payload);
    const notificationTitle = payload.notification.title || 'VOLT MASTER';
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'logo.png',
        badge: 'logo.png',
        sound: 'default',
        vibrate: [200, 100, 200]
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// 5. Исправление ошибки 404 при клике
self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    // Определяем текущий базовый URL (папку на GitHub), чтобы не было 404
    const rootUrl = new URL('./', location).href;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
            // Если вкладка уже открыта — переключаем фокус на неё
            for (let i = 0; i < windowClients.length; i++) {
                let client = windowClients[i];
                if (client.url === rootUrl && 'focus' in client) {
                    return client.focus();
                }
            }
            // Если закрыта — открываем правильный путь (не корень домена, а папку проекта)
            if (clients.openWindow) {
                return clients.openWindow(rootUrl);
            }
        })
    );
});
