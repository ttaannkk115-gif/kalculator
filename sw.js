// sw.js
self.addEventListener('push', function(event) {
    let data = {
        title: 'VoltMaster',
        body: 'Появилась новая шабашка!',
        icon: 'logo.png'
    };

    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body,
        icon: 'logo.png', // Путь к вашей аватарке
        badge: 'logo.png',
        vibrate: [200, 100, 200, 100, 200], // Вибрация
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '1'
        },
        // Звук уведомления (поддерживается на Android)
        tag: 'shabashka-notif',
        renotify: true,
        actions: [
            { action: 'explore', title: 'Открыть VoltMaster' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Клик по уведомлению открывает приложение
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});