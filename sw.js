self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : { title: 'VOLT MASTER', body: 'Новое сообщение!' };
    const options = {
        body: data.body,
        icon: 'logo.png', // Твоя постоянная аватарка
        badge: 'logo.png',
        vibrate: [200, 100, 200]
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});
