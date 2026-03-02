// sw.js
self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : { title: 'VoltMaster', body: 'Новая шабашка!' };
    
    const options = {
        body: data.body,
        icon: 'logo.png', // Путь к вашей аватарке
        badge: 'logo.png',
        vibrate: [200, 100, 200]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Открытие приложения при клике на уведомление
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});
