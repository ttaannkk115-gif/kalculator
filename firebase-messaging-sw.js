importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyD-dIC8bm8y4kaY7RXmMrys2wOMLA5o8vY",
    databaseURL: "https://voltmaster-332c0-default-rtdb.firebaseio.com",
    projectId: "voltmaster-332c0",
    messagingSenderId: "312337098429",
    appId: "1:312337098429:web:663e0f6787bd62d19bf9d4"
});

const messaging = firebase.messaging();

// Логика отображения уведомлений, когда приложение закрыто
messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'logo.png'
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
