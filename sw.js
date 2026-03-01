// 1. Подключаем библиотеки Firebase прямо в воркер
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js');

// 2. Твои ключи (возьми их в настройках Firebase: Project Settings -> General)
const firebaseConfig = {
    apiKey: "ТВОЙ_API_KEY",
    databaseURL: "https://kalculator-8e345-default-rtdb.firebaseio.com/",
    projectId: "kalculator-8e345",
    messagingSenderId: "ТВОЙ_SENDER_ID",
    appId: "ТВОЙ_APP_ID"
};

// 3. Инициализация
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 4. Слушатель фоновых уведомлений (для iPhone и закрытого браузера)
messaging.onBackgroundMessage((payload) => {
    console.log('Push получен в фоне:', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'logo.png',
        badge: 'logo.png',
        sound: 'default' // Обязательно для звука на iOS
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});

// 5. Твой старый код для клика по уведомлению
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});
