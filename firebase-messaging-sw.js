importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyD-dIC8bm8y4kaY7RXmMrys2wOMLA5o8vY",
    databaseURL: "https://voltmaster-332c0-default-rtdb.firebaseio.com",
    projectId: "voltmaster-332c0",
    messagingSenderId: "312337098429",
    appId: "1:312337098429:web:663e0f6787bd62d19bf9d4"
});

const messaging = firebase.messaging();

// Логика отображения уведомлений в фоновом режиме
messaging.onBackgroundMessage((payload) => {
    console.log('[sw.js] Получено фоновое сообщение:', payload);
    
    const notificationTitle = payload.notification.title || "VoltMaster";
    const notificationOptions = {
        body: payload.notification.body || "Новое уведомление",
        icon: 'logo.png',
        badge: 'logo.png', // Маленькая иконка в строке состояния
        data: {
            url: '/' // Чтобы при клике открывался сайт
        }
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Чтобы при нажатии на уведомление открывалось приложение
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});
