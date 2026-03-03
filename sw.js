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

// Ловим пуш
messaging.onBackgroundMessage((payload) => {
    const title = payload.notification.title || "VoltMaster";
    const options = {
        body: payload.notification.body || "Новая шабашка!",
        icon: 'logo.png',
        badge: 'logo.png',
        data: {
            // Если сервер прислал ссылку — берем её, если нет — открываем шабашки
            url: (payload.data && payload.data.url) ? payload.data.url : 'shabashki.html'
        }
    };
    return self.registration.showNotification(title, options);
});

// Ловим клик по пушу
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    // Прямая ссылка на страницу шабашек
    const targetUrl = 'shabashki.html'; 

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            // Если страница уже открыта — просто переключаемся на неё
            for (let client of windowClients) {
                if (client.url.includes(targetUrl) && 'focus' in client) {
                    return client.focus();
                }
            }
            // Если закрыта — открываем заново
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});
